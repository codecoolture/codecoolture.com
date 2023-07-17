import NextLink from "next/link";

import { ApiCollection } from "@/cms/api/ApiCollection";
import { Link } from "@/components/Link";

export function Collections(props: { collections: ApiCollection[] }) {
  if (props.collections.length === 0) {
    return null;
  }

  return (
    <ul className="Collections">
      {props.collections.map((collection) => (
        <li key={collection.slug} className="Collections__Collection">
          <Link as={NextLink} href={`/collections/${collection.slug}`}>
            #{collection.slug}
          </Link>
        </li>
      ))}
    </ul>
  );
}
