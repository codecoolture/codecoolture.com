import { Article } from "../models/Article";

type AllOptions = { drafts: boolean };
type ShowOptions = { drafts: boolean };

export interface ArticleRepository {
  all(options?: AllOptions): Promise<Article[]>;
  show(slug: string, options?: ShowOptions): Promise<Article>;
}
