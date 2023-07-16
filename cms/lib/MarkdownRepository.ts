import { readdir, stat } from "node:fs/promises";

import { orderBy, reject } from "lodash";

import { Article } from "@/cms/models/Article";
import { ArticleRepository } from "@/cms/repositories/ArticleRepository";

import { DirectoryNotFound, FileNotFound, isNodeError } from "./errors";
import { Markdown } from "./Markdown";

export class MarkdownRepository implements ArticleRepository {
  public static async fromDirectory(path: string) {
    try {
      /**
       * Let's check if the directory exists.
       */
      await stat(path);
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        throw new DirectoryNotFound(`The requested directory "${path}" does not exist!`);
      }

      throw error;
    }

    return new MarkdownRepository(path);
  }

  private constructor(private root: string) {}

  public all: ArticleRepository["all"] = async (options = { drafts: false }) => {
    const files = await readdir(this.root);
    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith("md") || file.endsWith("mdx"))
        .map(async (file) => {
          const markdown = await Markdown.fromFile(`${this.root}/${file}`);

          return Article.fromMarkdown(markdown);
        }),
    );

    const articlesFromNewestToOldest = orderBy(articles, (article) => article.getDate(), ["desc"]);

    if (options.drafts) {
      return articlesFromNewestToOldest;
    }

    return reject(articlesFromNewestToOldest, (article) => article.isDraft());
  };

  public show: ArticleRepository["show"] = async (slug, options = { drafts: false }) => {
    try {
      const markdown = await Markdown.fromFile(`${this.root}/${slug}`);
      const article = await Article.fromMarkdown(markdown);

      if (!options.drafts && article.isDraft()) {
        throw new FileNotFound();
      }

      return article;
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        throw new FileNotFound(`The requested file "${this.root}/${slug}" does not exist!`);
      }

      throw error;
    }
  };
}
