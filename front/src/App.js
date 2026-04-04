import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShoppingList from './pages/ShoppingList';
import ItemDetail from './pages/ItemDetail';
import CreateItem from './pages/CreateItem';

//main app defining routes to correct pages and components rendered
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<ShoppingList />} />
        <Route path="/list-item/:id" element={<ItemDetail />} />
        <Route path="/create" element={<CreateItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
