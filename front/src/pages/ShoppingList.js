import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//port on which backend runs
const API = 'http://localhost:5000';

//get items from backend
export default function ShoppingList() {
  const [items, showList] = useState([]);

   const getItems = async () => {

    try {
      const res = await fetch(`${API}/items`);

      if (!res.ok) throw new Error('Failed to fetch shopping list');

      const listData = await res.json();
      showList(listData);
      
    } catch (error) {

      console.error(err);
      alert('Error loading shopping list!'); 
    }
    
  };

  //runs function to get items when page laods
  useEffect(() => {
    getItems();
  }, []);

  //function to change done status once checkbox is clicked 
  const changeDone = async (id, done) => {

    try {
      await fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    });

      if (!res.ok) throw new Error('Failed to mark item');

    getItems();
      
    } catch (error) {
      console.error(err);
      alert('Error marking item!'); 
    }
    
  };

  //function to delete a single item when button is clicked
  const deleteItem = async (id) => {

    try {
      await fetch(`${API}/items/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete item');

    getItems();
      
    } catch (error) {
      console.error(err);
      alert('Error deleting item!');  
    }
    
  };

  //function to clear the list by deleting all  items
  const clearList = async () => {
    try {
      await fetch(`${API}/items`, { 
      method: 'DELETE'
      });

       if (!res.ok) throw new Error('Failed to clear shopping list');
      
        getItems();

    } catch (error) {
       console.error(err);
       alert('Error clearing shopping list');   
    }
  };

//UI
return (
    <div>
      <h1>Shopping List</h1>


      <Link to="/create">
        <button>Add Item</button>
      </Link>


      <button onClick={clearList}>Clear List</button>

      <hr />


      {items.length === 0 ? (
        <p>There are no items on your shopping list.</p>
      ) 

    
      : (
        items.map(item => (
          <div key={item.id}>


            <input
              type="checkbox"
              checked={item.done}
              onChange={() => changeDone(item.id, item.done)}
            />


            {item.title}


            <Link to={`/list-item/${item.id}`}>
              <button>View</button>
            </Link>


            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );

}


