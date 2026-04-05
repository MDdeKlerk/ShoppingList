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

  return (
    <div>
      <h1>Create Item</h1>

//form that takes user input and calls the handleSubmit function when the submit button is cli
      <form onSubmit={handleSubmit}>

//input box for the item title        
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <br />

//text box for the description of the item from the user
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <br />

//submit button which calls the handleSubmit function when clicked
        <button type="submit">Add</button>
      </form>
    </div>
  );
}