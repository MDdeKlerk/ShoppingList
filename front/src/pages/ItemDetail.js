import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//port on which backend runs
const API = process.env.REACT_APP_API_URL;

//get item from backend
export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, showItem] = useState(null);

  const getItem = async () => {
  try {
      const res = await fetch(`${API}/items/${id}`);

      if (!res.ok) throw new Error('Item not found');

      const data = await res.json();
      showItem(data);

    } catch (err) {
       console.error(err);
       getItem(null);
    }
    
  };

//runs function to show item detail when page loads
  useEffect(() => {
    getItem();
  }, [id]);


//function to mark item as done
  const markDone = async () => {
    try {
      const res = await fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: true })
      });

    if (!res.ok) throw new Error('Failed to update');

      getItem();
      
      } catch (err) {
        console.error(err);
        alert('Error marking item as done!');     
      }
    
  };

//function to delete item from the shopping list
  const deleteItem = async () => {
    try {
     const res = await fetch(`${API}/items/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete');
      
      } catch (err) {
        console.error(err);
        alert('Error deleting item');
      }
    
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
