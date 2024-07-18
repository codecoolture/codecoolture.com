import NextLink from "next/link";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Text } from "@/components/Text";
import { Timestamp } from "@/components/Timestamp";
import { classNames } from "@/lib/classNames";

export type PostThumbnailProps = {
  className?: string;
  post: ApiArticle;
};

export function PostThumbnail({ className, post }: PostThumbnailProps) {
  const classes = classNames("PostThumbnail", className);

  return (
    <div className={classes}>
      <ul className="PostThumbnail__Subheading">
        <li className="PostThumbnail__Subheading__Item">
          <Timestamp className="PostThumbnail__Timestamp" date={post.date} />
        </li>

        {typeof post.draft === "boolean" && post.draft && (
          <li className="PostThumbnail__Subheading__Item">
            <p className="PostThumbnail__Badge PostThumbnail__Badge--Draft">Draft</p>
          </li>
        )}

        {typeof post.language === "string" && (
          <li className="PostThumbnail__Subheading__Item">
            <p className="PostThumbnail__Badge PostThumbnail__Badge--Language">{post.language}</p>
          </li>
        )}
      </ul>

      <Heading el="p" size="m" className="PostThumbnail__Title">
        <Link as={NextLink} href={post.url}>
          {post.title}
        </Link>
      </Heading>

      <Text>{post.spoiler}</Text>
    </div>
  );
}
