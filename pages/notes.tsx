import { GetStaticProps } from "next";
import NextLink from "next/link";
import React from "react";
import { ApiArticle } from "../cms/api/ApiArticle";
import { noteRepository } from "../cms/repositories";
import { Heading } from "../components/Heading";
import { Link } from "../components/Link";
import { Text } from "../components/Text";
import { Application } from "../layouts/Application";
import { Posts } from "../layouts/Posts";
import { isDevelopment } from "../lib/env";

interface NotesProps {
  notes: ApiArticle[];
}

export default class Notes extends React.Component<NotesProps> {
  public render() {
    return (
      <Application>
        <Application.Article>
          <Heading el="h1" size="jumbo">
            Notes
          </Heading>

          <Text size="l">
            Here you may find casual writings about software development, productivity, random thoughts, books, and
            everything that does not really fit in the{" "}
            <NextLink href="/blog" passHref>
              <Link>blog</Link>
            </NextLink>{" "}
            🙂
          </Text>

          <Posts posts={this.props.notes || []} />
        </Application.Article>
      </Application>
    );
  }
}

export const getStaticProps: GetStaticProps<NotesProps> = async () => {
  const notes = await noteRepository.all({ drafts: isDevelopment() });

  return {
    props: {
      notes: notes.map((note) => {
        return {
          canonical: note.metadata.canonical ?? null,
          content: note.content,
          cover: note.metadata.cover ?? null,
          date: note.metadata.date,
          draft: !!note.metadata.draft,
          language: note.metadata.language ?? null,
          spoiler: note.metadata.spoiler,
          title: note.metadata.title,
          url: note.metadata.url,
        };
      }),
    },
  };
};
