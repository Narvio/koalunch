module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: ["error", "double"],
    "comma-dangle": ["off"],
    "max-len": ["off"],
    "class-methods-use-this": ["off"],
    "object-shorthand": ["off"],
    "lines-between-class-members": ["off"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "prefer-destructuring": ["off"],
    "no-param-reassign": ["off"],
    "import/prefer-default-export": ["off"]
  },
  overrides: [{
    files: [
      "**/__tests__/*.{j,t}s?(x)",
      "**/tests/unit/**/*.spec.{j,t}s?(x)",
    ],
    env: {
      mocha: true,
    },
  }, ],
};
