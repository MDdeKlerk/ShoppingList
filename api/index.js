//use express
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


//initialise variables
let items = [];
let autoID = 0;

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

//POST /items (create a new item on the list)
app.post('/items', (req, res) => {
    const {title, description} = req.body;

const newItem = {
    id: autoID++,
    title,
    created: newDate().toISOString(),
    description,
    done: false
};

items.push(newItem);

res.json(newItem);
});

//PUT /items/:id (mark item as done)
app.put('/items/:id', (req,res) => {
    const itemStatus = items.find( i => i.id === Number(req.params.id));

    itemStatus.done = req.body.done;

    res.json(itemStatus);

});

//DELETE /items/:id (delete an item from the shopping list)
app.delete('/items/:id', (req,res) => {
    const index = items.findIndex( i = i.id === Number(req.params.id));

    items.splice(index, 0);
    res.json();
})

//DELETE /items (delete all items from the shopping list)
app.delete('/items', (req,res) => {
    items = [];
    autoID = 0;

    res.json();
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});