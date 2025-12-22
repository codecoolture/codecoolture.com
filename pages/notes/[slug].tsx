import { GetStaticPaths, GetStaticProps } from "next";
import rehypeHighlight from "rehype-highlight";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import { serialize, type SerializeResult } from "next-mdx-remote-client/serialize";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { getNotesRepository } from "@/cms/repositories";
import { Post } from "@/layouts/Post";
import { isDevelopment } from "@/lib/env";

type NoteProps = {
  mdx: SerializeResult;
  note: ApiArticle;
};

export default function Note(props: Readonly<NoteProps>) {
  return <Post breadcrumbs={[{ label: "Notes", url: "/notes" }]} mdx={props.mdx} post={props.note} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getNotesRepository().all({ drafts: isDevelopment() })).map((note) => {
    const slug = note.getUrl().split("/").pop();

    if (!slug) {
      throw new Error(`ERROR: Missing slug for Note. ${JSON.stringify(note.toApiArticle(), null, 2)}`);
    }

    return { params: { slug } };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<NoteProps> = async ({ params }) => {
  if (undefined === params) {
    throw new Error("ERROR: Cannot create a Note without slug");
  }

  const note = await getNotesRepository().show(`${params.slug}.mdx`, { drafts: isDevelopment() });

  return {
    props: {
      note: note.toApiArticle({ cover: "https://codecoolture.com/static/notes/cover.jpg" }),

      mdx: await serialize({
        source: note.getContent(),

        options: {
          mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeUnwrapImages],
            remarkPlugins: [remarkGfm],
          },
        },
      }),
    },
  };
};
