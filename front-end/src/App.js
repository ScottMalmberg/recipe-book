import React, {useState} from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Recipes, { RECIPES_QUERY } from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import { ADD_RECIPE } from './components/AddRecipe';
import { DELETE_RECIPE } from './components/DeleteRecipe';
import { UPDATE_RECIPE } from './components/EditRecipe';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';






function App() {
  // Recipes
  const { loading, error, data, refetch } = useQuery(RECIPES_QUERY);

  // Add Recipe
  const [addTitle, setTitle] = useState('');
  const [addIngredients, setIngredients] = useState('');
  const [addInstructions, setInstructions] = useState('');
  const [addRecipe] = useMutation(ADD_RECIPE);
  const [showAddForm, setShowAddForm] = useState(false);

  // Delete Recipe
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  // Search 
  const [filter, setFilter] = useState('');

  return (
    
    <div className="App">
      <Layout>
        <div className="row">
          <div className="col-3">
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
          </div>
          <div className="col-9">
            <Search 
              filter={filter}
              setFilter={setFilter} 
              refetch={refetch} />
          </div>
        </div>
        
        
        <Recipes 
          deleteRecipe={deleteRecipe}
          filter={filter}
          setFilter={setFilter}
          loading={loading}
          error={error}
          data={data}
          refetch={refetch} />
      </Layout>
    </div>
  );
}

export default App;
