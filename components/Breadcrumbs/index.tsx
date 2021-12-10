import NextLink from "next/link";
import React from "react";
import { Link } from "../Link";

export type Breadcrumb = { label: string; url?: string };

interface BreadcrumbsProps {
  className?: string;
  path: Breadcrumb[];
}

export function Breadcrumbs({ className, path }: BreadcrumbsProps) {
  const classes = ["Breadcrumbs", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {path.map((breadcrumb, idx) => (
        <div className="Breadcrumb" key={idx}>
          {breadcrumb.url ? (
            <NextLink href={breadcrumb.url} passHref>
              <Link>{breadcrumb.label}</Link>
            </NextLink>
          ) : (
            breadcrumb.label
          )}
        </div>
      ))}
    </div>
  );
}
