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
}


