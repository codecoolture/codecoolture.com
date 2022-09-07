import { orderBy, reject } from "lodash";
import { readdir, stat } from "node:fs/promises";
import { Article } from "../../entities/Article";
import { DirectoryNotFound } from "../../exceptions/DirectoryNotFound";
import { FileNotFound } from "../../exceptions/FileNotFound";
import { Markdown } from "./Markdown";

type AllOptions = { drafts: boolean };
type ShowOptions = { drafts: boolean };

function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  return typeof err === "object" && err !== null && "code" in err;
}

export class MarkdownRepository {
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
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        throw new FileNotFound(`The requested file "${this.root}/${path}" does not exist!`);
      }

      throw error;
    }
  }
}
