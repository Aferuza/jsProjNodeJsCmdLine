    function sortPages(pages){
        // return an array
        //put highest on top,lowest on the bottom
        //convert obj pages into array
        const pagesArr = Object.entries(pages)
        //apply the sort method
        pagesArr.sort((a, b) => {
            ahits = a[1]
            bHits = b[1]
         return b[1] - a[1]
        
        })
        return pagesArr

        //this f-n returns a number since we sort from highest to lowest
     }
        function printReport(pages){
            console.log("========================");
            const printedPages = sortPages(pages)

            //iterate over sorted pages
            for(const sortPgs of sortPages){
                //as each sorted page is an array - we get url

                const url = sortPages[0]; //page url
                const hits = sortPages[1]; //how may times it appaered
                console.log(`Found ${hits} links to page: ${url}`);
            }
        }

    module.exports = {
        sortPages, 
        printReport
    }