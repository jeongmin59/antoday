package com.omfg.antoday.stock.application;

import com.omfg.antoday.stock.dao.StockRepository;
import com.omfg.antoday.stock.domain.Stock;
import com.omfg.antoday.stock.dto.CorpListResponseDto;
import com.omfg.antoday.user.dao.UserRepository;
import com.omfg.antoday.user.dao.UserStockLikeRepository;
import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final UserStockLikeRepository userStockLikeRepository;
    private final UserRepository userRepository;

    @Value("${dart.apiKey}")
    String dartKey;

    @Value("${dart.path}")
    String filePath;

    private static final int PAGE_SIZE = 10;

    @Transactional
    public Page<CorpListResponseDto> getCorpSearchList(String keyword, int page) {
        List<Stock> corpListStartKeyword = stockRepository.findByCorpNameStartingWith(keyword);
        List<Stock> corpListContainKeyword = stockRepository.findByCorpNameContainingOrderByCorpNameAsc(keyword);

        List<Stock> totalList = new ArrayList<>(corpListStartKeyword);
        totalList.addAll(corpListContainKeyword);

        // 중복 제거
        List<Stock> distinctTotalList = new ArrayList<>(new LinkedHashSet<>(totalList));

        PageRequest pageRequest = PageRequest.of(page, PAGE_SIZE);

        // distinctTotalList를 Page 객체로 만들기
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), distinctTotalList.size());
        Page<Stock> corpSearchList = new PageImpl<>(distinctTotalList.subList(start, end), pageRequest, distinctTotalList.size());

        // 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && authentication.isAuthenticated();

        return corpSearchList.map(stock -> {
            Boolean isLiked = null;
            if (isAuthenticated) {
                if (!Objects.equals(authentication.getName(), "anonymousUser")) {   // 로그인 했을 경우
                    isLiked = isStockLikedByUser(stock, Long.valueOf(authentication.getName()));
                }
            }
            return CorpListResponseDto.toEntity(stock, isLiked);
        });
    }

    private boolean isStockLikedByUser(Stock stock, Long socialId) {
        Optional<User> optionalUser = userRepository.findById(socialId);
        UserStockLike userStockLike = null;
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userStockLike = userStockLikeRepository.findByStockAndUser(stock, user);
        }
        return userStockLike != null;
    }

    public void getStockInfo() {

        if (stockRepository.count() > 0) {
            log.info("[Stock] 이미 데이터가 저장되어 있습니다.");
            return;
        }

        // Open Dart에서 고유정보 받아오기
        UriComponents uri = UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host(OpenDartProperties.DART_API_URL)
                .path(OpenDartProperties.DART_CORP_CODE_URI)
                .queryParam("crtfc_key", dartKey)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_OCTET_STREAM));
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, byte[].class);

        try {
            // zip 파일 다운로드
            File lOutFile = new File(filePath  + "corpInfo.zip");
            FileOutputStream lFileOutputStream = new FileOutputStream(lOutFile);
            lFileOutputStream.write(response.getBody());
            lFileOutputStream.close();

            // zip 압축 해제
            unZip(filePath + "corpInfo.zip", filePath);

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setIgnoringElementContentWhitespace(true);
            DocumentBuilder builder = factory.newDocumentBuilder();

            // xml 파싱하기
            Document document = builder.parse(filePath + "CORPCODE.xml");
            NodeList corpList = document.getElementsByTagName("list");

            List<Stock> corpCodeList = new ArrayList<>();

            for (int i = 0; i < corpList.getLength(); i++) {
                Element corp = (Element) corpList.item(i);
                if (corp != null) {
                    //상장된 회사만 저장
                    if (getValue("stock_code", corp) != null && StringUtils.hasText(getValue("stock_code", corp))) {

                        Stock stock = stockRepository.findById(getValue("stock_code", corp)).orElseGet(() -> Stock.builder()
                                        .stockCode(getValue("stock_code", corp))
                                        .corpCode(getValue("corp_code", corp))
                                        .corpName(getValue("corp_name", corp))
                                        .build());

                        corpCodeList.add(stock);
                    }
                }
            }
            stockRepository.saveAll(corpCodeList);
            log.info("[Stock] 데이터가 저장되었습니다.");

            // CORPCODE.xml 파일 삭제
            File xmlFileToDelete = new File(filePath + "CORPCODE.xml");
            if (xmlFileToDelete.exists()) {
                xmlFileToDelete.delete();
            }

            // corpInfo.zip 폴더 삭제
            File zipFolderToDelete = new File(filePath + "corpInfo.zip");
            deleteFolder(zipFolderToDelete);

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    // 파일 압축 해제
    private void unZip(String ZipFilePath, String FilePath) {
        File Destination_Directory = new File(FilePath);
        if (!Destination_Directory.exists()) {
            Destination_Directory.mkdir();
        }
        try {
            ZipInputStream Zip_Input_Stream = new ZipInputStream(new FileInputStream(ZipFilePath));
            ZipEntry Zip_Entry = Zip_Input_Stream.getNextEntry();

            while (Zip_Entry != null) {
                String File_Path = FilePath + File.separator + Zip_Entry.getName();
                if (!Zip_Entry.isDirectory()) {

                    extractFile(Zip_Input_Stream, File_Path);
                } else {

                    File directory = new File(File_Path);
                    directory.mkdirs();
                }
                Zip_Input_Stream.closeEntry();
                Zip_Entry = Zip_Input_Stream.getNextEntry();
            }
            Zip_Input_Stream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void extractFile(ZipInputStream Zip_Input_Stream, String File_Path) throws IOException {
        int BUFFER_SIZE = 4096;

        BufferedOutputStream Buffered_Output_Stream = new BufferedOutputStream(new FileOutputStream(File_Path));
        byte[] Bytes = new byte[BUFFER_SIZE];
        int Read_Byte = 0;
        while ((Read_Byte = Zip_Input_Stream.read(Bytes)) != -1) {
            Buffered_Output_Stream.write(Bytes, 0, Read_Byte);
        }
        Buffered_Output_Stream.close();
    }

    private static String getValue(String tag, Element element) {
        NodeList nodes = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = nodes.item(0);
        return node.getTextContent().trim();
    }

    // 폴더와 하위 파일들을 모두 삭제하는 메서드
    private void deleteFolder(File folder) {
        if (folder.isDirectory()) {
            File[] filesInFolder = folder.listFiles();
            if (filesInFolder != null) {
                for (final File file : filesInFolder) {
                    deleteFolder(file); // 재귀 호출로 하위 폴더와 파일들도 순차적으로 삭제합니다.
                }
            }
        }
        folder.delete(); // 현재 폴더를 삭제합니다.
    }

    public void getStockLogoUrl() {
        try {
            List<Stock> corpList = stockRepository.findAll();

            for (Stock stock : corpList) {
                String stockCode = stock.getStockCode();

                String logoUrl = "https://thumb.tossinvest.com/image/resized-webp/144x0/https%3A%2F%2Fstatic.toss.im%2" +
                        "Fpng-icons%2Fsecurities%2Ficn-sec-fill-" + stockCode + ".png";

                Stock updatedLogoUrl = Stock.builder()
                        .stockCode(stock.getStockCode())
                        .corpName(stock.getCorpName())
                        .corpCode(stock.getCorpCode())
                        .market(stock.getMarket())
                        .stocks(stock.getStocks())
                        .logo_url(logoUrl)
                        .build();
                stockRepository.save(updatedLogoUrl);
            }
            log.info("[Stock] logoUrl 업데이트 완료");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}