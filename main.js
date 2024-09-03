const { crawlPage } = require('./crawl.js')
//import { crawlPage } from './crawl.js';

async function main(){

    if(process.argv.length < 3){  
        console.log("no website provided");
        process.exit(1);
        
    }
    if(process.argv.length > 3){
        console.log( "too many cmd line args");
        process.exit(1);
       
    }
    // the baseurl that we'll be crawling will be at index 2
    const baseUrl = process.argv[2];
    console.log(`starting crawl of ${baseUrl}`);
    //console.log(process.argv);
    
    //invoke function crawlPage()
    //crawlPage(baseUrl);
    //we will pass baseurl 2 times- as starting and current url and an empty object- since we havent crwled yet and obj will be filled up as we crawl

    //7. crawlpage returns a Promise- I shd await for it!
    const pages = await crawlPage(baseUrl, baseUrl, {});
    //create a report of this - in repor file

    //8. log in  the pages object
    for(const page of Object.entries(pages)){
        console.log(pages);
        
    }
}
main();

//'C:\\Program Files\\nodejs\\node.exe',
//'C:\\Users\\GO-Office\\Downloads\\vsCode\\projComdLineNodeJsAug24\\main.js',
//'wagslane.dev'