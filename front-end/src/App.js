import React, {useState} from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Recipes, { RECIPES_QUERY } from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import { ADD_RECIPE } from './components/AddRecipe';
import { DELETE_RECIPE } from './components/DeleteRecipe';
import Layout from './components/Layout';
import Search from './components/Search';


function App() {
  // Search 
  const [filter, setFilter] = useState('');

  
  // Recipes
  const { loading, error, data, refetch, networkStatus } = useQuery(RECIPES_QUERY, {
    variables: {filter},
    notifyOnNetworkStatusChange: true,
  });

  // Add Recipe
  const [addTitle, setTitle] = useState('');
  const [addIngredients, setIngredients] = useState('');
  const [addInstructions, setInstructions] = useState('');
  const [addRecipe] = useMutation(ADD_RECIPE);
  const [showAddForm, setShowAddForm] = useState(false);

  // Delete Recipe
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  const handleChange = (e) => {
    setFilter(e.target.value);
    refetch();
    console.log(data.recipes);
  }

  return (
    
    <div className="App">
      <Layout>
        <div className="row">
          <div className="col-6">
            <AddRecipe 
            addTitle={addTitle} 
            setTitle={setTitle} 
            addIngredients={addIngredients}
            setIngredients={setIngredients}
            addInstructions={addInstructions}
            setInstructions={setInstructions}
            addRecipe={addRecipe}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            filter={filter} />
          </div>
          <div className="col-6">
            <Search 
              filter={filter}
              setFilter={setFilter} 
              refetch={refetch}
              handleChange={handleChange} />
          </div>
        </div>
        
        
        <Recipes 
          deleteRecipe={deleteRecipe}
          filter={filter}
          setFilter={setFilter}
          loading={loading}
          error={error}
          data={data}
          refetch={refetch}
          networkStatus={networkStatus} />
      </Layout>
    </div>
  );
}

export default App;
