import React from "react";
import { classNames } from "../../lib/classNames";

interface CodeProps {
  "data-qa"?: string;

  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <code className={classNames("Code", className)} {...props}>
      {children}
    </code>
  );
}
