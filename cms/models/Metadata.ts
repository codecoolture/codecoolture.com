import { z } from "zod";

const Metadata = z.object({
  canonical: z.string().url().optional(),
  cover: z.string().url().optional(),
  draft: z.boolean().optional(),
  language: z.string().optional(),
  spoiler: z.string().optional(),
  date: z.string(),
  title: z.string(),
  url: z.string(),
});

export type Metadata = z.infer<typeof Metadata>;

export function isMetadata(obj: unknown): obj is Metadata {
  const result = Metadata.safeParse(obj);

  return result.success;
}
