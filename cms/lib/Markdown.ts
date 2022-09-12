import frontMatter from "front-matter";
import { readFile } from "node:fs/promises";
import { Metadata } from "../models/Metadata";

export class Markdown {
  public static async fromFile(path: string): Promise<Markdown> {
    const markdown = await readFile(path, "utf-8");

    return new Markdown(markdown);
  }

  private constructor(private content: string) {}

  public getMetadata(): Metadata {
    const { attributes: metadata } = frontMatter<Metadata>(this.content);

    return metadata;
  }

  public getContent(): string {
    const { body } = frontMatter(this.content);

    return body;
  }
}
