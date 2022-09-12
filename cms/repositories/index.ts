import { getConfig } from "../../config";
import { MarkdownRepository } from "../lib/MarkdownRepository";
import { ArticleRepository } from "./ArticleRepository";

export const blogpostRepository: ArticleRepository = await MarkdownRepository.fromDirectory(
  getConfig().writing.articles,
);

export const noteRepository: ArticleRepository = await MarkdownRepository.fromDirectory(getConfig().writing.notes);
