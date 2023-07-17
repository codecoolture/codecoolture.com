import NextLink from "next/link";

import { ApiCollection } from "@/cms/api/ApiCollection";

export function Collections(props: { collections: ApiCollection[] }) {
  if (props.collections.length === 0) {
    return null;
  }

  return (
    <ul className="Collections">
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
