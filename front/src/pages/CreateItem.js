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
    try {
      const res = await fetch(`${API}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
      });

     if (!res.ok) throw new Error('Failed to create');

//returns user back to the ShoppingList page after adding an item
     navigate('/list');

      } catch (err) {
       console.error(err);
       alert('Error creating item');
      
      }

  };

  return (
    <div>
      <h1>Create Item</h1>


      <form onSubmit={handleSubmit}>

       
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <br />


        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <br />


        <button type="submit">Add</button>
      </form>
    </div>
  );
}