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


//if statement added to fix error where react renders before data arrives 
if (!item) return <p>Loading...Please Wait...</p>;

return (
    <div>

 
      <h2>{item.title}</h2>
      <p>Description: {item.description}</p>
      <p>Created: {new Date(item.created).toLocaleString()}</p>
      <p>Status: {item.done ? 'Done' : 'Not Done'}</p>


      <button onClick={markDone}>Check off Item</button>

      
      <button onClick={deleteItem}>Delete Item</button>


      <button onClick={() => navigate('/list')}>View Shopping List</button>
    </div>
  );


}
