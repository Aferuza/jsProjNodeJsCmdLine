<<<<<<< HEAD

//const { test, expect } = require('@jest/globals');
//const sum = require('./crawl.js'); 

const { normalizeURL, getUrlsFromHtml, crawlPage } = require('./crawl.js')
const { test, expect } = require('@jest/globals')


// const crawl = require('./crawl.js');
// import { normalizeURL, getUrlsFromHtml } from './crawl.js';
// import { test, expect } from '@jest/globals';

//import pkg from '@jest/globals';
//const { test, expect } = pkg;

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

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getUrlsFromHtml(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
=======
const {normalizeURL} = require('./crawl.js');
//import fns from jest
const{test,expect}= require('@jest/globals');


//1. writing our test suite: theres a name, which takes out fn and another fn
//test #1:
test('normalizeURL strip protocol', ()=>{
    // put our url into a var input
    const input = 'https://blog.boot.dev/path';
    //set actual var to wht the function with input as param returns
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    //I am expecting the actual output to be equal to the expected output- if they equal- log it as a pass test
    expect(actual).toEqual(expected);
})

//test #2:
test('normalizeURL strip trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);



})

//test #3:
test('normalizeURL capitals',()=> {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);

>>>>>>> d6e91f33b0297393f89c760b9a5661b24159c4d0
})