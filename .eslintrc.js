module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "prettier",
    "react",
    "react-hooks"
  ],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-undef": "off",
    "react-hooks/exhaustive-deps": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
