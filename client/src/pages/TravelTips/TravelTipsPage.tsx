import React from 'react';
import { ArrowForward, Backpack, Public, Person } from '@mui/icons-material';
import styles from './TravelTipsPage.module.css';

const TravelTipsPage: React.FC = () => {
  const tipCategories = [
    {
      id: 1,
      title: 'General Tips',
      icon: <Public fontSize="large" />,
      categoryClass: styles.pinkCategory,
      iconClass: styles.pinkIcon,
      articles: [
        {
          title: 'Packing Hacks for Backpackers',
          description: 'Essential tips to maximize space and minimize weight',
          readTime: '5 min read'
        }
      ]
    },
    {
      id: 2,
      title: 'Cultural Tips',
      icon: <Person fontSize="large" />,
      categoryClass: styles.purpleCategory,
      iconClass: styles.purpleIcon,
      articles: [
        {
          title: 'How to Stay Safe as a Solo Female Traveler',
          description: 'Practical advice for confident solo adventures',
          readTime: '8 min read'
        }
      ]
    },
    {
      id: 3,
      title: 'Solo Travel Tips',
      icon: <Backpack fontSize="large" />,
      categoryClass: styles.redCategory,
      iconClass: styles.redIcon,
      articles: [
        {
          title: '10 Ways to save money on the Road',
          description: 'Budget travel strategies that actually work',
          readTime: '6 min read'
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>
            Real advice from real explorers -<br />
            travel smart, stay local :)
          </h1>
        </div>
      </section>

  
        <div className={styles.tipsContainer}>
          <div className={styles.tipsGrid}>
            {tipCategories.map((category) => (
              <div key={category.id} className={`${styles.tipCategory} ${category.categoryClass}`}>
                <div className={`${styles.categoryIcon} ${category.iconClass}`}>
                  {category.icon}
                </div>
                <h2 className={styles.categoryTitle}>
                  {category.title}
                </h2>
                
                {category.articles.map((article, index) => (
                  <div key={index} className={styles.articleCard}>
                    <h3 className={styles.articleTitle}>
                      {article.title}
                    </h3>
                    <p className={styles.articleDescription}>
                      {article.description}
                    </p>
                    <div className={styles.articleMeta}>
                      <span className={styles.readTime}>{article.readTime}</span>
                      <button className={styles.readMoreButton}>
                        Read More
                        <ArrowForward className={styles.buttonIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.newsletterContainer}>
          <h2 className={styles.newsletterTitle}>
            Get Weekly Travel Tips
          </h2>
          <p className={styles.newsletterDescription}>
            Join thousands of travelers getting insider tips delivered to their inbox every week.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button className={styles.subscribeButton}>
              Subscribe
            </button>
          </div>
        </div>
    </div>
  );
};

export default TravelTipsPage;