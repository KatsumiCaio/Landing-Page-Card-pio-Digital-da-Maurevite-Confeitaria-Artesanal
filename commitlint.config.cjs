module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'test',
        'chore',
        'docs',
        'style',
        'perf',
        'ci',
        'build',
        'revert',
      ],
    ],
    'subject-case': [0],
  },
};
