import { orderBy } from "lodash";
import React from "react";
import { ApiArticle } from "../../cms/api/ApiArticle";
import { Heading } from "../../components/Heading";
import { PostThumbnail } from "../../components/PostThumbnail";

export interface PostsProps {
  posts: ApiArticle[];
}

export function Posts({ posts }: PostsProps) {
  const groupByYear = posts.reduce<Record<number, ApiArticle[]>>((acc, current) => {
    const year = new Date(current.date).getFullYear();

    acc[year] = (acc[year] || []).concat(current);

    return acc;
  }, {});

  return (
    <>
      {orderBy(Object.entries(groupByYear), "[0]", "desc").map(([year, articles]) => {
        return (
          <React.Fragment key={year}>
            <Heading el="h2" size="xl" className="Posts__Title" data-qa="posts-group-year">
              {year}
            </Heading>

            {articles.map((post) => (
              <PostThumbnail className="Posts__Post" post={post} key={post.url} />
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
}
