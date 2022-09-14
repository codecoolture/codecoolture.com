import { Feed } from "feed";
import { orderBy } from "lodash";
import { marked } from "marked";
import { MarkdownRepository } from "../../cms/lib/MarkdownRepository";

export class RssFeedGenerator {
  constructor(private paths: string[]) {}

  public async generate(): Promise<string> {
    const BASE_URL = "https://codecoolture.com";

    const feed = new Feed({
      author: {
        name: "Sergio Álvarez",
        email: "hola@codecoolture.com",
        link: "https://codecoolture.com/about",
      },
      copyright: `All rights reserved. Sergio Álvarez. ${new Date().getFullYear()}`,
      description:
        "Articles and notes about software development. Written by Sergio Álvarez. Better code, one piece at a time.",
      generator: "https://github.com/codecoolture/codecoolture.com",
      id: "https://codecoolture.com",
      image: `${BASE_URL}/static/img/rss/sergio.jpg`,
      link: "https://codecoolture.com",
      title: "Codecoolture",
    });

    const allArticles = await Promise.all(
      this.paths.map(async (path) => {
        const repository = await MarkdownRepository.fromDirectory(path);

        return repository.all({ drafts: false });
      }),
    );

    const allApiArticles = allArticles.flat().map((article) => article.toApiArticle());

    const apiArticlesFromNewestToOldest = orderBy(allApiArticles, (apiArticle) => apiArticle.date, ["desc"]);

    for (const apiArticle of apiArticlesFromNewestToOldest) {
      feed.addItem({
        title: apiArticle.title,
        id: `${BASE_URL}${apiArticle.url}`,
        link: `${BASE_URL}${apiArticle.url}`,
        description: apiArticle.spoiler ?? undefined,
        content: marked(apiArticle.content),
        date: new Date(apiArticle.date),
        image: apiArticle.cover ?? undefined,
      });
    }

    return feed.atom1();
  }
}
