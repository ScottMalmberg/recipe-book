import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import { ADD_RECIPE } from './components/AddRecipe';
import { DELETE_RECIPE } from './components/DeleteRecipe';
import { UPDATE_RECIPE } from './components/EditRecipe';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';


// const [filter, setFilter] = useState('');

// if(filter !== '') {
//     recipeList.filter(a => a.title.toLowerCase().includes(filter));
// }

function App() {

  // Add Recipe
  const [addTitle, setTitle] = useState('');
  const [addIngredients, setIngredients] = useState('');
  const [addInstructions, setInstructions] = useState('');
  const [addRecipe] = useMutation(ADD_RECIPE);
  const [showAddForm, setShowAddForm] = useState(false);

  // Delete Recipe
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  

  return (
    
    <div className="App">
      <Layout>
        <AddRecipe 
          addTitle={addTitle} 
          setTitle={setTitle} 
          addIngredients={addIngredients}
          setIngredients={setIngredients}
          addInstructions={addInstructions}
          setInstructions={setInstructions}
          addRecipe={addRecipe}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm} />
        <Recipes deleteRecipe={deleteRecipe} />
      </Layout>
    </div>
  );
}

export default App;
