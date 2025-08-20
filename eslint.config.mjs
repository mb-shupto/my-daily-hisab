import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Change to 'warn' or 'off' for production as needed
      '@typescript-eslint/no-explicit-any': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
  },
];

export default eslintConfig;
