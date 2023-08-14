/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    '@viclafouch/eslint-config-viclafouch',
    '@viclafouch/eslint-config-viclafouch/imports',
    '@viclafouch/eslint-config-viclafouch/next',
    '@viclafouch/eslint-config-viclafouch/typescript',
    '@viclafouch/eslint-config-viclafouch/prettier'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    'jsx-a11y/media-has-caption': 'off'
  }
}
