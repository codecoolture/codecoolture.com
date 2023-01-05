import { MarkdownRepository } from "@/cms/lib/MarkdownRepository";
import { getConfig } from "@/config";

import { ArticleRepository } from "./ArticleRepository";

export const blogpostRepository: ArticleRepository = await MarkdownRepository.fromDirectory(
  getConfig().writing.articles,
);

export const noteRepository: ArticleRepository = await MarkdownRepository.fromDirectory(getConfig().writing.notes);
