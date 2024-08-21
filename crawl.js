function normalizeURL(urlString){
    //use built in url constuctor
    const urlObj = new URL(urlString)

    //we only care for hostname and pathname
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`

    //if the hostpath isnt empy and the last char is a /
    if(hostpath.length>0 && hostpath.slice(-1)==='/'){
        //return evthing untill the last char - slash
        return hostpath.slice(0,-1);
    }
    //otherwise return the hostpath as it is
    return hostpath;
    }
    
// makes normalizeURL available to other functions
module.exports = {
    normalizeURL,
}


