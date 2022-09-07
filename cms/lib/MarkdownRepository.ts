import { pathExists, readdir } from "fs-extra";
import { orderBy, reject } from "lodash";
import { Article } from "../../entities/Article";
import { FileNotFound } from "../../exceptions/FileNotFound";
import { Markdown } from "./Markdown";

type AllOptions = { drafts: boolean };
type ShowOptions = { drafts: boolean };

export class MarkdownRepository {
  public static async fromDirectory(path: string) {
    const isValidPath = await pathExists(path);

    if (!isValidPath) {
      throw new Error(`Directory "${path}" does not exist!`);
    }

    return new MarkdownRepository(path);
  }

  private constructor(private root: string) {}

  public async all(options: AllOptions = { drafts: false }): Promise<Article[]> {
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

    const articlesFromNewestToOldest = orderBy(articles, ["metadata.date"], ["desc"]);

    if (options.drafts) {
      return articlesFromNewestToOldest;
    }

    return reject(articlesFromNewestToOldest, "metadata.draft");
  }

  public async show(path: string, options: ShowOptions = { drafts: false }): Promise<Article> {
    try {
      const markdown = await Markdown.fromFile(`${this.root}/${path}`);

      if (!options.drafts && markdown.getMetadata().draft) {
        throw new FileNotFound();
      }

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
