import NextLink from "next/link";
import { ApiArticle } from "../../cms/api/ApiArticle";
import { classNames } from "../../lib/classNames";
import { Heading } from "../Heading";
import { Link } from "../Link";
import { Text } from "../Text";
import { Timestamp } from "../Timestamp";

export type PostThumbnailProps = {
  className?: string;
  post: ApiArticle;
};

export function PostThumbnail({ className, post }: PostThumbnailProps) {
  const classes = classNames("PostThumbnail", className);

  return (
    <div className={classes}>
      <Heading el="p" size="m" className="PostThumbnail__Title">
        <Link as={NextLink} href={post.url}>
          {post.title}
        </Link>
      </Heading>

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

      <Text>{post.spoiler}</Text>
    </div>
  );
}
