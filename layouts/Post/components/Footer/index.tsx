import { capitalize } from "lodash";
import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { ApiArticle } from "../../../../cms/api/ApiArticle";

type ChipProps = { children: React.ReactNode; href: string; type: "twitter" | "github" };

const Chip = ({ children, href, type }: ChipProps) => {
  const kype = capitalize(type);
  const Icon = type === "twitter" ? FaTwitter : FaGithub;

  const classes = ["Post__Footer__Chip", `Post__Footer__Chip--${kype}`].join(" ");

  return (
    <a className={classes} href={href} target="blank">
      <Icon className="Post__Footer__Chip__Icon" />
      {children}
    </a>
  );
};

type FooterProps = { post: ApiArticle };

export function Footer({ post }: FooterProps) {
  const githubEditUrl = `https://github.com/codecoolture/codecoolture.com/edit/trunk/cms/content${post.url}.mdx`;
  const shareableUrl = `https://codecoolture.com${post.url}`;
  const tweet = encodeURIComponent(`Check out "${post.title}" by @codecoolture\n\n`);

  return (
    <footer className="Post__Footer">
      <Chip
        type="twitter"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableUrl)}&text=${tweet}`}
      >
        Tweet this post
      </Chip>

      <Chip type="github" href={githubEditUrl}>
        Edit on GitHub
      </Chip>
    </footer>
  );
}
