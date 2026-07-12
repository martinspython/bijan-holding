import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import a11yPlugin from 'eslint-plugin-vuejs-accessibility';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.turbo/**', 'coverage/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: vuePlugin,
      'vuejs-accessibility': a11yPlugin,
    },
    rules: {
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/click-events-have-key-events': 'warn',
      'vuejs-accessibility/form-control-has-label': 'error',
      'vuejs-accessibility/aria-role': 'error',
      'vuejs-accessibility/tabindex-no-positive': 'error',
      'vuejs-accessibility/label-has-for': 'error',
      'vuejs-accessibility/iframe-has-title': 'error',
      'vuejs-accessibility/no-autofocus': 'warn',
      'vuejs-accessibility/media-has-caption': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
];
