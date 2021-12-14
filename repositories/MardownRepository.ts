import { pathExists, readdir } from "fs-extra";
import sortBy from "lodash/sortBy";
import { Article } from "../entities/Article";
import { FileNotFound } from "../exceptions/FileNotFound";
import { Markdown } from "./util/Markdown";

export class MarkdownRepository {
  public static async fromDirectory(path: string) {
    const isValidPath = await pathExists(path);

    if (!isValidPath) {
      throw new Error(`Directory "${path}" does not exist!`);
    }

    return new MarkdownRepository(path);
  }

  private constructor(private root: string) {}

  public async all(): Promise<Article[]> {
    const files = await readdir(this.root);
    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith("md") || file.endsWith("mdx"))
        .map(async (file) => {
          const markdown = await Markdown.fromFile(`${this.root}/${file}`);

          return {
            content: markdown.getContent(),
            metadata: markdown.getMetadata(),
          };
        }),
    );

    return sortBy(articles, "metadata.date").reverse();
  }

  public async show(path: string): Promise<Article> {
    try {
      const markdown = await Markdown.fromFile(`${this.root}/${path}`);

      return {
        content: markdown.getContent(),
        metadata: markdown.getMetadata(),
      };
    } catch (error: any) {
      if (error && error.code === "ENOENT") {
        throw new FileNotFound(`The requested file "${this.root}/${path}" does not exist!`);
      }

      throw error;
    }
  }
}
