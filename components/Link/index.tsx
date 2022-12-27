import { classNames } from "@/lib/classNames";

export type LinkProps = Pick<JSX.IntrinsicElements["a"], "href" | "rel" | "target" | "className" | "children"> & {
  as?: React.ElementType;
};

export const Link = ({ as, children, className, href, rel, target }: LinkProps) => {
  const Komponent = as || "a";

  return (
    <Komponent className={classNames("Link", className)} href={href} target={target} rel={rel}>
      {children}
    </Komponent>
  );
};
