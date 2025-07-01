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

  const featuredArticles = [
    {
      title: 'The Ultimate Guide to Travel Photography',
      description: 'Capture stunning memories without expensive equipment',
      category: 'Photography',
      readTime: '12 min read',
      author: 'Sarah Chen'
    },
    {
      title: 'How to Find Authentic Local Food',
      description: 'Skip tourist traps and eat where locals eat',
      category: 'Food & Culture',
      readTime: '7 min read',
      author: 'Miguel Rodriguez'
    },
    {
      title: 'Sustainable Travel: Leave Only Footprints',
      description: 'Travel responsibly and support local communities',
      category: 'Sustainable Travel',
      readTime: '10 min read',
      author: 'Emma Thompson'
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

  
      <section className={styles.tipsSection}>
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
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.featuredContainer}>
          <h2 className={styles.featuredTitle}>
            Most Popular Travel Tips
          </h2>
          
          <div className={styles.featuredList}>
            {featuredArticles.map((article, index) => (
              <div key={index} className={styles.featuredArticle}>
                <div className={styles.featuredContent}>
                  <div style={{ flex: 1 }}>
                    <div className={styles.featuredMeta}>
                      <span className={styles.categoryTag}>
                        {article.category}
                      </span>
                      <span className={styles.featuredReadTime}>{article.readTime}</span>
                    </div>
                    <h3 className={styles.featuredArticleTitle}>
                      {article.title}
                    </h3>
                    <p className={styles.featuredDescription}>
                      {article.description}
                    </p>
                    <p className={styles.author}>By {article.author}</p>
                  </div>
                  <div>
                    <button className={styles.featuredButton}>
                      Read More
                      <ArrowForward className={styles.buttonIcon} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsletterSection}>
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
      </section>
    </div>
  );
};

export default TravelTipsPage;