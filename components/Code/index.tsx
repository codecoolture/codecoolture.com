import React from "react";

interface CodeProps {
  "data-qa"?: string;

  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className, ...props }: CodeProps) {
  const classes = ["Code", className].filter(Boolean).join(" ");

  return (
    <code className={classes} {...props}>
      {children}
    </code>
  );
}
