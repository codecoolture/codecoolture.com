export class FileNotFound extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, FileNotFound.prototype);
  }
}
