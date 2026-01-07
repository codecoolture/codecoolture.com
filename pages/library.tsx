import { GetStaticProps } from "next";

import { Book } from "@/cms/models/Book";
import { getBookRepository } from "@/cms/repositories";
import { Book as BookThumbnail } from "@/components/Book";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Text } from "@/components/Text";
import { Application } from "@/layouts/Application";

type LibraryPageProps = {
  library: Record<Book["category"], Book[]>;
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
  return (
    <ul className="LibrarySection__Books">
      {props.books.map((book) => (
        <BookThumbnail as="li" book={book} key={book.title} />
      ))}
    </ul>
  );
}

export default function LibraryPage(props: Readonly<LibraryPageProps>) {
  return (
    <Application>
      <Application.Article>
        <Heading size="jumbo">My library</Heading>

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
          <LibrarySectionHeading>Reference</LibrarySectionHeading>

          <LibrarySectionDescription>
            Books I don’t read cover to cover, but return to occasionally as a shared vocabulary or point of reference.
            They’re more about clarity and alignment than influence or inspiration.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["reference"]} />
        </LibrarySection>

        <LibrarySection>
          <LibrarySectionHeading>Exploration</LibrarySectionHeading>

          <LibrarySectionDescription>
            Curiosity-driven reading. Books that offered context, perspective, or inspiration, and sometimes influenced
            how I think, work, or approach my career, without becoming part of my core mental toolkit.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["exploration"]} />
        </LibrarySection>

        <LibrarySection>
          <LibrarySectionHeading>Uncategorized</LibrarySectionHeading>

          <LibrarySectionDescription>
            Books I remember enjoying, but whose influence is now distant or unclear. They’re works I’d need to revisit
            to reassess how they resonate with me today.
          </LibrarySectionDescription>

          <LibrarySectionBooks books={props.library["uncategorized"]} />
        </LibrarySection>

        <Text className="Library__Footer">
          I also use Goodreads as a personal reading log. If you’re curious about what I’m reading at the moment, you’ll
          find a broader and <em>more eclectic</em> mix of fiction and non-fiction{" "}
          <Link href="https://www.goodreads.com/user/show/37956895-sergio" target="_blank">
            there
          </Link>
          .
        </Text>
      </Application.Article>
    </Application>
  );
}

export const getStaticProps: GetStaticProps<LibraryPageProps> = async () => {
  const books = getBookRepository().all();

  return {
    props: {
      library: {
        foundational: books.filter((book) => book.category === "foundational"),
        craft: books.filter((book) => book.category === "craft"),
        "mental-models": books.filter((book) => book.category === "mental-models"),
        exploration: books.filter((book) => book.category === "exploration"),
        reference: books.filter((book) => book.category === "reference"),
        uncategorized: books.filter((book) => book.category === "uncategorized"),
      },
    },
  };
};
