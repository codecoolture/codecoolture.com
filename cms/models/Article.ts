import { ApiArticle } from "../api/ApiArticle";
import { Markdown } from "../lib/Markdown";
import { isMetadata, Metadata } from "./Metadata";

export class Article {
  public static fromMarkdown(markdown: Markdown) {
    const content = markdown.getContent();
    const metadata = markdown.getMetadata();

    if (!isMetadata(metadata)) {
      throw new Error(`Invalid metadata: ${JSON.stringify(metadata)}`);
    }

    return new Article(content, metadata);
  }

  private constructor(private content: string, private metadata: Metadata) {}

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

  public toApiArticle(defaults: Partial<ApiArticle> = {}): ApiArticle {
    return {
      canonical: this.metadata.canonical ?? null,
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
