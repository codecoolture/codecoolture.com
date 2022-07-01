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
            <Heading el="p" size="m" className="Post__Title">
              <NextLink href={url} passHref>
                <Link>{title}</Link>
              </NextLink>
            </Heading>

            <ul className="Post__Subheading">
              <li className="Post__Subheading__Item">
                <Timestamp className="Post__Timestamp" date={date} />
              </li>

              {typeof language === "string" && (
                <li className="Post__Subheading__Item">
                  <p className="Post__Language">{language}</p>
                </li>
              )}
            </ul>

            <Text>{spoiler}</Text>
          </div>
        );
      })}
    </>
  );
}
