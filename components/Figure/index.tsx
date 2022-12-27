import { classNames } from "@/lib/classNames";

export type FigureProps = {
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  src?: string;
  title?: string;
};

export function Figure({ className, title, ...props }: FigureProps) {
  return (
    <figure className={classNames("Figure", className)}>
      <img className="Figure__Img" loading="lazy" {...props} />

      <figcaption className="Figure__Caption">{title}</figcaption>
    </figure>
  );
}
