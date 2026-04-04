const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


//initialise variables
let items = [];
let autoID = 1;

//GET /items (display shopping list)
app.get('/items', (req, res) => {
    const shoppingList = items.map(({id, title, done}) => ({
        id,
        title,
        done
    }));
    res.json(shoppingList);
});

//GET /items/:id (view an item including details)
app.get('/items/:id', (req,res) => {
    const itemDetail = items.find(i => i.id === Number(req.params.id));
    res,json(itemDetail);
});

//POST /items (Create a new item on the list)
