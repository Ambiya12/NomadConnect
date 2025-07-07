import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowForward,
  Explore,
  People,
  TipsAndUpdates,
  PhotoCamera,
} from "@mui/icons-material";
import styles from "./HomePage.module.css";

const highlights = [
  {
    id: 1,
    title: "Real Stories, Real People",
    image: "/images/RealStories.webp",
    description:
      "No sponsored content, no tourist traps – just authentic experiences from fellow travelers.",
    icon: <People className={styles.featureIcon} />,
  },
  {
    id: 2,
    title: "Hidden Gems Everywhere",
    image: "/images/Share.webp",
    description:
      "Discover secret beaches, local cafes, and off-the-beaten-path adventures.",
    icon: <Explore className={styles.featureIcon} />,
  },
  {
    id: 3,
    title: "Travel Tips That Work",
    image: "/images/TravelTips.webp",
    description:
      "Learn from mistakes, save money, and travel smarter with insider wisdom.",
    icon: <TipsAndUpdates className={styles.featureIcon} />,
  },
  {
    id: 4,
    title: "Share Your Adventures",
    image: "/images/HiddenGems.webp",
    description:
      "Help fellow nomads discover amazing places and build lasting travel memories.",
    icon: <PhotoCamera className={styles.featureIcon} />,
  },
];

const HomePage: React.FC = () => (
  <div>
    <section className={styles.hero}>
      <img
        src="/images/worldTourLine.webp"
        alt="World landmarks illustration"
        className={styles.heroImage}
        loading="lazy"
        sizes="(max-width: 600px) 100vw, 1400px"
      />
      <h1 className={styles.heroTitle}>
        Real stories. Real places. Real travelers.
      </h1>
    </section>

    <section className={styles.highlights}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Why Nomad Connect?</h2>
        <p className={styles.sectionSubtitle}>
          We're building a community where authentic travel experiences matter
          more than Instagram likes.
        </p>
      </header>

      <div className={styles.grid}>
        {highlights.map(({ id, title, image, description, icon }) => (
          <div key={id} className={styles.card}>
            <div className={styles.cardImageWrapper}>
              <img src={image} alt={title} className={styles.cardImage} />
              <div className={styles.cardIcon}>{icon}</div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDescription}>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>Ready to join the adventure?</h2>
      <div className={styles.ctaButtons}>
        <Link to="/signup" className={styles.ctaPrimary}>
          Join us
          <ArrowForward className={styles.buttonIcon} />
        </Link>
        <Link to="/destinations" className={styles.ctaSecondary}>
          Explore Destinations
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
