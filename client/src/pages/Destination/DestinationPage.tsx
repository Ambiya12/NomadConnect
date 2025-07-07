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

  const filtered = filterDestinations(destinations, searchQuery, selectedRegion);

  if (loading) return <LoadingSpinner message="Loading destinations..." />;
  if (error) return <ErrorMessage title="Error loading destinations" message={error} onRetry={refetch} />;

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Discover hidden gems around</h1>
          <h2 className={styles.subtitle}>the world shared by real travelers</h2>

          <SearchBar
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            onSearchChange={setSearchQuery}
            onRegionChange={setSelectedRegion}
          />

          {isAuthenticated && (
            <Link to="/create-destination" className={styles.addButton}>
              <Add />
              Share Your Hidden Gem
            </Link>
          )}
        </div>
      </section>

      <section className={styles.main}>
        {filtered.length === 0 ? (
          <NoResults isAuthenticated={isAuthenticated} />
        ) : (
          <>
            {!isAuthenticated && (
              <div className={styles.notice}>
                <p>
                  <Link to="/login" className={styles.link}>Login</Link> or{" "}
                  <Link to="/signup" className={styles.link}>sign up</Link> to view details and connect with travelers.
                </p>
              </div>
            )}

            <div className={styles.grid}>
              {filtered.map((destination) => (
                <DestinationCard key={destination._id} destination={destination} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default DestinationPage;
