import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

import base from "./base.js";

export default defineConfig([
  ...base,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      globals: globals.browser,
    },

    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  },
]);
