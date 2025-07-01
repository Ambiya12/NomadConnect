import React from "react";
import { Search } from "@mui/icons-material";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchQuery: string;
  selectedRegion: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  selectedRegion,
  onSearchChange,
  onRegionChange,
}) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search destinations or keywords"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className={styles.select}
      >
        <option value="">All Countries</option>
        <option value="indonesia">Indonesia</option>
        <option value="japan">Japan</option>
        <option value="france">France</option>
        <option value="morocco">Morocco</option>
        <option value="italy">Italy</option>
        <option value="vietnam">Vietnam</option>
        <option value="thailand">Thailand</option>
        <option value="spain">Spain</option>
        <option value="greece">Greece</option>
        <option value="portugal">Portugal</option>
      </select>
    </div>
  );
};

export default SearchBar;
