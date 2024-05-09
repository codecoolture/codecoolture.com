import { ApiCollection } from "@/cms/api/ApiCollection";

export class Collection {
  constructor(
    private slug: string,
    private name: string,
  ) {}

  public getSlug() {
    return this.slug;
  }

  public getName() {
    return this.name;
  }

  public toApiCollection(): ApiCollection {
    return {
      name: this.name,
      slug: this.slug,
    };
  }
}
