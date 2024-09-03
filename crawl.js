
const { JSDOM } = require('jsdom')
//5. send a fetch request to the url- retuns a promise
//async function crawlPage(currentUrl){- to crawl 1 webpage
    //to crawl the whole website- shd give 3 arnts
    /*
    
   //6d. define function crawlPage - 3 params:
   baseURL - the staring point- e.g homepage
    currentUrl - the page we're on currently
    pages- obj that keeps track of all the parogress of crawling
    Need to ensure curUrl  is on the same domain as baseurl - if encounter a wbsite not belonging- ignore it */
async function crawlPage(baseURL, currentUrl, pages){

    //6f. Create new URL constructors for baseUrl and currUrl
    const baseUrlObj= new URL(baseURL)
    const currUrl = new URL(currentUrl)

    //6g. logic - if host names are different
    if(baseUrlObj.hostname !== currUrl.hostname){
        //fn returns the pages obj so we can keep track crawled obj- if hosts different- skip this page
        //returns pages obj- so we can keep track what we already crawled
        return pages
    }
    //to ensure we havent faced this url already- take the normalized version of this url
    //use our normalizeURL fn and input the cuurent url
    //if normalizedCurrUrl exists in pages obj- that means we visited this wewsite already

    //6h. Check if we crawled this page already?
    //pass curUrl into normalizeUrl fn
    const normalizedCurrUrl = normalizeURL(currUrl)
    //if we saw this page already, increment the count by 1

    //6h.
    if(pages[normalizedCurrUrl] > 0){
        //
        pages[normalizedCurrUrl]++
        //and return the pages obj
        return pages

    }

    //6. i. create entry to normCurUrl and initialize it with 1;
    pages[normalizedCurrUrl] = 1;
    console.log(`actively crawling: ${currUrl}`)


    //6 a. make a fetch request to cuurent url
    try{

        const resp = await fetch(currUrl)
        // b.to get the html of the webpage- html body
        //console.log(resp.text);
        // save html output into a var htmlBody
        
// 6.j.extract all of the links from the html so we have more pages to crawl
        const htmlBody= await resp.text();      
        const nextUrls = getURLsFromHtml(htmlBody, baseURL)

        //6k.  iterate over the nextUrls
        for (const nextUrl of nextUrls){
        
          //6 l. recursively crawl the pages- exhaustively crawling- instead of pasing curenturl - we're pasing the nexturl
            //as the function ableve returned a new pages obj- we using it
            pages = await crawlPage(baseURL, nextUrl, pages)

        }
        //6.b. check if status code is avobe 399:
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentUrl}`)
        //we just stop crawling and return this function
        //6n. when done with crawling return the pages obj
            return pages
        }

        //6.c. parse headers and check if the output is html
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            //non html responce, content type: application/xml, on page: http://wagslane.dev/sitemap.xml
            console.log(`non-html responce, content type: ${contentType}, on page: ${currentUrl}`);
            return pages  
        }
        console.log(await resp.text());  
    }
    // catch of the fetch url in 6a.
    catch(err){
        console.log(`error in fetch:${err.message}, on page: ${currentUrl}`);
    }
    return pages
    
}
//2. str contains html content (source) for extracting urls, base url to resolve rel. urls
function getURLsFromHtml(htmlBody, baseURL){
  //create an empty array
  const urls = []
   // Create a new JSDOM object from the HTML body
  const dom = new JSDOM(htmlBody)
  //access all a elements
  const aElements = dom.window.document.querySelectorAll('a')
  //iterate over a el-nts
  for (const aElement of aElements){
      // Check if the href is a relative URL
    if (aElement.href.slice(0,1) === '/'){
      try {
        // Resolve the relative URL against the base URL
        urls.push(new URL(baseURL, aElement.href).href)
      } catch (err){
        console.log(`Relative url has an err:${err.message}: ${aElement.href}`)
      }
    } else {
      // for absolute url- if url is already abs- create a URL obj directly from aEl.href
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`Absolute url has an err${err.message}: ${aElement.href}`)
      }
    }
  }
  // Return the array of URLs
  return urls
}

//1.
function normalizeURL(url){
  //create URL object (urlObj)
  const urlObj = new URL(url)
  //use properties of URL object- hostname and pathname
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  //define lofic- if ... & ends with a /
  if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    //ignore the last char
    fullPath = fullPath.slice(0, -1)
  }
  //in the end return the fullpath
  return fullPath
}

module.exports = {
  normalizeURL,
  getURLsFromHtml,
  crawlPage,
}
