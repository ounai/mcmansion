module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: [
    '*.spec.ts'
  ],
  plugins: [
    'prefer-arrow'
  ],
  rules: {
    'no-unused-vars': ['warn'],
    '@typescript-eslint/semi': ['warn', 'always'],
    '@typescript-eslint/strict-boolean-expressions': 0,
    'eol-last': ['error', 'always'],
    strict: ['error', 'global'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0
      }
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false
      }
    ],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: true }
    ],
    'func-style': [
      'error',
      'expression',
      { allowArrowFunctions: true }
    ]
  }
}
