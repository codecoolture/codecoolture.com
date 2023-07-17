import { orderBy } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { ApiCollection } from "@/cms/api/ApiCollection";
import { getBlogpostRepository, getCollectionRepository, getNotesRepository } from "@/cms/repositories";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Heading } from "@/components/Heading";
import { Application } from "@/layouts/Application";
import { Posts } from "@/layouts/Posts";
import { isDevelopment } from "@/lib/env";
import { Collections } from "@/components/Collections";

interface CollectionProps {
  articles: ApiArticle[];
  collection: ApiCollection;
  collections: ApiCollection[];
}

export default function CollectionPage(props: CollectionProps) {
  return (
    <Application>
      <Application.Article>
        <Heading el="h1" size="jumbo">
          Collection: {props.collection.name}
        </Heading>

        <Posts posts={props.articles} />

        <Heading el="h2" size="xl" className="CollectionPage__AllCollections">
          Browse all collections
        </Heading>

        <Collections collections={props.collections} />
      </Application.Article>
    </Application>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getCollectionRepository().all()).map((collection) => {
    return { params: { slug: collection.getSlug() } };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<CollectionProps> = async ({ params }) => {
  if (undefined === params || typeof params.slug !== "string") {
    throw new Error("ERROR: Cannot create a collection page without slug");
  }

  const collection = await getCollectionRepository().show(params.slug);
  const collections = await getCollectionRepository().all();

  const blogposts = await getBlogpostRepository().all({ drafts: isDevelopment() });
  const notes = await getNotesRepository().all({ drafts: isDevelopment() });

  const articles = orderBy([...blogposts, ...notes], (article) => article.getDate(), "desc").filter((article) => {
    return article.getCollections().some((c) => c.getSlug() === collection.getSlug());
  });

  return {
    props: {
      articles: articles.map((article) => article.toApiArticle()),
      collection: collection.toApiCollection(),
      collections: collections.map((collection) => collection.toApiCollection()),
    },
  };
};
