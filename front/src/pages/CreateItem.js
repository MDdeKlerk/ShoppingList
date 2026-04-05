import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//port on which backend runs
const API = 'http://localhost:5000';


//gathers data from the user input and stores
export default function CreateItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

//function that runs when the user clicks submit
  const handleSubmit = async (e) => {
    e.preventDefault();

//sends the data that user entered to the backend
    await fetch(`${API}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

//returns user back to the ShoppingList page after adding an item
    navigate('/list');
  };
}