import { join } from "node:path";

import { Markdown } from "./Markdown";

describe("Markdown", () => {
  const FIXTURES_DIR_PATH = join(__dirname, "../../tests/fixtures/cms/lib/Markdown");

  describe(".fromFile", () => {
    it("fails if the file does not exist", async () => {
      await expect(Markdown.fromFile("whatever")).rejects.toThrowError();
    });
  });

  describe("getMetadata", () => {
    let subject: Markdown;

    beforeEach(async () => {
      subject = await Markdown.fromFile(join(FIXTURES_DIR_PATH, "./example.mdx"));
    });

    it("returns the metadata from the specific file", async () => {
      const metadata = subject.getMetadata();

      expect(metadata).toEqual({
        author: "Sergio Álvarez",
        date: "2019-04-01",
        published: true,
        title: "Testing React Applications",
      });
    });

    it("returns the content from the specific file", async () => {
      const content = subject.getContent();

      expect(content).toEqual("<CustomElement>Hola</CustomElement>\n");
    });
  });
});
