const {normalizeURL} = require('./crawl.js');
//import fns from jest

const{test,expect}= require('@jest/globals');


//now write our tests: theres a name, which takes out fn and another fn
test('normalizeURL strip protocol', ()=>{
    //set input to empty for now
    const input = 'https://blog.boot.dev/path';
    //set actual var to wht the function with input as param returns
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';

    //I am expecting the actual output to be equal to the expected output- if they equal- log it as a pass test
    expect(actual).toEqual(expected);
})