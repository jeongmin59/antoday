import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TodayNews.module.css'

const TodayNews: React.FC = () => {
  const [News, setNews] = useState<any[]>([]);
  
  useEffect(() => {
      const getData = async () => {
          try {
              const response = await axios.get(
                  import.meta.env.VITE_DATA_API_URL + '/news/list');
                  setNews(response.data);
                  console.log(response)
                } catch (error) {
                    console.error(error);
                }
            };
            
            getData();
        }, []);
        
const handleNewsItemClick = (link: string) => {
    window.open(link, '_blank');
}
        return (
  <div>
    <div>오늘의 뉴스</div>
    <div className={styles.newsContainer}>
      {News.map((news, index) => (
      <div key={index} className={styles.newsItem}>
        <div className={styles.imgtitle}>
        <img 
          className={styles.newsImage}
          src={news.image} 
          alt={news.title}
          onClick={() => handleNewsItemClick(news.link)}
          />
        <p 
          className={styles.title}
          onClick={() => handleNewsItemClick(news.link)}
          >{news.title}</p>
        </div>
        {/* <p className={styles.content}>{news.content}</p> */}
        <div className={styles.pressDate}> 
          <p className={styles.press}>{news.press}</p>
          <p className={styles.date}>{news.date}</p>
        </div>
      </div>
      ))}
    </div>
  </div>
  );
}  

export default TodayNews;
