import { z } from "zod";
import { ISO_DATE_STRING } from "../../lib/regex";

const Metadata = z
  .object({
    canonical: z.string().url().optional(),
    cover: z.string().url().optional(),
    published: z.boolean().optional(),
    language: z.string().optional(),
    spoiler: z.string().optional(),
    date: z.string().regex(ISO_DATE_STRING),
    title: z.string(),
    url: z.string(),
  })
  .strict();

export type Metadata = z.infer<typeof Metadata>;

export function isMetadata(obj: unknown): obj is Metadata {
  const result = Metadata.safeParse(obj);

  return result.success;
}
