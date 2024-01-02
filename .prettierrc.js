module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@batooty/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
