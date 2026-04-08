//use express
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


//initialise variables
let items = [];

const crypto = require("crypto")

//GET /items (display shopping list)
app.get('/items', (req, res) => {
    const shoppingList = items.map(({id, title, done}) => ({
        id,
        title,
        done
    }));

    res.status(200).json(shoppingList);
});

//GET /items/:id (view an item including details)
app.get('/items/:id', (req,res) => {
    const itemDetail = items.find(i => i.id === (req.params.id));

    if(!itemDetail){
        return res.status(404).json({Message : "Item not found"})
    }

    res.status(200).json(itemDetail);
});

//POST /items (create a new item on the list)
app.post('/items', (req, res) => {
    const {title, description} = req.body;

    if(!title|| !description){

        return res.status(400).json({ Message : "Title and Description required "})
    }
const newItem = {
    id: crypto.randomUUID(),
    title,
    created: new Date().toISOString(),
    description,
    done: false
};

items.push(newItem);

res.status(201).json(newItem);
});

//PUT /items/:id (mark item as done)
app.put('/items/:id', (req,res) => {
    const itemStatus = items.find( i => i.id === (req.params.id));

    itemStatus.done = req.body.done;

    res.status(200).json(itemStatus);

});

//DELETE /items/:id (delete an item from the shopping list)
app.delete('/items/:id', (req,res) => {
    const index = items.findIndex( i => i.id === (req.params.id));

    if(index === -1){
        return res.status(404).json({message : "Item not found"});
    }

    items.splice(index, 1);
    res.status(200).json();
})

//DELETE /items (delete all items from the shopping list)
app.delete('/items', (req,res) => {
    items = [];
    

    res.status(200).json();
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});