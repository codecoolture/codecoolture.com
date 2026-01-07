import z from "zod";

const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  readAt: z.iso.date().optional(),
  category: z.union([
    z.literal("foundational"),
    z.literal("craft"),
    z.literal("mental-models"),
    z.literal("exploration"),
    z.literal("reference"),
    z.literal("uncategorized"),
  ]),
  image: z.string(),
  status: z.union([z.literal("read")]),
  language: z.union([z.literal("en"), z.literal("es")]),
});

export type Book = z.infer<typeof BookSchema>;

export const toBook = (data: unknown): Book => {
  return BookSchema.parse(data);
};
