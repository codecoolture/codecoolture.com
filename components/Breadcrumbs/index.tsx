import { Link } from "@/components/Link";
import { classNames } from "@/lib/classNames";
import NextLink from "next/link";

export type Breadcrumb = { label: string; url?: string };

interface BreadcrumbsProps {
  className?: string;
  path: Breadcrumb[];
}

export function Breadcrumbs({ className, path }: BreadcrumbsProps) {
  return (
    <div className={classNames("Breadcrumbs", className)}>
      {path.map((breadcrumb, idx) => (
        <div className="Breadcrumb" key={idx}>
          {breadcrumb.url ? (
            <Link as={NextLink} href={breadcrumb.url}>
              {breadcrumb.label}
            </Link>
          ) : (
            breadcrumb.label
          )}
        </div>
      ))}
    </div>
  );
}
