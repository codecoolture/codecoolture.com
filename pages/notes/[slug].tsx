import { merge } from "lodash";
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
  note: Omit<ApiArticle, "content"> & { content: MDXRemoteSerializeResult };
}

export default class Notes extends React.Component<NoteProps> {
  public render() {
    const post = {
      ...this.props.note,
      breadcrumbs: () => [{ label: "Notes", url: "/notes" }],
    };

    return <Post post={post} />;
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

  const defaultNote = { metadata: { cover: "https://codecoolture.com/static/notes/cover.jpg" } };
  const note = merge(defaultNote, await noteRepository.show(`${params.slug}.mdx`, { drafts: isDevelopment() }));

  return {
    props: {
      note: {
        canonical: note.metadata.canonical ?? null,
        content: await serialize(note.content, {
          mdxOptions: {
            rehypePlugins: [require("@mapbox/rehype-prism")],
            remarkPlugins: [remarkUnwrapImages],
          },
        }),
        cover: note.metadata.cover,
        date: note.metadata.date,
        draft: !!note.metadata.draft,
        language: note.metadata.language ?? null,
        spoiler: note.metadata.spoiler,
        title: note.metadata.title,
        url: note.metadata.url,
      },
    },
  };
};
