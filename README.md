# Marvel Character App

## Overview

This application allows users to browse a list of characters in the main page, and then navigate into each character's page to see the comics details involving this particular character. The users are also capable of posting/deleting comments in the character detail page. Data for this app is from ```Marvel API```.
This is a single-page web application built using Node/Express as the backend, and Angular as the front end. MongoDB is used to persist the form data, and Redis is utilized to cache the most recently requested data by user from the Marvel API, as well as the comment data posted by users. Mocha and Chai are used for tests.

```
1. As a user, I can view a list of characters, and I can always press the ">" button to navigate to the next page of the list.
2. As a user, I can view the comics details of a particular character, other related characters in the same comics are listed.
3. As a user, I can switch between the "characters" and "details" views. When I switch back to the "characters" view, I should be on the same "characters" page as when I left.
4. As a user, I can leave a comment on the "details" page, and I can delete the comments.
```
## Prerequisites
```
NPM
Node.js
Express.js
Mongoose
Angular.js
MongoDB
Redis
```

## Setup Local Environment Variables

Create a developer account in the Marvel API web page, where you will get your '''PRIVATE_KEY''' and '''PUBLIC_KEY". Create a file with the name of '.env' in the root directory. And list the following local environment variables:
```
PRIVATE_KEY=YOUR-PRIVATE-KEY
PUBLIC_KEY=YOUR-PUBLIC-KEY
MONGODB_URI=YOUR-MONGODB-URI

```

## Start the App

`cd` to the project directory and run `npm start` in the terminal.

## Tests
```
Mocha
Chai
```
`cd` to the project directory and run `npm test` in the terminal.
