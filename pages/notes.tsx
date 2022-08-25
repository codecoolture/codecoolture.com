import { GetStaticProps } from "next";
import NextLink from "next/link";
import React from "react";
import { Heading } from "../components/Heading";
import { Link } from "../components/Link";
import { Text } from "../components/Text";
import { getConfig } from "../config";
import { Article as Note } from "../entities/Article";
import { Application } from "../layouts/Application";
import { Posts } from "../layouts/Posts";
import { MarkdownRepository } from "../repositories/MardownRepository";

interface NotesProps {
  notes: Note[];
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
  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.notes);

  const notes = await repository.all();

  return { props: { notes } };
};
