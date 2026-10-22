import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypeScript from "eslint-config-next/typescript"

/**
 * ESLint 9 flat config.
 *
 * `eslint-config-next@16` exports flat config arrays directly, so no
 * eslintrc bridge (`FlatCompat`) is required.
 *
 * - `next/core-web-vitals` adds the React Compiler and hook rules on top of
 *   the base Next.js rules.
 * - `next/typescript` turns on the type-aware rules and replaces
 *   `no-unused-vars` with the TypeScript-aware equivalent.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
      ".vercel/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]

export default eslintConfig
