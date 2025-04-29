import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  js.configs.recommended,
  


]);
