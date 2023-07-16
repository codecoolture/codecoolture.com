import { GetStaticPaths, GetStaticProps } from "next";
import { orderBy } from "lodash";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { ApiCollection } from "@/cms/api/ApiCollection";
import { getBlogpostRepository, getCollectionRepository, getNotesRepository } from "@/cms/repositories";
import { Heading } from "@/components/Heading";
import { Application } from "@/layouts/Application";
import { Posts } from "@/layouts/Posts";
import { isDevelopment } from "@/lib/env";

interface CollectionProps {
  articles: ApiArticle[];
  collection: ApiCollection;
}

export default function CollectionPage(props: CollectionProps) {
  return (
    <Application>
      <Application.Article>
        <Heading el="h1" size="jumbo">
          Collection: {props.collection.name}
        </Heading>

        <Posts posts={props.articles} />
      </Application.Article>
    </Application>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await (await getCollectionRepository()).all()).map((collection) => {
    return { params: { slug: collection.getSlug() } };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<CollectionProps> = async ({ params }) => {
  if (undefined === params || typeof params.slug !== "string") {
    throw new Error("ERROR: Cannot create a collection page without slug");
  }

  const collection = await (await getCollectionRepository()).show(params.slug);

  const blogposts = await (await getBlogpostRepository()).all({ drafts: isDevelopment() });
  const notes = await (await getNotesRepository()).all({ drafts: isDevelopment() });

  const articles = orderBy([...blogposts, ...notes], (article) => article.getDate(), "desc").filter((article) => {
    return article.getCollections().some((c) => c.getSlug() === collection.getSlug());
  });

  return {
    props: {
      articles: articles.map((article) => article.toApiArticle()),
      collection: collection.toApiCollection(),
    },
  };
};
