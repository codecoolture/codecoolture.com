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
      articles: join(process.cwd(), "writing/articles"),
      notes: join(process.cwd(), "writing/notes"),
    },
  },
  [Environment.Production]: {
    writing: {
      articles: join(process.cwd(), "writing/articles"),
      notes: join(process.cwd(), "writing/notes"),
    },
  },
};

export function getConfig(): Setting {
  return Settings[process.env.NODE_ENV];
}
