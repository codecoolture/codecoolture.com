import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  ...nextVitals,

  ...nextTypeScript,

  prettier,

  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Usage of relative parent imports is not allowed.",
            },
          ],
        },
      ],

      "react/react-in-jsx-scope": "off",

      "react/no-unknown-property": [2, { ignore: ["jsx", "global"] }],

      "import/no-unresolved": "error",

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/**",
              group: "parent",
            },
          ],
        },
      ],
    },
  },
]);
