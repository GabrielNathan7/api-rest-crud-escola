import globals from "globals";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  js.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("airbnb-base"),
  {
    rules: {
      "no-console": "off",
      "import/first": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": [0, { "commonjs": true, "amd": true }],
      "import/named": 0,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
      "import/namespace": 0,
      "import/default": 0,
      "import/export": 0,
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      "object-curly-newline": "off",
      "no-empty-function": "off",
      "camelcase": "off"
    }
  }
];
