import { GetStaticProps } from "next";
import NextLink from "next/link";
import React from "react";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { getNotesRepository } from "@/cms/repositories";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Text } from "@/components/Text";
import { Application } from "@/layouts/Application";
import { Posts } from "@/layouts/Posts";
import { isDevelopment } from "@/lib/env";

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
            <Link as={NextLink} href="/blog">
              blog
            </Link>{" "}
            🙂
          </Text>

          <Posts posts={this.props.notes || []} />
        </Application.Article>
      </Application>
    );
  }
}

export const getStaticProps: GetStaticProps<NotesProps> = async () => {
  const notes = await getNotesRepository().all({ drafts: isDevelopment() });

  return {
    props: {
      notes: await Promise.all(notes.map((note) => note.toApiArticle())),
    },
  };
};
