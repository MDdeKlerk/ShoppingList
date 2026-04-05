# Description
A simple full stack shopping list app where items can be added, viewed, updated or deleted from the list.

# Tech
## Frontend
* React (functional components only) 
* react-router-dom (routing) 
* Fetch API (async/await) 
## Backend 
* Node.js  
* Express  
* CORS 

# Run the App
## Backend
* cd api 
* npm install 
* node index.js 
* Runs on: http://localhost:5000
## Frontend 
* cd front 
* npm install 
* npm start 
* Runs on: http://localhost:3000

# API Endpoints
* GET /items - Get all items 
* GET /items/ - Get single item 
* POST /items - Create item 
* PUT /items/ - Update item 
* DELETE /items/ - Delete item  
* DELETE /items - Clear all items 

# Routes
* /list - View list on ShoppingList page 
* /list-item/ - Item details on ItemDetail page 
* /create - Create item on CreateItem page 

# Notes
* The frontend fetches data from the backend using the Fetch API. 
* All data is stored in-memory on the backend. 
* After any create, update, or delete action, the frontend refreshes the data. 
* No database is used as data is stored in memory and resets when the server restarts. 
* Error handling is implemented using async/await with try-catch blocks. 
* CORS is enabled to allow communication between frontend and backend. 

# Improvements Needed
* Add persistent storage (database) 
* Add loading indicators (spinners) 
* UI/UX styling 
* Add form validation 





