import React, { useState } from 'react';
import { Favorite, Group, Public, Send } from '@mui/icons-material';
import styles from './AboutUsPage.module.css';

const AboutUsPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <section className={styles.section}>
              <h1 className={styles.storyTitle}>
                The Story Behind 'NomadConnect'
              </h1>
              <div className={styles.prose}>
                <p>
                  NomadConnect was born from a simple idea — travel should feel personal, not commercial. While journeying across continents, our founders realized that the most memorable adventures weren't in guidebooks, but in conversations with locals and fellow wanderers.
                </p>
                <p>
                  NomadConnect brings those conversations online, creating a space where authentic travel experiences are shared, celebrated, and preserved for future explorers.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.valuesTitle}>
                Community values
              </h2>
              <div>
                <p className={styles.valuesIntro}>What we stand for:</p>
                
                <div className={styles.valuesList}>
                  <div className={styles.valueItem}>
                    <Favorite className={styles.valueIcon} />
                    <div className={styles.valueContent}>
                      <h3>Authenticity</h3>
                      <p>Real Stories. No ads. No filter</p>
                    </div>
                  </div>
                  
                  <div className={styles.valueItem}>
                    <Group className={styles.valueIcon} />
                    <div className={styles.valueContent}>
                      <h3>Sharing</h3>
                      <p>Give as much as you take. Pay travel wisdom forward</p>
                    </div>
                  </div>
                  
                  <div className={styles.valueItem}>
                    <Public className={styles.valueIcon} />
                    <div className={styles.valueContent}>
                      <h3>Respect</h3>
                      <p>For cultures, communities, and each other</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className={styles.rightColumn}>
            <section className={styles.missionSection}>
              <h2 className={styles.missionTitle}>
                OUR MISSION
              </h2>
              <p className={styles.missionText}>
                To connect curious travelers through the power of shared discoveries and real, local experiences. We believe that the best travel advice comes from those who have walked the path before you, and that every journey has the potential to inspire countless others.
              </p>
            </section>

            <section className={styles.contactSection}>
              <h2 className={styles.contactTitle}>
                Contact Us
              </h2>
              <p className={styles.contactDescription}>
                Have a question, idea, or just want to say hi? Fill out the form below and we'll get back to you.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message..."
                  rows={5}
                  value={contactForm.message}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  required
                ></textarea>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Submit
                  <Send className={styles.buttonIcon} />
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;