import React from "react";

type LinkProps = Pick<React.HTMLProps<HTMLAnchorElement>, "href" | "target"> & {
  className?: string;
  children: React.ReactNode;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
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
