import { GetStaticProps } from "next";
import NextLink from "next/link";

import { ApiCollection } from "@/cms/api/ApiCollection";
import { getCollectionRepository } from "@/cms/repositories";
import { Application } from "@/layouts/Application";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Link } from "@/components/Link";

type CollectionsPageProps = {
  collections: ApiCollection[];
};

export default function CollectionsPage(props: CollectionsPageProps) {
  return (
    <Application>
      <Application.Article>
        <Heading el="h1" size="jumbo">
          Collections
        </Heading>

        <Text size="l">Articles are sometimes grouped into collections. Here you may find all of them.</Text>

        <ul className="Page__Collections">
          {props.collections.map((collection) => (
            <li key={collection.slug}>
              <Link as={NextLink} href={`/collections/${collection.slug}`}>
                #{collection.slug}
              </Link>
            </li>
          ))}
        </ul>
      </Application.Article>
    </Application>
  );
}

export const getStaticProps: GetStaticProps<CollectionsPageProps> = async () => {
  const collections = await (await getCollectionRepository()).all();

  return {
    props: {
      collections: await Promise.all(collections.map((collection) => collection.toApiCollection())),
    },
  };
};
