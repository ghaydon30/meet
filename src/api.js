// // src/api.js

// import mockData from './mock-data';

// /**
//  *
//  * @param {*} events:
//  * The following function should be in the “api.js” file.
//  * This function takes an events array, then uses map to create a new array with only locations.
//  * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
//  * The Set will remove all duplicates from the array.
//  */
// export const extractLocations = (events) => {
//   const extractedLocations = events.map((event) => event.location);
//   const locations = [...new Set(extractedLocations)];
//   return locations;
// };

// /**
//  *
//  * This function will fetch the list of all events
//  */
// export const getEvents = async () => {

//   if (window.location.href.startsWith("http://localhost")) {
//     return mockData;
//   }

//   const token = await getAccessToken();

//   if (token) {
//     removeQuery();
//     const url = "https://68blsyaa5i.execute-api.us-east-2.amazonaws.com/dev/api/get-events" + "/" + token;
//     const response = await fetch(url);
//     const result = await response.json();
//     if (result) {
//       return result.events;
//     } else return null;
//   }
// };


// export const getAccessToken = async () => {
//   const accessToken = localStorage.getItem('access_token');
//   const tokenCheck = accessToken && (await checkToken(accessToken));

//   if (!accessToken || tokenCheck.error) {
//     await localStorage.removeItem("access_token");
//     const searchParams = new URLSearchParams(window.location.search);
//     const code = await searchParams.get("code");
//     if (!code) {
//       const response = await fetch(
//         "https://68blsyaa5i.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
//       );
//       const result = await response.json();
//       const { authUrl } = result;
//       return (window.location.href = authUrl);
//     }
//     return code && getToken(code);
//   }
//   return accessToken;
// };

// const checkToken = async (accessToken) => {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
//   );
//   const result = await response.json();
//   return result;
// };

// const removeQuery = () => {
//   let newurl;
//   if (window.history.pushState && window.location.pathname) {
//     newurl =
//       window.location.protocol +
//       "//" +
//       window.location.host +
//       window.location.pathname;
//     window.history.pushState("", "", newurl);
//   } else {
//     newurl = window.location.protocol + "//" + window.location.host;
//     window.history.pushState("", "", newurl);
//   }
// };

// // getToken without try...catch

// // const getToken = async (code) => {
// //   const encodeCode = encodeURIComponent(code);
// //   const response = await fetch(
// //     'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode
// //   );
// //   const { access_token } = await response.json();
// //   access_token && localStorage.setItem("access_token", access_token);

// //   return access_token;
// // };

// // getToken with try...catch

// const getToken = async (code) => {
//   try {
//     const encodeCode = encodeURIComponent(code);

//     const response = await fetch('https://68blsyaa5i.execute-api.us-east-2.amazonaws.com/dev/api/token' + '/' + encodeCode);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     const { access_token } = await response.json();
//     access_token && localStorage.setItem("access_token", access_token);
//     return access_token;
//   } catch (error) {
//     error.json();
//   }
// }


// src/api.js

import mockData from './mock-data';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://68blsyaa5i.execute-api.us-east-2.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  if (!response.ok) {
    throw new Error(`Error fetching token: ${response.statusText}`);
  }

  const { access_token } = await response.json();
  access_token && localStorage.setItem('access_token', access_token);
  return access_token;
} catch (error) {
  console.error('Error getting token:', error);
  return null;
}
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  try {
    // Testing commented out this so that localhost uses api data
    // if (window.location.href.startsWith('http://localhost')) {
    //   return mockData;
    // }

    const token = await getAccessToken();
    // Testing token check
    console.log('Access Token: ', token);
    if (token) {
    removeQuery();
    const url =  'https://68blsyaa5i.execute-api.us-east-2.amazonaws.com/dev/api/get-events' + '/' + token;
    const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }

      const result = await response.json();
      // Testing console.log
      console.log('API Response:', result.events);
      // My Code
      // return result && result.events ? result.events : [];
      // Example Code
      return result.events;
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem('access_token');
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get('code');

      if (!code) {
      const response = await fetch(
        'https://68blsyaa5i.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url'
      );
      if (!response.ok) {
        throw new Error(`Error fetching auth URL: ${response.statusText}`);
      }

      const result = await response.json();
      const { authUrl } = result;
      if (!authUrl) {
        throw new Error('No authorization URL returned');
      }
      return (window.location.href = authUrl);
    }

    return code && getToken(code);
  }

  return accessToken;
} catch (error) {
  console.error('Error fetching access token:', error);
  return null;
}
};