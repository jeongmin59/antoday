import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TodayNews.module.css";
import TodayNewsSkeleton from "./TodayNewsSkeleton";

const TodayNews: React.FC = () => {
  const [News, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          import.meta.env.VITE_DATA_API_URL + "/news/list"
        );
        setNews(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleNewsItemClick = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>오늘의 뉴스</div>
      <div className={styles.newsContainer}>
        {isLoading ? (
          <TodayNewsSkeleton />
        ) : (
          News?.map((news, index) => (
            <div key={index} className={styles.newsItem}>
              <div className={styles.imgtitle}>
                <div
                  className={styles.newstitle}
                  onClick={() => handleNewsItemClick(news.link)}
                >
                  <div>{news.title}</div>
                  <div className={styles.pressDate}>
                    <div className={styles.press}>{news.press}</div>
                    <div className={styles.date}>{news.date}</div>
                  </div>
                </div>
                <img
                  className={styles.newsImage}
                  src={news.image}
                  alt={news.title}
                  onClick={() => handleNewsItemClick(news.link)}
                />
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayNews;
