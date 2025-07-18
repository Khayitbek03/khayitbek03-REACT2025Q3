import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      import: eslintPluginImport,
    },
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'import/no-unresolved': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
]);
