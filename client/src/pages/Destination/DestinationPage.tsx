import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Add } from "@mui/icons-material";
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
            <div>
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
            <>
              {!isAuthenticated && (
                <div className={styles.authNotice}>
                  <p>
                    <Link to="/login" className={styles.authLink}>Login</Link> or{' '}
                    <Link to="/signup" className={styles.authLink}>sign up</Link> to view detailed destination information and connect with fellow travelers.
                  </p>
                </div>
              )}
            <div className={styles.destinationsGrid}>
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default DestinationPage;