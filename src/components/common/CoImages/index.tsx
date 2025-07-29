import { useState, ImgHTMLAttributes } from "react";
import styles from "./Image.module.css";

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> {
  src: string;
  alt: string;
  lazy?: boolean;
  fallbackSrc?: string;
  className?: string;
  onLoadingComplete?: (success: boolean) => void;
}

export default function CoImage({
  src,
  alt,
  lazy = true,
  fallbackSrc,
  className = "",
  onLoadingComplete,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadingComplete?.(true);
  };

  const handleError = () => {
    setHasError(true);
    onLoadingComplete?.(false);
  };

  return (
    <img
      src={hasError && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      className={`${styles["image-component"]} ${!isLoaded ? styles.loading : ""} ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}
