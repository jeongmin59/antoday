interface CompanyInfo {
    corpCode: string;
    corpName: string;
    isLiked: boolean;
    logoUrl: string;
    stockCode: string;
}

interface TradingRecord {
    tradeAt?: string;
    stockCode?: number;
    logoUrl?: string;
    optionBuySell?: string;
    price?: number;
    cnt?: number;
    keywordList? : string[];
    reason? : string;
    corpName? : string;
    tradePk?: string;
    aiAnalyze? : string;
}

interface stockIntro {
    change? : number;
    corp_name? : string;
    index?: number;
    market? : string;
    percentageChange? : number;
    stock_code? : string
}