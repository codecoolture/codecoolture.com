import { ApiArticle } from "@/cms/api/ApiArticle";
import { Markdown } from "@/cms/lib/Markdown";
import { getCollectionRepository } from "@/cms/repositories";

import { isMetadata, Metadata } from "./Metadata";
import { Collection } from "./Collection";

export class Article {
  public static async fromMarkdown(markdown: Markdown) {
    const content = markdown.getContent();
    const metadata = markdown.getMetadata();

    if (!isMetadata(metadata)) {
      throw new Error(`Invalid metadata: ${JSON.stringify(metadata)}`);
    }

    const collections = await Promise.all(
      Array.from(new Set(metadata.collections ?? [])).map((collection) => getCollectionRepository().show(collection)),
    );

    return new Article(content, metadata, collections);
  }

  private constructor(
    private content: string,
    private metadata: Metadata,
    private collections: Collection[],
  ) {}

  public isDraft() {
    return !this.metadata.published;
  }

  public getDate() {
    return this.metadata.date;
  }

  public getUrl() {
    return this.metadata.url;
  }

  public getContent() {
    return this.content;
  }

  public getCollections() {
    return this.collections;
  }

  public toApiArticle(defaults: Partial<ApiArticle> = {}): ApiArticle {
    return {
      canonical: this.metadata.canonical ?? null,
      collections: this.collections.map((collection) => collection.toApiCollection()),
      content: this.content,
      cover: this.metadata.cover ?? defaults.cover ?? null,
      date: this.metadata.date,
      draft: this.isDraft(),
      language: this.metadata.language ?? null,
      spoiler: this.metadata.spoiler ?? null,
      title: this.metadata.title,
      url: this.metadata.url,
    };
  }
}
