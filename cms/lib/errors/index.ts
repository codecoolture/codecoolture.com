import { DirectoryNotFound } from "./DirectoryNotFound";
import { FileNotFound } from "./FileNotFound";

export function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  return typeof err === "object" && err !== null && "code" in err;
}

export { DirectoryNotFound, FileNotFound };
