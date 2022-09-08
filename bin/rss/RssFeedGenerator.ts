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

    const newestToOldestArticles = orderBy(allArticles.flat(), "metadata.date", "desc");

    for (const article of newestToOldestArticles) {
      feed.addItem({
        title: article.metadata.title,
        id: `${BASE_URL}${article.metadata.url}`,
        link: `${BASE_URL}${article.metadata.url}`,
        description: article.metadata.spoiler,
        content: marked(article.content),
        date: new Date(article.metadata.date),
        image: article.metadata.cover,
      });
    }

    return feed.atom1();
  }
}
