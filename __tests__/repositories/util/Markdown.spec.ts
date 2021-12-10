import { join } from "path";
import { Markdown } from "../../../repositories/util/Markdown";

describe("Markdown", () => {
  describe(".fromFile", () => {
    it("fails if the file does not exist", async () => {
      await expect(Markdown.fromFile("whatever")).rejects.toThrowError();
    });
  });

  describe("getMetadata", () => {
    let subject: Markdown;

    beforeEach(async () => {
      subject = await Markdown.fromFile(join(__dirname, "./fixtures/example.mdx"));
    });

    it("returns the metadata from the specific file", async () => {
      const metadata = subject.getMetadata();

      expect(metadata).toEqual({
        author: "Sergio Álvarez",
        date: "2019-04-01",
        title: "Testing React Applications",
      });
    });

    it("returns the content from the specific file", async () => {
      const content = subject.getContent();

      expect(content).toEqual("<CustomElement>Hola</CustomElement>\n");
    });
  });
});
