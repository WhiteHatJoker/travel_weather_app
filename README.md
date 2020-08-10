# Weather Travel App Project

## Overview
An app allows the user to enter the city he is traveling to and travel date. Afterward, the app makes a request to GeoNames, WeatherBit and PixaBay APIs to return the information about the city, weather forecast and the city picture. The app is built using Node.js, Express, WebPack, HTML, CSS and JavaScript. 

## Instructions
1. Please sign up for an account with GeoNames, WeatherBit and PixaBay. Once signed up you would receive a username for GeoNames API and API keys for PixaBay & WeatherBit. Copy and paste them into corresponding files in `.env` file.
2. In the root of the folder, install Express, Body-parser and Cors by running the following commands(Note: you need to have Node.js installed):
```javascript
npm i
```
3. To open up the dev environment run `npm run build-dev`.
4. To open the production environment, first build the files using `npm build-prod` and it will produce a dist folder. Then run `npm start` and open `localhost:8081` in browser.
5. To run Jest tests, run `npm test`. Note that one of the test depends on the apps api so you need to make sure `npm start` was run before the test command.
6. The app is up and running! Congrats.

## Resources

[GeoNames API]

[WeatherBit API]

[PixaBay API]

[Webpack]

[Sass]

[Service workers]

[Express and Nodejs]

## Notes

API Keys are currently in the `.env` file. 