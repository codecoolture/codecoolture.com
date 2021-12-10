import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Blockquote } from "../../../../components/Blockquote";
import { Breadcrumb, Breadcrumbs } from "../../../../components/Breadcrumbs";
import { Code } from "../../../../components/Code";
import { Codeblock } from "../../../../components/Codeblock";
import { Heading } from "../../../../components/Heading";
import { Link } from "../../../../components/Link";
import { List } from "../../../../components/List";
import { Text } from "../../../../components/Text";

export interface ArticleProps {
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
  className?: string;
}

export function Article({ breadcrumbs = [], children, className }: ArticleProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
  const classes = ["AppArticle", className].filter(Boolean).join(" ");

  return (
    <MDXProvider
      components={{
        a: Link,
        blockquote: Blockquote,
        code: Code,
        h1: function h1(props: JSX.IntrinsicElements["h1"]) {
          return <Heading el="h1" size="xl" {...props} />;
        },
        h2: function h2(props: JSX.IntrinsicElements["h2"]) {
          return <Heading el="h2" size="l" {...props} />;
        },
        inlineCode: Code,
        li: List.Item,
        p: Text,
        pre: Codeblock,
        ul: List,
      }}
    >
      <article className={classes}>
        {hasBreadcrumbs && <Breadcrumbs className="AppArticle__Breadcrumbs" path={breadcrumbs} />}
        {children}
      </article>
    </MDXProvider>
  );
}
