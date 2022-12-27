import { getConfig } from "@/config";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { RssFeedGenerator } from "./RssFeedGenerator";

(async function run() {
  const generator = new RssFeedGenerator([getConfig().writing.articles, getConfig().writing.notes]);

  const feed = await generator.generate();

  await writeFile(join(__dirname, "../../public/feed.xml"), feed);
})();
