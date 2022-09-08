import { join } from "path";
import { RssFeedGenerator } from "./RssFeedGenerator";

describe("RssFeedGenerator", () => {
  const FIXTURES_DIR_PATH = join(__dirname, "../../tests/fixtures/bin/rss/RssFeedGenerator");

  it("returns a valid atom feed", async () => {
    const subject = new RssFeedGenerator([join(FIXTURES_DIR_PATH, "empty")]);

    const feed = await subject.generate();

    expect(feed).toMatch(/<feed xmlns="http:\/\/www.w3.org\/2005\/Atom">/);
  });

  it("does not return any article if the directory does not contain any", async () => {
    const subject = new RssFeedGenerator([join(FIXTURES_DIR_PATH, "empty")]);

    const feed = await subject.generate();

    expect(feed).not.toMatch(/<entry>/);
  });

  it("returns all the articles for all the paths", async () => {
    const subject = new RssFeedGenerator([
      join(FIXTURES_DIR_PATH, "multiple/a"),
      join(FIXTURES_DIR_PATH, "multiple/b"),
    ]);

    const feed = await subject.generate();

    expect(feed).toMatch(/<entry>/g);
    expect(feed).toMatch(/<title type="html"><!\[CDATA\[A very good post\]\]><\/title>/);
    expect(feed).toMatch(/<title type="html"><!\[CDATA\[A very profound thought\]\]><\/title>/);
  });

  it("returns HTML content", async () => {
    const subject = new RssFeedGenerator([
      join(FIXTURES_DIR_PATH, "multiple/a"),
      join(FIXTURES_DIR_PATH, "multiple/b"),
    ]);

    const feed = await subject.generate();

    expect(feed).toMatch(/<content type="html"><!\[CDATA\[<p>Hello :\)<\/p>/);
  });

  it("ignores drafts", async () => {
    const subject = new RssFeedGenerator([
      join(FIXTURES_DIR_PATH, "multiple/a"),
      join(FIXTURES_DIR_PATH, "multiple/b"),
    ]);

    const feed = await subject.generate();

    expect(feed).not.toMatch(/<title type="html"><!\[CDATA\[Draft\]\]><\/title>/);
  });

  it("returns articles in the right chronological order", async () => {
    const subject = new RssFeedGenerator([
      join(FIXTURES_DIR_PATH, "order/blog"),
      join(FIXTURES_DIR_PATH, "order/notes"),
    ]);

    const feed = await subject.generate();

    const articles = feed.match(/<entry>.*?<\/entry>/gs);

    if (articles === null) {
      fail("No articles found");
    }

    expect(articles[0]).toMatch(/<title type="html"><!\[CDATA\[Newest\]\]><\/title>/);
    expect(articles[1]).toMatch(/<title type="html"><!\[CDATA\[Mid\]\]><\/title>/);
    expect(articles[2]).toMatch(/<title type="html"><!\[CDATA\[Oldest\]\]><\/title>/);
  });
});
