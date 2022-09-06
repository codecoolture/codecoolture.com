import { join } from "path";
import { MarkdownRepository } from "./MarkdownRepository";

describe("MarkdownRepository", () => {
  const FIXTURES_DIR_PATH = join(__dirname, "../../tests/fixtures/cms/lib/MarkdownRepository");

  describe(".fromDirectory", () => {
    it("throws an error if the root directory does not exist", async () => {
      await expect(MarkdownRepository.fromDirectory("not-found-directory")).rejects.toThrowError();
    });

    it("builds the instance otherwise", async () => {
      await expect(MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH))).resolves.toBeInstanceOf(
        MarkdownRepository,
      );
    });
  });

  describe("#all", () => {
    it("returns an empty collection if there are no markdowns", async () => {
      const subject = await MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./empty"));

      const result = await subject.all();

      expect(result).toEqual([]);
    });

    it("returns all the available markdown files sorted by date", async () => {
      const subject = await MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./examples"));

      const result = await subject.all();

      expect(result).toEqual([
        expect.objectContaining({
          metadata: expect.objectContaining({ date: "2019-04-01" }),
        }),
        expect.objectContaining({
          metadata: expect.objectContaining({ date: "2019-03-01" }),
        }),
        expect.objectContaining({
          metadata: expect.objectContaining({ date: "2019-01-01" }),
        }),
      ]);
    });
  });

  describe("#show", () => {
    it("throws an exception if the file does not exist", async () => {
      const subject = await MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./examples"));

      await expect(subject.show("non-existing")).rejects.toThrowError();
    });

    it("returns the file otherwise", async () => {
      const subject = await MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./examples"));

      const result = await subject.show("first-article.md");

      expect(result).toEqual(
        expect.objectContaining({
          metadata: { date: "2019-03-01", title: "Mid article" },
        }),
      );
    });
  });
});
