import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import { ApiArticle } from "../../cms/api/ApiArticle";
import { noteRepository } from "../../cms/repositories";
import { Post } from "../../layouts/Post";
import { isDevelopment } from "../../lib/env";

interface NoteProps {
  mdx: MDXRemoteSerializeResult;
  note: ApiArticle;
}

export default class Notes extends React.Component<NoteProps> {
  public render() {
    return <Post breadcrumbs={[{ label: "Notes", url: "/notes" }]} mdx={this.props.mdx} post={this.props.note} />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await noteRepository.all({ drafts: isDevelopment() })).map((note) => {
    const slug = note.metadata.url.split("/").pop();

    if (!slug) {
      throw new Error(`ERROR: Missing slug for Note. ${JSON.stringify(note.metadata, null, 2)}`);
    }

    return { params: { slug } };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<NoteProps> = async ({ params }) => {
  if (undefined === params) {
    throw new Error("ERROR: Cannot create a Note without slug");
  }

  const note = await noteRepository.show(`${params.slug}.mdx`, { drafts: isDevelopment() });

  return {
    props: {
      note: note.toApiArticle({ cover: "https://codecoolture.com/static/notes/cover.jpg" }),

      mdx: await serialize(note.content, {
        mdxOptions: {
          rehypePlugins: [require("@mapbox/rehype-prism")],
          remarkPlugins: [remarkUnwrapImages],
        },
      }),
    },
  };
};
