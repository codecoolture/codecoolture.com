import { ApiCollection } from "./ApiCollection";

export type ApiArticle = {
  canonical: string | null;
  collections: ApiCollection[];
  content: string;
  cover: string | null;
  date: string;
  draft: boolean;
  language: string | null;
  spoiler: string | null;
  title: string;
  url: string;
};
