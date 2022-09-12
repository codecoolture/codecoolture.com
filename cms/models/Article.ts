import { ApiArticle } from "../api/ApiArticle";
import { Metadata } from "./Metadata";

export class Article {
  constructor(public content: string, public metadata: Metadata) {}

  public toApiArticle(): ApiArticle {
    return {
      canonical: this.metadata.canonical ?? null,
      content: this.content,
      cover: this.metadata.cover ?? null,
      date: this.metadata.date,
      draft: !!this.metadata.draft,
      language: this.metadata.language ?? null,
      spoiler: this.metadata.spoiler ?? null,
      title: this.metadata.title,
      url: this.metadata.url,
    };
  }
}
