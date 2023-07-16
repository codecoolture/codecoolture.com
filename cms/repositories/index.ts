import { MarkdownRepository } from "@/cms/lib/MarkdownRepository";
import { getConfig } from "@/config";

import { ArticleRepository } from "./ArticleRepository";
import { CollectionRepository } from "./CollectionRepository";

export const getBlogpostRepository = (): Promise<ArticleRepository> =>
  MarkdownRepository.fromDirectory(getConfig().writing.articles);

export const getNotesRepository = (): Promise<ArticleRepository> =>
  MarkdownRepository.fromDirectory(getConfig().writing.notes);

export const getCollectionRepository = (): Promise<CollectionRepository> => Promise.resolve(new CollectionRepository());
