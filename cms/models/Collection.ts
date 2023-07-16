export class Collection {
  constructor(private slug: string, private name: string) {}

  public getSlug() {
    return this.slug;
  }

  public getName() {
    return this.name;
  }
}
