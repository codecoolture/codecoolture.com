import React from "react";
import { classNames } from "../../lib/classNames";

type LinkProps = Pick<JSX.IntrinsicElements["a"], "href" | "rel" | "target"> & {
  className?: string;
  children: React.ReactNode;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  // NOTE: there is an open issue with the `forwardRef` API:
  // https://github.com/yannickcr/eslint-plugin-react/issues/3140
  //
  // eslint-disable-next-line react/prop-types
  ({ children, className, href, rel, target }: LinkProps, ref) => {
    return (
      <a className={classNames("Link", className)} href={href} target={target} ref={ref} rel={rel}>
        {children}
      </a>
    );
  },
);

Link.displayName = "Link";
