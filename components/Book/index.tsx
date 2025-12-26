import Image from "next/image";
import React, { useState } from "react";

import { Book as BookData } from "@/cms/models/Book";

import styles from "./Book.module.css";

export type BookProps = {
  as?: keyof React.JSX.IntrinsicElements;
  book: BookData;
};

export function Book({ as = "div", book }: Readonly<BookProps>) {
  const Komponent = as;

  const [now] = useState(() => Date.now());

  const yearsAgo = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      -Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24 * 30 * 12)),
      "year",
    );
  };

  return (
    <Komponent>
      <Image
        src={book.image}
        alt={`Cover of the book ${book.title}`}
        width={230}
        height={345}
        style={{ objectFit: "contain" }}
      />

      <dl className={styles.Details}>
        <dt className="sr-only">Title</dt>
        <dd className={styles.Title}>{book.title}</dd>

        <dt className="sr-only">Author</dt>
        <dd className={styles.Author}>{book.author}</dd>

        <dt className="sr-only">Read At</dt>
        <dd className={styles.Date}>last read {yearsAgo(new Date(book.readAt))}</dd>
      </dl>
    </Komponent>
  );
}
