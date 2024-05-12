import { GetStaticProps } from "next";

import { ApiCollection } from "@/cms/api/ApiCollection";
import { getCollectionRepository } from "@/cms/repositories";
import { Collections } from "@/components/Collections";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Application } from "@/layouts/Application";

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

        <Collections collections={props.collections} />
      </Application.Article>
    </Application>
  );
}

export const getStaticProps: GetStaticProps<CollectionsPageProps> = async () => {
  const collections = await getCollectionRepository().all();

  return {
    props: {
      collections: await Promise.all(collections.map((collection) => collection.toApiCollection())),
    },
  };
};
