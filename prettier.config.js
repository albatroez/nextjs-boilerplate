/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 4,
    trailingComma: "es5",
    experimentalTernaries: true,
};

export default config;
