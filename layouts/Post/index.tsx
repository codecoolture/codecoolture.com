import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import { Blockquote } from "../../components/Blockquote";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Code } from "../../components/Code";
import { Codeblock } from "../../components/Codeblock";
import { Figure } from "../../components/Figure";
import { Heading } from "../../components/Heading";
import { Link } from "../../components/Link";
import { List } from "../../components/List";
import { Seo } from "../../components/Seo";
import { Text } from "../../components/Text";
import { Timestamp } from "../../components/Timestamp";
import { Article } from "../../entities/Article";
import { Application } from "../Application";
import { Theme } from "../Application/Theme";
import { Footer } from "./components/Footer";

export interface PostProps {
  post: Pick<Article, "metadata"> & {
    breadcrumbs: () => Array<{ label: string; url?: string }>;
  } & { content: MDXRemoteSerializeResult };
}

export function Post({ post }: PostProps) {
  return (
    <>
      <Seo post={post} />

      <Application theme={Theme.Light}>
        <section className="Post">
          <Application.Column>
            <header className="Post__Header">
              <Breadcrumbs path={post.breadcrumbs()} />
              <Timestamp date={post.metadata.date} />
            </header>

            <MDXRemote
              components={{
                a: Link,
                blockquote: Blockquote,
                code: Code,
                h1: function h1(props: JSX.IntrinsicElements["h1"]) {
                  return <Heading el="h1" size="jumbo" {...props} />;
                },
                h2: function h2(props: JSX.IntrinsicElements["h2"]) {
                  return <Heading el="h2" size="l" {...props} />;
                },
                h3: function h3(props: JSX.IntrinsicElements["h3"]) {
                  return <Heading el="h3" size="m" {...props} />;
                },
                img: (props: JSX.IntrinsicElements["img"]) => <Figure className="Post__Figure" {...props} />,
                inlineCode: Code,
                li: List.Item,
                ol: function OrderedList(props: JSX.IntrinsicElements["ol"]) {
                  return <List type="number">{props.children}</List>;
                },
                p: Text,
                pre: Codeblock,
                ul: List,
              }}
              {...post.content}
            />

            <Footer />
          </Application.Column>
        </section>
      </Application>
    </>
  );
}
