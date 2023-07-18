const {
  sortImports
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@viclafouch/eslint-config-viclafouch/rules/sort-imports')

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    '@viclafouch/eslint-config-viclafouch',
    '@viclafouch/eslint-config-viclafouch/next',
    '@viclafouch/eslint-config-viclafouch/typescript',
    '@viclafouch/eslint-config-viclafouch/prettier'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  overrides: [sortImports(__dirname)],
  rules: {
    'jsx-a11y/media-has-caption': 'off'
  }
}
