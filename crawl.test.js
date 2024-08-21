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

})