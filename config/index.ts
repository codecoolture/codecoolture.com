import { join } from "path";

enum Environment {
  Development = "development",
  Production = "production",
}

interface Setting {
  writing: {
    articles: string;
    notes: string;
  };
}

const Settings: { [index: string]: Setting } = {
  [Environment.Development]: {
    writing: {
      articles: join(process.cwd(), "cms/content/blog"),
      notes: join(process.cwd(), "cms/content/notes"),
    },
  },
  [Environment.Production]: {
    writing: {
      articles: join(process.cwd(), "cms/content/blog"),
      notes: join(process.cwd(), "cms/content/notes"),
    },
  },
};

export function getConfig(): Setting {
  return Settings[process.env.NODE_ENV];
}
