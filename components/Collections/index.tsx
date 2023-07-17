import NextLink from "next/link";

import { ApiCollection } from "@/cms/api/ApiCollection";
import { classNames } from "@/lib/classNames";

export type CollectionsProps = {
  className?: string;
  collections: ApiCollection[];
};

export function Collections(props: CollectionsProps) {
  if (props.collections.length === 0) {
    return null;
  }

  return (
    <ul className={classNames("Collections", props.className)}>
      {props.collections.map((collection) => (
        <li key={collection.slug}>
          <NextLink className="Collections__Collection" href={`/collections/${collection.slug}`}>
            #{collection.slug}
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
