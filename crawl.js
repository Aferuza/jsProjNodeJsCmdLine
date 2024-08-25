
const { JSDOM } = require('jsdom')

//send a fetch request to the url- this fn retuns a promise
async function crawlPage(currentUrl){
    console.log(`actively crawling: ${currentUrl}`)

    //make a fetch request to cuurent url
    try{
        const resp = await fetch(currentUrl)
        //to get the html of the webpage:
        console.log(resp.text);

        //check if status code is avobe 399:
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentUrl}`)
            //we just stop crawling and return this functionn
            return
        }

        //parse headers and check if the output is html
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            //non html responce, content type: application/xml, on page: http://wagslane.dev/sitemap.xml
            console.log(`non-html responce, content type: ${contentType}, on page: ${currentUrl}`);
            return
            
        }
        console.log(await resp.text());  
    }
    catch(err){
        console.log(`error in fetch:${err.message}, on page: ${currentUrl}`);
    }
    
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
