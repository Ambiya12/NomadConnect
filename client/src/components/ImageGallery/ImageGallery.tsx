import React, { useState } from "react";
import { getImageUrl } from "../../utils/destinationUtils";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fallbackImage =
    "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800";

  return (
    <div className={styles.imageGallery}>
      {images.length > 0 ? (
        <>
          <img
            src={getImageUrl(images[currentImageIndex])}
            alt={name}
            className={styles.mainImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt={`${name} ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=200";
                  }}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <img src={fallbackImage} alt={name} className={styles.mainImage} />
      )}
    </div>
  );
};

export default ImageGallery;
