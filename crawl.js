function normalizeURL(urlString){
    //
    const urlObj = new URL(urlString)

    //we only care for hostname and pathname
    return `${urlObj.hostname}${urlObj.pathname}`
    }
    
// makes normalizeURL available to other functions
module.exports = {
    normalizeURL}


