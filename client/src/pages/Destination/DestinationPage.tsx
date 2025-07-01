import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Add, ArrowForward } from "@mui/icons-material";
import { useAuth } from "../Login/hooks/AuthContext";
import { useDestinations } from "./service/useDestinations";
import { filterDestinations } from "../../utils/destinationUtils";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoResults from "../../components/NoResults/NoResults";
import styles from "./DestinationPage.module.css";

const DestinationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { destinations, loading, error, refetch } = useDestinations();

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredDestinations = filterDestinations(
    destinations,
    searchQuery,
    selectedRegion
  );

  if (loading) {
    return <LoadingSpinner message="Loading destinations..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error loading destinations"
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>Discover hidden gems around</h1>
          <h2 className={styles.subtitle}>
            the world shared by real travelers
          </h2>

          <SearchBar
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            onSearchChange={setSearchQuery}
            onRegionChange={setSelectedRegion}
          />

          {isAuthenticated && (
            <div className={styles.addDestinationContainer}>
              <Link
                to="/create-destination"
                className={styles.addDestinationButton}
              >
                <Add className={styles.buttonIcon} />
                Share Your Hidden Gem
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className={styles.destinationsSection}>
        <div className={styles.destinationsContainer}>
          {filteredDestinations.length === 0 ? (
            <NoResults isAuthenticated={isAuthenticated} />
          ) : (
            <div className={styles.destinationsGrid}>
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.contributeSection}>
        <div className={styles.contributeContainer}>
          <h2 className={styles.contributeTitle}>Contribute Your Spot?</h2>
          <p className={styles.contributeDescription}>
            Know a hidden gem that deserves to be shared? Help fellow travelers
            discover amazing places by contributing your secret spots.
          </p>
          {isAuthenticated ? (
            <Link to="/create-destination" className={styles.contributeButton}>
              Share Your Discovery
              <ArrowForward className={styles.buttonIcon} />
            </Link>
          ) : (
            <Link to="/login" className={styles.contributeButton}>
              Login to Share
              <ArrowForward className={styles.buttonIcon} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default DestinationPage;
