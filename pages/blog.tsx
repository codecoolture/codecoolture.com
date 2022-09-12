import { GetStaticProps } from "next";
import NextLink from "next/link";
import React from "react";
import { ApiArticle } from "../cms/api/ApiArticle";
import { blogpostRepository } from "../cms/repositories";
import { Heading } from "../components/Heading";
import { Link } from "../components/Link";
import { Text } from "../components/Text";
import { Application } from "../layouts/Application";
import { Posts } from "../layouts/Posts";
import { isDevelopment } from "../lib/env";

interface ArticlesProps {
  articles: ApiArticle[];
}

export default class Articles extends React.Component<ArticlesProps> {
  public render() {
    return (
      <Application>
        <Application.Article>
          <Heading el="h1" size="jumbo">
            Blog
          </Heading>

          <Text size="l">
            These are long-form texts about software design, sustainable code, and continuous delivery. You may read
            more casual writings in the{" "}
            <NextLink href="/notes" passHref>
              <Link>Notes</Link>
            </NextLink>{" "}
            section if you wish.
          </Text>

          <Posts posts={this.props.articles || []} />
        </Application.Article>
      </Application>
    );
  }
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const articles = await blogpostRepository.all({ drafts: isDevelopment() });

  return {
    props: {
      articles: await Promise.all(articles.map((article) => article.toApiArticle())),
    },
  };
};
