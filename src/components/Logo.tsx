import { ImgHTMLAttributes, forwardRef } from "react";

interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ width = 120, height = 120, className = "", alt = "New Modern Beauty Salon", priority = false, ...props }, ref) => {
    const loading = priority ? "eager" : "lazy";

    return (
      <img
        ref={ref}
        src="/logo.jpg"
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={priority ? "sync" : "async"}
        className={className}
        {...props}
      />
    );
  }
);

Logo.displayName = "Logo";

export default Logo;