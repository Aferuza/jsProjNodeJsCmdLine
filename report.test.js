const { sortPages, printReport } = require ('./report.js');

test('sortPages', () => {
  const input = {
    'https://blog.boot.dev': 6,
    'https://blog.boot.dev/path': 2,
    'https://blog.boot.dev': 3
  }
  const actual = sortPages(input)
  const expected = [
['https://blog.boot.dev/path', 2],
['https://blog.boot.dev', 6],
['https://blog.boot.dev/path', 3]
    ]
  expect(actual).toEqual(expected)
})