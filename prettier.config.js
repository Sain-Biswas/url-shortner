/**
 * Prettier configuration for the entire project
 *
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions}
 */
const configuration = {
  semi: true,
  arrowParens: "avoid",
  experimentalOperatorPosition: "start",
  experimentalTernaries: true,
  htmlWhitespaceSensitivity: "strict",
  singleQuote: false,
  singleAttributePerLine: true,
  trailingComma: "none",

  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default configuration;
