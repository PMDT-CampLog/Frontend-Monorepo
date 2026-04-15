// Configuração base do ESLint para todo o monorepo
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    // Proibir importação de apps dentro de packages (fluxo unidirecional)
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@camplog/web/*", "@camplog/studio/*"],
            message: "packages não devem importar de apps.",
          },
        ],
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
};

module.exports = config;
