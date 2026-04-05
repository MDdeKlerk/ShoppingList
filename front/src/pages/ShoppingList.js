import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000';

//get items from backend
export default function ShoppingList() {
  const [items, showList] = useState([]);

   const getItems = async () => {
    const res = await fetch(`${API}/items`);
    const listData = await res.json();
    showList(listData);
  };

  //runs function to get items when page laods
  useEffect(() => {
    getItems();
  }, []);

  //function to change done status once checkbox is clicked and cross out item
  const changeDone = async (id, done) => {
    await fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    });

    getItems();
  };

  //function to delete a single item when button is clicked
  const deleteItem = async (id) => {
    await fetch(`${API}/items/${id}`, {
      method: 'DELETE'
    });

    getItems();
  };

  //function to clear the list by deleting all  items
  const clearList = async () => {
    await fetch(`${API}/items`, { method: 'DELETE' });

    getItems();
  };

//UI
return (
    <div>
      <h1>Shopping List</h1>

//button that links to the CreateItem page where an item can be added to the list
      <Link to="/create">
        <button>Add Item</button>
      </Link>

//button that calls the clearList functions to delete all items from the shopping list by clearing the array of items
      <button onClick={clearList}>Clear List</button>

      <hr />

//displaying the empty list message if no items are on the list
      {items.length === 0 ? (
        <p>There are no items on your shopping list.</p>
      ) 

//for each element on the array show the below     
      : (
        items.map(item => (
          <div key={item.id}>

//displaying the checkbox and changing the done status with the changeDone function if it is checked or unchecked      
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => changeDone(item.id, item.done)}
            />

//displayin the item title
            {item.title}

//button to view the item details which links to the ItemDetail page 
            <Link to={`/list-item/${item.id}`}>
              <button>View</button>
            </Link>

//button calling the deleteItem function to delete the respective element 
            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );

}


