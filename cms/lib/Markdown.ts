import { readFile } from "node:fs/promises";

import frontMatter from "front-matter";

export class Markdown {
  public static async fromFile(path: string): Promise<Markdown> {
    const markdown = await readFile(path, "utf-8");

    return new Markdown(markdown);
  }

  private constructor(private content: string) {}

  public getMetadata(): unknown {
    const { attributes: metadata } = frontMatter(this.content);

    return metadata;
  }

  public getContent(): string {
    const { body } = frontMatter(this.content);

    return body;
  }
}
