# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous javascript web app that uses Web API and user data to dynamically update the UI. The app uses async fetch API in order to get the weather information for a specific zip code and then returns and saves the information to the local Express.js API endpoint. Finally, it updates the UI with the results.

## Structure
In the root of the directory we have a `server.js` Express local server.
Within the `website/` folder, we have the plain HTML, CSS and JavaScript files.

## Instructions
1. Please sign up for an account and acquire API credentials from OpenWeatherMap website.
2. Insert the API credentials under line 3 of `website/app.js` file.
3. In the root of the folder, install Express, Body-parser and Cors by running the following commands(Note: you need to have Node.js installed):
```javascript
npm i
```
4. Now, we can run the server by typing `node server.js`
5. You would see a success message saying: `Server is up and running on port 8888`. By default the application is run on port 8888 but you can adjust it on line 20 of `server.js`.
6. Finally, just go to `http://localhost:8888/` in our case. 
7. The app is up and running! Congrats.