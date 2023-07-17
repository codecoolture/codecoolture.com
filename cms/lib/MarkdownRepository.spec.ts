import { join } from "path";

import { DirectoryNotFound, FileNotFound } from "./errors";
import { MarkdownRepository } from "./MarkdownRepository";

describe("MarkdownRepository", () => {
  const FIXTURES_DIR_PATH = join(__dirname, "../../tests/fixtures/cms/lib/MarkdownRepository");

  describe(".fromDirectory", () => {
    it("throws an error if the root directory does not exist", async () => {
      expect(() => MarkdownRepository.fromDirectory("not-found-directory")).toThrowError(DirectoryNotFound);
    });

    it("builds the instance otherwise", async () => {
      expect(MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH))).toBeInstanceOf(MarkdownRepository);
    });
  });

  describe("#all", () => {
    it("returns an empty collection if there are no markdowns", async () => {
      const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./empty"));

      const result = await subject.all();

      expect(result).toEqual([]);
    });

    it("returns all the available markdown files sorted by date", async () => {
      const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./examples"));

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

    describe("working with drafts", () => {
      it("does not return drafts by default", async () => {
        const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./drafts"));

        const results = await subject.all();

        expect(results).toEqual([
          expect.objectContaining({
            metadata: expect.objectContaining({ title: "Not a draft" }),
          }),
        ]);
      });

      it("does not return drafts if explicitly asked not to", async () => {
        const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./drafts"));

        const results = await subject.all({ drafts: false });

        expect(results).toEqual([
          expect.objectContaining({
            metadata: expect.objectContaining({ title: "Not a draft" }),
          }),
        ]);
      });

      it("returns drafts if asked to", async () => {
        const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./drafts"));

        const results = await subject.all({ drafts: true });

        expect(results).toEqual([
          expect.objectContaining({
            metadata: expect.objectContaining({ title: "Not a draft" }),
          }),
          expect.objectContaining({
            metadata: expect.objectContaining({ title: "A draft" }),
          }),
        ]);
      });
    });
  });

  describe("#show", () => {
    it("throws an exception if the file does not exist", async () => {
      const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./examples"));

      await expect(subject.show("non-existing")).rejects.toThrowError(FileNotFound);
    });

    it("returns the file otherwise", async () => {
      const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./examples"));

      const result = await subject.show("first-article.md");

      expect(result).toEqual(
        expect.objectContaining({
          metadata: expect.objectContaining({ date: "2019-03-01", title: "Mid article" }),
        }),
      );
    });

    describe("working with drafts", () => {
      it("throws an exception if the file is a draft and drafts are not allowed", async () => {
        const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./drafts"));

        await expect(subject.show("draft.md")).rejects.toThrowError(FileNotFound);
        await expect(subject.show("draft.md", { drafts: false })).rejects.toThrowError(FileNotFound);
      });

      it("returns the file if it is a draft and drafts are allowed", async () => {
        const subject = MarkdownRepository.fromDirectory(join(FIXTURES_DIR_PATH, "./drafts"));

        const result = await subject.show("draft.md", { drafts: true });

        expect(result).toEqual(
          expect.objectContaining({
            metadata: expect.objectContaining({ title: "A draft" }),
          }),
        );
      });
    });
  });
});
