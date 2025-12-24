import { GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import z from "zod";

import { library } from "@/cms/content/library.json";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Application } from "@/layouts/Application";

const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  readAt: z.iso.date(),
  category: z.union([
    z.literal("foundational"),
    z.literal("craft"),
    z.literal("mental-models"),
    z.literal("worldview"),
    z.literal("exploration"),
  ]),
  image: z.string(),
  status: z.union([z.literal("read")]),
  language: z.union([z.literal("en"), z.literal("es")]),
});

type Book = z.infer<typeof BookSchema>;

type LibraryPageProps = {
  library: Record<Book["category"], Book[]>;
};

const toBook = (data: unknown): Book => {
  return BookSchema.parse(data);
};

export function LibrarySection(props: Readonly<React.PropsWithChildren>) {
  return <div className="LibrarySection">{props.children}</div>;
}

export function LibrarySectionHeading(props: Readonly<React.PropsWithChildren>) {
  return <Heading size="l">{props.children}</Heading>;
}

export function LibrarySectionDescription(props: Readonly<React.PropsWithChildren>) {
  return <Text>{props.children}</Text>;
}

export function LibrarySectionBooks(props: Readonly<{ books: Book[] }>) {
  const [now] = useState(() => Date.now());

  return (
    <ul className="LibrarySection__Books">
      {props.books.map((book) => {
        return (
          <li key={book.title}>
            <Image
              src={book.image}
              alt={`Cover of the book ${book.title}`}
              width={230}
              height={345}
              style={{ objectFit: "contain" }}
            />

            <dl className="LibrarySection__Books__Details">
              <dt className="sr-only">Title</dt>
              <dd className="LibrarySection__Book__Title">{book.title}</dd>

              <dt className="sr-only">Author</dt>
              <dd className="LibrarySection__Book__Author">{book.author}</dd>

              <dt className="sr-only">Read At</dt>
              <dd className="LibrarySection__Book__Date">
                {/* Displays relative time - e.g, 1 year ago */}
                {new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
                  -Math.floor((now - new Date(book.readAt).getTime()) / (1000 * 60 * 60 * 24 * 30 * 12)),
                  "year",
                )}
              </dd>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}

export default function LibraryPage(props: Readonly<LibraryPageProps>) {
  return (
    <Application>
      <Application.Article>
        <Heading size="jumbo">Library</Heading>

        <Text size="l">
          This isn’t an exhaustive list of everything I’ve read, but a curated selection of books from recent years that
          I’ve found valuable, influential, or simply worth sharing, across software, people, and the world around us.
        </Text>

        <LibrarySection>
          <LibrarySectionHeading>Foundational</LibrarySectionHeading>

          <LibrarySectionDescription>
            Books that permanently shaped how I think and work. These are rare by design, and their influence tends to
            persist even when I’m not consciously thinking about them.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["foundational"]} />
        </LibrarySection>

        <LibrarySection>
          <LibrarySectionHeading>Craft</LibrarySectionHeading>

          <LibrarySectionDescription>
            Books about doing the work well. Practical guidance on building software, writing, designing systems, and
            working effectively with others.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["craft"]} />
        </LibrarySection>

        <LibrarySection>
          <LibrarySectionHeading>Mental Models</LibrarySectionHeading>

          <LibrarySectionDescription>
            Books that sharpen how I reason and make decisions. They offer frameworks and lenses that influence
            judgment, trade-offs, incentives, and long-term thinking.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["mental-models"]} />
        </LibrarySection>

        <LibrarySection>
          <LibrarySectionHeading>Worldview</LibrarySectionHeading>

          <LibrarySectionDescription>
            Books that expand context beyond day-to-day work. They explore society, culture, history, and systems, and
            help situate technology within the world it operates in.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["worldview"]} />
        </LibrarySection>

        <LibrarySection>
          <LibrarySectionHeading>Exploration</LibrarySectionHeading>

          <LibrarySectionDescription>
            Curiosity-driven reading. Books that informed or inspired me, offered useful perspective, or simply expanded
            my interests, without becoming part of my core operating system.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["exploration"]} />
        </LibrarySection>
      </Application.Article>
    </Application>
  );
}

export const getStaticProps: GetStaticProps<LibraryPageProps> = async () => {
  const books = library.map(toBook);

  return {
    props: {
      library: {
        foundational: books.filter((book) => book.category === "foundational"),
        craft: books.filter((book) => book.category === "craft"),
        "mental-models": books.filter((book) => book.category === "mental-models"),
        worldview: books.filter((book) => book.category === "worldview"),
        exploration: books.filter((book) => book.category === "exploration"),
      },
    },
  };
};
