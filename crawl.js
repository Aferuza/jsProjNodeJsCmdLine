
const { JSDOM } = require('jsdom')

//send a fetch request to the url- this fn retuns a promise

//async function crawlPage(currentUrl){- to crawl 1 webpage
    //to crawl the whole website- shd give 3 arnts
    /*
    baseURL - the staring poin
    currentUrl - the page we're on currently
    pages- obj that keeps track of all the parogress of crawling
    -Need to ensure curUrl  is on the same domain as baseurl - if encounter a wbsite not belonging- ignore it
    -Create a new URL constructor
    */
async function crawlPage(baseURL, currentUrl, pages){
   
    const baseUrlObj= new URL(baseURL)
    const currUrl = new URL(currentUrl)

    //
    if(baseUrlObj.hostname !== currUrl.hostname){
        //fn returns the pages obj so we can keep track crawled obj- if hosts different- skip this page
        return pages
    }

    //to ensure we havent faced this url already- take the normalized version of this url
    //use our normalizeURL fn and input the cuurent url
    //if normalizedCurrUrl exists in pages obj- that means we visited this wewsite already

    const normalizedCurrUrl = normalizeURL(currUrl)
    //if we saw this page already, incre,ent the count

    if(pages[normalizedCurrUrl] > 0){
        //
        pages[normalizedCurrUrl]++
        //and return the pages obj
        return pages

    }

    //create entry to normCurUrl and initialize it with 1;
    pages[normalizedCurrUrl] = 1;
    console.log(`actively crawling: ${currUrl}`)


    //make a fetch request to cuurent url
    try{

        const resp = await fetch(currUrl)
        //to get the html of the webpage:
        //console.log(resp.text);

        //can save html output into a variable
        const htmlBody= await resp.text();
        //extract all of the links from the html so we have more pages to crawl
        const nextUrls = getURLsFromHTML(htmlBody, baseURL)

        //now can iterate over the nextUrl
        for (const nextUrl of nextUrls){
            //recursively crawl these pages- exhaustively crawling- instad of pasing curenturl - we're pasing the nexturl
            //as the function ableve returned a new pages obj- we using it
            pages = await crawlPage(baseURL, nextUrl, pages)

        }


        //check if status code is avobe 399:
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentUrl}`)
            //we just stop crawling and return this functionn
            return pages
        }

        //parse headers and check if the output is html
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            //non html responce, content type: application/xml, on page: http://wagslane.dev/sitemap.xml
            console.log(`non-html responce, content type: ${contentType}, on page: ${currentUrl}`);
            return pages
            
        }
        console.log(await resp.text());  
    }
    catch(err){
        console.log(`error in fetch:${err.message}, on page: ${currentUrl}`);
    }
    return pages
    
}

function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')
  for (const aElement of aElements){
    if (aElement.href.slice(0,1) === '/'){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}

function normalizeURL(url){
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
}
