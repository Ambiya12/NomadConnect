const API_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("public/")
    ? imagePath.substring(7)
    : imagePath;
  return `${API_URL}/${cleanPath}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const filterDestinations = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  destinations: any[],
  searchQuery: string,
  selectedRegion: string
) => {
  return destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesRegion =
      !selectedRegion ||
      destination.country.toLowerCase().includes(selectedRegion.toLowerCase());

    return matchesSearch && matchesRegion;
  });
};
