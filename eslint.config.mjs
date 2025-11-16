import { defineConfig, globalIgnores } from "eslint/config";
import typescriptESLint from "typescript-eslint";

import pluginNext from "eslint-config-next";
import pluginNextVitals from "eslint-config-next/core-web-vitals";
import pluginNextTs from "eslint-config-next/typescript";

import pluginReact from "@eslint-react/eslint-plugin";
import pluginReactQuery from "@tanstack/eslint-plugin-query";

import prettier from "eslint-config-prettier/flat";
import pluginDrizzle from "eslint-plugin-drizzle";

/**
 * ESLint configuration for the entire project.
 *
 * @type { import("eslint").Linter.Config[] }
 */
const eslintConfig = defineConfig([
  ...pluginNext,
  ...pluginNextVitals,
  ...pluginNextTs,

  pluginReact.configs["strict-type-checked"],
  ...pluginReactQuery.configs["flat/recommended"],

  ...typescriptESLint.configs.strictTypeChecked,
  ...typescriptESLint.configs.stylisticTypeChecked,

  prettier,

  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],

    languageOptions: {
      parser: typescriptESLint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      drizzle: pluginDrizzle
    },

    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" }
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } }
      ],
      "@typescript-eslint/restrict-template-expressions": "off",

      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["database", "ctx.database"] }
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["database", "ctx.database"] }
      ],

      "@eslint-react/naming-convention/filename": [
        "error",
        { rule: "kebab-case" }
      ],
      "@eslint-react/naming-convention/component-name": [
        "error",
        { rule: "PascalCase", allowAllCaps: true }
      ]
    },

    settings: {
      react: {
        version: "detect"
      }
    }
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
