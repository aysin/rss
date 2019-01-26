# Acast Test Case

Created a small API that uses Express.js in Node.js to expose an http endpoint that takes an rss url, parses it and returns a list of episodes from that rss feed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. You must have node installed
2. then install the packages as instructed on `Installing`
3. For the manual test please install Insomnia (i've added the insomnia file, you just need to import the file to Insomnia env)

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm install
```

npm start

```
npm test
```


### Endpoints
* Feeds endpoint is slower one due to MP3 files being installed due to checksum to be calculated. Hence, I'm returing only 5 of the obj from the rss feed.
```
/feeds 
```
returns -> json = [
  { title: 'Episode 1 - abc', checksum: 123, url: 'xyz' },
  { title: 'Episode 2 - abc', checksum: 234, url: 'qwe' }
]

* Fast Feed endpoint is a bit more performent even thou we are still doing checksum of the MP3 files. The performance has been improved due to not installing the whole MP3 file, but instead getting the checksum of the specified bytes.
```
/fast_feed
```
returns -> json = [
  { title: 'Episode 1 - abc', checksum: 123, url: 'xyz' },
  { title: 'Episode 2 - abc', checksum: 234, url: 'qwe' }
]


## Running the tests
The project has only 2 tests. Please run the following command:

```
npm test
```

### Break down into end to end tests

You can manually test the API. To achieve this, please import the Insomnia json file from the directory.
```
Give an example
```

## Hwo can this project be improved?

1. Pagination to handle the big rss feed
2. Writing more unit tests to see failure, array information etc.
3. Versioning of the API
4. Improvement on the directory structure (this is something i need to learn :) )
5. Define env such as dev, test, prod etc.



## Built With

* [Express.js](https://expressjs.com/en/starter/installing.html) - The Backend Framework
* [Node.js](https://nodejs.org/en/docs/) - Backend Language
* [Mocha](https://mochajs.org/) - Test Framework
* [Chai](https://www.chaijs.com/guide/) - Test Assertian Lib


## Authors

**Aysin Oruz**
