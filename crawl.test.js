const { normalizeURL, getUrlsFromHtml, crawlPage } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

// const crawl = require('./crawl.js');
// import { normalizeURL, getUrlsFromHtml } from './crawl.js';
// import { test, expect } from '@jest/globals';

const { test, expect } = pkg;

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})
//check if fn can extract the absolute url
test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>absolute></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})
//check if fn can extract the relative url
test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>relative></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both abs and rel', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="invalid"><span>Invalid></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  //expecting bad url will not be extracted- go to the fn
  const expected = [ ]
  expect(actual).toEqual(expected)
})