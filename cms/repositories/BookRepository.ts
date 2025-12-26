import { library } from "@/cms/content/library.json";
import { Book, toBook } from "@/cms/models/Book";

export class BookRepository {
  public all(): Book[] {
    return library.map(toBook);
  }
}
