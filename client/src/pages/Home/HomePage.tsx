import React from "react";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const TemporaryStories = [
    {
      id: 1,
      title: "Travel like a local in Japan",
      image:
        "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Discover hidden temples and authentic ramen shops",
    },
    {
      id: 2,
      title: "Best hidden spot in Morocco",
      image:
        "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Explore the Sahara beyond the tourist trails",
    },
    {
      id: 3,
      title: "Top 3 Secret Beach in Bali",
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Untouched paradise away from the crowds",
    },
    {
      id: 4,
      title: "Top 3 Hidden hiking Spot in France",
      image:
        "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Alpine adventures off the beaten path",
    },
  ];

  return (
    <>
      <div className={styles.heroContainer}>
        <img
          src="/images/worldTourLine.jpg"
          alt="World landmarks illustration"
          className={styles.heroImage}
        />
        <h1 className={styles.heroTitle}>
          Real stories. Real places. Real travelers.
        </h1>
      </div>
      <div className={styles.storiesContainer}>
        <div className={styles.storiesGrid}>
          {TemporaryStories.map((story) => (
            <div key={story.id} className={styles.storyCard}>
              <div className={styles.storyImageContainer}>
                <img
                  src={story.image}
                  alt={story.title}
                  className={styles.storyImage}
                />
              </div>
              <h3 className={styles.storyTitle}>{story.title}</h3>
              <p className={styles.storyDescription}>{story.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.joinContainer}>
        <h2 className={styles.joinTitle}>Want to share a hidden place?</h2>
        <div className={styles.joinButtons}>
          <Link to="/signup" className={styles.joinButton}>
            Join us
            <ArrowForward className={styles.buttonIcon} />
          </Link>
          <Link to="/destinations" className={styles.exploreButton}>
            Explore Destinations
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
