import { merge } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import remarkUnwrapImages from "remark-unwrap-images";
import { getConfig } from "../../config";
import { Article as Note } from "../../entities/Article";
import { Post } from "../../layouts/Post";
import { MarkdownRepository } from "../../cms/lib/MarkdownRepository";

interface NoteProps {
  note: Pick<Note, "metadata"> & { content: MDXRemoteSerializeResult };
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
  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.notes);

  const paths = (await repository.all()).map((note) => {
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

  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.notes);

  const defaultNote = { metadata: { cover: "https://codecoolture.com/static/notes/cover.jpg" } };
  const note = merge(defaultNote, await repository.show(`${params.slug}.mdx`));

  return {
    props: {
      note: {
        content: await serialize(note.content, {
          mdxOptions: {
            rehypePlugins: [require("@mapbox/rehype-prism")],
            remarkPlugins: [remarkUnwrapImages],
          },
        }),
        metadata: note.metadata,
      },
    },
  };
};
