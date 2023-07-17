import { MarkdownRepository } from "@/cms/lib/MarkdownRepository";
import { getConfig } from "@/config";

import { ArticleRepository } from "./ArticleRepository";
import { CollectionRepository } from "./CollectionRepository";

export const getBlogpostRepository = (): ArticleRepository =>
  MarkdownRepository.fromDirectory(getConfig().writing.articles);

export const getNotesRepository = (): ArticleRepository => MarkdownRepository.fromDirectory(getConfig().writing.notes);

export const getCollectionRepository = (): CollectionRepository => new CollectionRepository();
