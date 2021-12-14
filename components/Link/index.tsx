import React from "react";

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
    const classes = ["Link", className].filter(Boolean).join(" ");

    return (
      <a className={classes} href={href} target={target} ref={ref} rel={rel}>
        {children}
      </a>
    );
  },
);

Link.displayName = "Link";
