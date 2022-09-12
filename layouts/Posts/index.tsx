import { orderBy } from "lodash";
import NextLink from "next/link";
import { Article } from "../../cms/models/Article";
import { Heading } from "../../components/Heading";
import { Link } from "../../components/Link";
import { Text } from "../../components/Text";
import { Timestamp } from "../../components/Timestamp";

export interface PostsProps {
  posts: Article[];
}

export function Posts({ posts }: PostsProps) {
  const groupByYear = posts.reduce<Record<number, Article[]>>((acc, current) => {
    const year = new Date(current.metadata.date).getFullYear();

    acc[year] = (acc[year] || []).concat(current);

    return acc;
  }, {});

  return (
    <>
      {orderBy(Object.entries(groupByYear), "[0]", "desc").map(([year, articles]) => {
        return (
          <>
            <Heading el="h2" size="xl" className="Posts__Title">
              {year}
            </Heading>

            {articles.map((post) => {
              const { date, draft, language, spoiler, title, url } = post.metadata;

              return (
                <>
                  <Heading el="p" size="m" className="Post__Title">
                    <NextLink href={url} passHref>
                      <Link>{title}</Link>
                    </NextLink>
                  </Heading>

                  <ul className="Post__Subheading">
                    <li className="Post__Subheading__Item">
                      <Timestamp className="Post__Timestamp" date={date} />
                    </li>

                    {typeof draft === "boolean" && draft && (
                      <li className="Post__Subheading__Item">
                        <p className="Post__Badge Post__Badge--Draft">Draft</p>
                      </li>
                    )}

                    {typeof language === "string" && (
                      <li className="Post__Subheading__Item">
                        <p className="Post__Badge Post__Badge--Language">{language}</p>
                      </li>
                    )}
                  </ul>

                  <Text>{spoiler}</Text>
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
}
