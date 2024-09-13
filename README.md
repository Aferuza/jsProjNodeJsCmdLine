# Web Crawler Project

## Project Overview

This project is a web crawler that can fetch data from a webpage, parse the content, and perform data extraction tasks such as finding links, finding/filtering specific information, and saving it to a local file or database.

The project is built with **JavaScript**, **Node.js** for the server-side functionality and **Jest** for unit testing.

Web crawlers (web spiders) browse the web and collect data from websites. 

Web crawlers perform the following:

1. Fetch the HTML: The crawler sends an HTTP request to the server and downloads the HTML of the page.
2. Parse the HTML: The HTML is parsed to extract links, text, metadata, and other content.
3. Follow Links: The crawler follows the links found in the HTML to discover more pages.

## Features

- Crawl web pages and extract HTML content
- Extract specific elements using CSS selectors
- Follow links and scrape multiple pages
- Save crawled data to a JSON file or database
- Automated unit and integration tests with Jest
- Configurable crawling depth and speed

The steps the Web Crawler takes are as follows:

• Step 1 - Crawling
Web Crawlers scan the internet for web pages. They follow the URL links from one page to another and store URLs in the URL store. The crawlers discover new content, including web pages, images, videos, and files.

• Step 2 - Indexing
Once a web page is crawled, the search engine parses the page and indexes the content found on the page in a database. The content is analyzed and categorized.
For example, keywords, site quality, content freshness, and many other factors are assessed to understand what the page is about.

• Step 3 - Ranking
Search engines use complex algorithms to determine the order of search results. These algorithms consider various factors, including keywords, pages' relevance, content quality, user engagement, page load speed, and many others. Some search engines also personalize results based on the user's past search history, location, device, and other personal factors.

• Step 4 - Querying
When a user performs a search, the search engine sifts through its index to provide the most relevant results.



