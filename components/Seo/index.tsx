import Head from "next/head";
import React from "react";
import { Article } from "../../entities/Article";

function description(post?: Pick<Article, "metadata">) {
  if (!post) {
    return "Soy Sergio y vivo en Asturias. Mi principal área de conocimiento es el diseño e implementación de arquitecturas web sostenibles. Ayudo a equipos de ingeniería a entregar valor de manera confiable, rápida y continua.";
  }

  return post.metadata.spoiler;
}

function image(post?: Pick<Article, "metadata">) {
  if (!post || !post.metadata.cover) {
    return "https://codecoolture.com/static/img/square-logo.png";
  }

  return post.metadata.cover;
}

function title(post?: Pick<Article, "metadata">) {
  if (!post) {
    return "Codecoolture: Consultoría, Workshops y JavaScript";
  }

  return post.metadata.title;
}

function type(post?: Pick<Article, "metadata">) {
  if (post) {
    return "article";
  }

  return "website";
}

function url(post?: Pick<Article, "metadata">) {
  if (!post) {
    return "https://codecoolture.com";
  }

  return "https://codecoolture.com" + post.metadata.url;
}

export function Seo({ post }: { post?: Pick<Article, "metadata"> }) {
  return (
    <Head>
      <meta name="description" content={description(post)} />
      <meta
        name="keywords"
        content="consultoría, javascript, front-end, react, formación, tdd, testing, desarrollo, typescript, node, consultor"
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

      {post && post.metadata.canonical && <link rel="canonical" href={post.metadata.canonical} />}

      <title>{title(post)}</title>
    </Head>
  );
}
