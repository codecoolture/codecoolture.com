import Head from "next/head";

import { ApiArticle } from "@/cms/api/ApiArticle";

function description(post?: ApiArticle) {
  if (!post) {
    return "Hey, I’m Sergio! I build maintainable and performant full-stack web applications.";
  }

  return post.spoiler ?? undefined;
}

function image(post?: ApiArticle) {
  if (!post || !post.cover) {
    return "https://codecoolture.com/static/img/square-logo.png";
  }

  return post.cover;
}

function title(post?: ApiArticle) {
  if (!post) {
    return "Sergio Álvarez (Codecoolture)";
  }

  return post.title;
}

function type(post?: ApiArticle) {
  if (post) {
    return "article";
  }

  return "website";
}

function url(post?: ApiArticle) {
  if (!post) {
    return "https://codecoolture.com";
  }

  return "https://codecoolture.com" + post.url;
}

export function Seo({ post }: { post?: ApiArticle }) {
  return (
    <Head>
      <meta name="description" content={description(post)} />
      <meta
        name="keywords"
        content="consulting, javascript, front-end, react, workshops, tdd, testing, software, typescript, node, consultant, freelance"
      />

      <meta key="og:description" property="og:description" content={description(post)} />
      <meta key="og:image" property="og:image" content={image(post)} />
      <meta key="og:title" property="og:title" content={title(post)} />
      <meta key="og:type" property="og:type" content={type(post)} />
      <meta key="og:url" property="og:url" content={url(post)} />

      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="twitter:creator" name="twitter:creator" content="@codecoolture" />
      <meta key="twitter:description" name="twitter:description" content={description(post)} />
      <meta key="twitter:image" name="twitter:image" content={image(post)} />
      <meta key="twitter:site" name="twitter:site" content="@codecoolture" />
      <meta key="twitter:title" name="twitter:title" content={title(post)} />

      {typeof post?.canonical === "string" && <link rel="canonical" href={post.canonical} />}

      <title>{title(post)}</title>
    </Head>
  );
}
