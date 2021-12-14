import React from "react";

type LinkProps = Pick<JSX.IntrinsicElements["a"], "href" | "target"> & {
  className?: string;
  children: React.ReactNode;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  // NOTE: there is an open issue with the `forwardRef` API:
  // https://github.com/yannickcr/eslint-plugin-react/issues/3140
  //
  // eslint-disable-next-line react/prop-types
  ({ children, className, href, target }: LinkProps, ref) => {
    const classes = ["Link", className].filter(Boolean).join(" ");

    return (
      <a className={classes} href={href} target={target} ref={ref}>
        {children}
      </a>
    );
  },
);

Link.displayName = "Link";
