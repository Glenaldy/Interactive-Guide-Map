# Interactive Travel Guide Map

<img src="public/logo-full.svg" alt="WaymarkJapan Logo" style="width:300px; background-color: white; padding: 15px;"/>

## Introduction

This project is live at [Waymark Japan](https://interactive-guide-map-587206baba62.herokuapp.com/).

The Waymark Japan Travel Guide and Map Application is a project designed to address the challenges faced by travelers
in accessing both descriptive and spatial information seamlessly during travel planning.

The application was created using React and Google Maps API.

## Features

- **Simultaneous Guide and Map Viewing**: Users can view both the travel guide article and interactive map on the same
  page, eliminating the need to switch between different tabs or pages.

- **Interactive Maps**: The application utilizes Google Maps API to provide users with interactive maps that can be
  zoomed, panned, and clicked on for more information.

- **Special Text Interaction**: The application enables users to interact directly with special text of place name
  within the guide article.

## Why This Project?

I created this project due to my personal problem of searching information for travel in Japan. I like to use travel
guide websites to gather information, but with the need to switch between Google Maps and the guide, I was inspired to
solve this problem myself.

Please note that the provided URLs might change in the future due to hosting or repository changes.

## Contact Information

For inquiries, please contact me at my [email](glenaldys@glen.work).

## Running the Application Locally

To run the appplication locally, you'll need to set up the backend
from [Server-For-Interactive-Guide-Map](https://github.com/Glenaldy/Server-For-Interactive-Guide-Map), get Google Maps
API key, and set up environment variables to configure the application properly.

1. Clone and setup the backend server
   from [Server-For-Interactive-Guide-Map](https://github.com/Glenaldy/Server-For-Interactive-Guide-Map)
2. Clone this repository to your local machine:
   ```sh
   git clone https://github.com/Glenaldy/Interactive-Guide-Map.git
   ```
3. Navigate to the project directory:
    ```sh
   cd interactive-travel-guide-map
   ```
4. Create a `.env` and set the following environment variables:
    ```
   REACT_APP_MAPS_API_KEY=your-google-maps-api-key
   REACT_APP_BACKEND_SERVER_URL=local-back-end-url
   REACT_APP_BACKEND_SERVER_API_KEY=your-setup-backend-password
   ```
5. Install the project dependencies:
    ```sh
   npm install
   ```
6. Build the application and run:
    ```she
    npm run build
    npm run start
    ```
