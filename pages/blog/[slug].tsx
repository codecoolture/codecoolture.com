import { merge } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import { getConfig } from "../../config";
import { Article } from "../../entities/Article";
import { Post } from "../../layouts/Post";
import { MarkdownRepository } from "../../repositories/MardownRepository";

interface ArticleProps {
  article: Pick<Article, "metadata"> & { content: MDXRemoteSerializeResult };
}

export default class Articles extends React.Component<ArticleProps> {
  public render() {
    const post = {
      ...this.props.article,
      breadcrumbs: () => [{ label: "Blog", url: "/blog" }],
    };

    return <Post post={post} />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.articles);

  const paths = (await repository.all()).map((article) => {
    const slug = article.metadata.url.split("/").pop();

    if (!slug) {
      throw new Error(`ERROR: Missing slug for Note. ${JSON.stringify(article.metadata, null, 2)}`);
    }

    return { params: { slug } };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  if (undefined === params) {
    throw new Error("ERROR: Cannot create a blogpost without slug");
  }

  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.articles);

  const defaultArticle = { metadata: { cover: "https://codecoolture.com/static/articles/cover.jpg" } };
  const article = merge(defaultArticle, await repository.show(`${params.slug}.mdx`));

  return {
    props: {
      article: {
        content: await serialize(article.content, {
          mdxOptions: {
            rehypePlugins: [require("@mapbox/rehype-prism")],
            remarkPlugins: [remarkUnwrapImages],
          },
        }),
        metadata: article.metadata,
      },
    },
  };
};
