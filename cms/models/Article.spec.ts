import { join } from "node:path";

import { Markdown } from "@/cms/lib/Markdown";

import { Article } from "./Article";
import { Collection } from "./Collection";

describe("Article", () => {
  describe(".fromMarkdown", () => {
    it("throws an exception if the metadata is invalid", async () => {
      const markdown = await Markdown.fromFile(
        join(process.cwd(), "tests/fixtures/cms/models/Article/invalid-metadata.md"),
      );

      await expect(() => Article.fromMarkdown(markdown)).rejects.toThrow();
    });

    it("returns an article", async () => {
      const markdown = await Markdown.fromFile(join(process.cwd(), "tests/fixtures/cms/models/Article/valid.md"));

      const article = Article.fromMarkdown(markdown);

      await expect(article).resolves.toBeInstanceOf(Article);
    });

    describe("handling collections", () => {
      it("throws an exception if the collection does not exist", async () => {
        const markdown = await Markdown.fromFile(
          join(process.cwd(), "tests/fixtures/cms/models/Article/invalid-collection.md"),
        );

        await expect(() => Article.fromMarkdown(markdown)).rejects.toThrow(
          "Invalid collection: 'non-existing-collection'",
        );
      });

      it("returns the article with the collections", async () => {
        const markdown = await Markdown.fromFile(
          join(process.cwd(), "tests/fixtures/cms/models/Article/valid-collection.md"),
        );

        const article = await Article.fromMarkdown(markdown);

        expect(article.getCollections()).toEqual([new Collection("books", "Books")]);
      });

      it("does not return duplicated collections", async () => {
        const markdown = await Markdown.fromFile(
          join(process.cwd(), "tests/fixtures/cms/models/Article/duplicated-collections.md"),
        );

        const article = await Article.fromMarkdown(markdown);

        expect(article.getCollections()).toEqual([new Collection("books", "Books")]);
      });
    });
  });
});
