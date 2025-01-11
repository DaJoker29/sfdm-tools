import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: ["airbnb-base"],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {},
  },
];
