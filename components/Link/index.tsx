import { forwardRef } from "react";
import { classNames } from "../../lib/classNames";

type LinkProps = Pick<JSX.IntrinsicElements["a"], "href" | "rel" | "target" | "className" | "children">;

export const LinkWithoutRef = ({ children, className, href, rel, target }: LinkProps) => {
  return (
    <a className={classNames("Link", className)} href={href} target={target} rel={rel}>
      {children}
    </a>
  );
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, className, href, rel, target }, ref) => {
  return (
    <a className={classNames("Link", className)} href={href} target={target} ref={ref} rel={rel}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
