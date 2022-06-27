import NextLink from "next/link";
import React from "react";
import { Heading } from "../../components/Heading";
import { Link } from "../../components/Link";
import { Text } from "../../components/Text";
import { Timestamp } from "../../components/Timestamp";
import { Article } from "../../entities/Article";

export interface PostsProps {
  posts: Article[];
}

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts.map((post, idx) => {
        const { date, language, spoiler, title, url } = post.metadata;

        return (
          <div key={idx} className="Posts__Item">
            {typeof language === "string" && <p className="Posts__Item__Language">{language}</p>}

            <Heading el="p" size="m" className="Posts__Title">
              <NextLink href={url} passHref>
                <Link>{title}</Link>
              </NextLink>
            </Heading>

            <Timestamp className="Posts__Timestamp" date={date} />

            <Text>{spoiler}</Text>
          </div>
        );
      })}
    </>
  );
}
