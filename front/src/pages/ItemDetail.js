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


}
