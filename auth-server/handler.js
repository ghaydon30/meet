// Prevents some default js "sloppyenss"
'use strict';

// Import required google packages
const { google } = require("googleapis");
// NO IDEA WHY THIS LINE IS HERE
// const { resultingClientExists } = require('workbox-core/_private');
const calendar = google.calendar("v3");

/* Set access levels with scopes, this must be approved in the OAuth consent screen 
of Google console */
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

// process.env refers to config.json file
// This allows for the variables to be hidden as config.json is .gitignore
// Variables used for environment in serverless.yml file
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// URL parameter must match the redirect_uris in client_secret_<Your_ID>.json
const redirect_uris = [
  "https://ghaydon30.github.io/meet/"
];

// new instance of the google.auth.OAuth2 method is called and created
// OAuth2 allows for retrieval of the access token and retrying the request
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

/* OAuth2 client allows you to seamlessly retrieve an access token, 
refresh it, and retry the request */
module.exports.getAuthURL = async () => {
   // Scopes array is passed to the `scope` option. 
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  // return contains the statusCode, headers, and body
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /* 
      Exchange authorization code for access token with a "callback" after the exchange
      The callback in this case is an arrow function with the results as parameters:
      "error" and "response"
    */

    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
      .catch((error) => {
        // Handle error
        return {
          statusCode: 500,
          body: JSON.stringify(error),
        };
      });
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`)
  oAuth2Client.setCredentials({ access_token });
  
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then((results) => {
    // Respond with OAuth token
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(results.data.items),
    };
  })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
}