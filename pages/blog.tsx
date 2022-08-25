import { GetStaticProps } from "next";
import NextLink from "next/link";
import React from "react";
import { Heading } from "../components/Heading";
import { Link } from "../components/Link";
import { Text } from "../components/Text";
import { getConfig } from "../config";
import { Article } from "../entities/Article";
import { Application } from "../layouts/Application";
import { Posts } from "../layouts/Posts";
import { MarkdownRepository } from "../repositories/MardownRepository";

interface ArticlesProps {
  articles: Article[];
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
  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.articles);

  const articles = await repository.all();

  return { props: { articles } };
};
