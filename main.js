const { crawlPage } = require('./crawl.js')
//import { crawlPage } from './crawl.js';

async function main(){

    if(process.argv.length < 3){  
        console.log("no website provided");
        process.exit(1);
        
    }
    if(process.argv.length > 3){
        console.log( "too manycmd line args");
        process.exit(1);
       
    }
    // the baseurl that we'll be crawling will be at index 2
    const baseUrl = process.argv[2];
    console.log(`starting crawl of ${baseUrl}`);
    //console.log(process.argv);
    
    //invoke function crawlPage()
    crawlPage(baseUrl);
}
main();

//'C:\\Program Files\\nodejs\\node.exe',
//'C:\\Users\\GO-Office\\Downloads\\vsCode\\projComdLineNodeJsAug24\\main.js',
//'wagslane.dev'