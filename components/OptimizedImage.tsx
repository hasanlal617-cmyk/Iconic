import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  wrapperClassName?: string;
};

/** Wrapper around next/image with consistent defaults */
export default function OptimizedImage({
  alt,
  className,
  wrapperClassName,
  fill,
  ...props
}: OptimizedImageProps) {
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", wrapperClassName ?? "h-full w-full")}>
        <Image
          alt={alt}
          fill
          className={cn("object-cover", className)}
          sizes={props.sizes ?? "(max-width: 768px) 100vw, 50vw"}
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
