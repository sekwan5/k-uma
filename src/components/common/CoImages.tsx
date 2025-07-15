interface CommonImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
}

const CoImage: React.FC<CommonImageProps> = ({
  src,
  alt,
  width = 100,
  height = 100,
  className = "",
  onLoad,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoad={onLoad}
      {...props}
    />
  );
};

export default CoImage;
