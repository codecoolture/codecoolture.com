import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import rehypeHighligh from "rehype-highlight";
import remarkUnwrapImages from "remark-unwrap-images";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { getBlogpostRepository } from "@/cms/repositories";
import { Post } from "@/layouts/Post";
import { isDevelopment } from "@/lib/env";

interface ArticleProps {
  article: ApiArticle;
  mdx: MDXRemoteSerializeResult;
}

export default class Articles extends React.Component<ArticleProps> {
  public render() {
    return <Post breadcrumbs={[{ label: "Blog", url: "/blog" }]} mdx={this.props.mdx} post={this.props.article} />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getBlogpostRepository().all({ drafts: isDevelopment() })).map((article) => {
    const slug = article.getUrl().split("/").pop();

    if (!slug) {
      throw new Error(`ERROR: Missing slug for Note. ${JSON.stringify(article.toApiArticle(), null, 2)}`);
    }

    return { params: { slug } };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  if (undefined === params) {
    throw new Error("ERROR: Cannot create a blogpost without slug");
  }

  const article = await getBlogpostRepository().show(`${params.slug}.mdx`, { drafts: isDevelopment() });

  return {
    props: {
      article: article.toApiArticle({ cover: "https://codecoolture.com/static/articles/cover.jpg" }),

      mdx: await serialize(article.getContent(), {
        mdxOptions: {
          rehypePlugins: [rehypeHighligh],
          remarkPlugins: [remarkUnwrapImages],
        },
      }),
    },
  };
};
