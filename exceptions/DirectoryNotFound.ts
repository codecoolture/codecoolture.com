export class DirectoryNotFound extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, DirectoryNotFound.prototype);
  }
}
