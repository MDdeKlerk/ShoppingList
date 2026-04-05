import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//port on which backend runs
const API = 'http://localhost:5000';

//get item from backend
export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, showItem] = useState(null);

  const getItem = async () => {
    const res = await fetch(`${API}/items/${id}`);
    const data = await res.json();
    showItem(data);
  };

//runs function to show item detail when page loads
  useEffect(() => {
    getItem();
  }, [id]);


//function to mark item as done
  const markDone = async () => {
    await fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: true })
    });

    getItem();
  };

//function to delete item from the shopping list
  const deleteItem = async () => {
    await fetch(`${API}/items/${id}`, {
      method: 'DELETE'
    });

//returns to shopping list after deleting item
    navigate('/list');
  };

return (
    <div>

//displays the item description, date created and the status 
      <h2>{item.title}</h2>
      <p>Description: {item.description}</p>
      <p>Created: {new Date(item.created).toLocaleString()}</p>
      <p>Status: {item.done ? 'Done' : 'Not Done'}</p>

//button that calls the markDone function to change the item status to done when clicked
      <button onClick={markDone}>Check off Item</button>

//button that calls the deleteItem function when clicked to delete the displayed item from the shopping list      
      <button onClick={deleteItem}>Delete Item</button>

//button that navigates back to the ShoppingList page
      <button onClick={() => navigate('/list')}>View Shopping List</button>
    </div>
  );


}
