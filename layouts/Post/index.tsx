import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ApiArticle } from "../../cms/api/ApiArticle";
import { Blockquote } from "../../components/Blockquote";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Code } from "../../components/Code";
import { Codeblock } from "../../components/Codeblock";
import { Figure } from "../../components/Figure";
import { Heading } from "../../components/Heading";
import { LinkWithoutRef } from "../../components/Link";
import { List } from "../../components/List";
import { Seo } from "../../components/Seo";
import { Text } from "../../components/Text";
import { Timestamp } from "../../components/Timestamp";
import { Application } from "../Application";
import { Footer } from "./components/Footer";

export interface PostProps {
  breadcrumbs: Array<{ label: string; url?: string }>;

  mdx: MDXRemoteSerializeResult;

  post: ApiArticle;
}

export function Post({ breadcrumbs, mdx, post }: PostProps) {
  return (
    <>
      <Seo post={post} />

      <Application>
        <section className="Post">
          <Application.Column>
            <header className="Post__Header">
              <Breadcrumbs path={breadcrumbs} />
              <Timestamp date={post.date} />
            </header>

            <MDXRemote
              components={{
                a: LinkWithoutRef,
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
              {...mdx}
            />

            <Footer />
          </Application.Column>
        </section>
      </Application>
    </>
  );
}
