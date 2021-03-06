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
  const handleChange = (e) => {
    setFilter(e.target.value);
  }
  
  // Recipes
  const { loading, error, data, refetch, networkStatus } = useQuery(RECIPES_QUERY, {
    variables: {filter},
    notifyOnNetworkStatusChange: true,
  });

  // Add Recipe
  const [newRecipe, setNewRecipe] = useState({title: '', ingredients: [], instructions: []});
  const [addRecipe] = useMutation(ADD_RECIPE);
  const [showAddForm, setShowAddForm] = useState(false);

  // Delete Recipe
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
 

  return (
    
    <div className="App">
      <Layout>
      <AddRecipe 
        recipe={newRecipe}
        setRecipe={setNewRecipe}
        addRecipe={addRecipe}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        filter={filter} />  
        
      <Search 
        filter={filter}
        setFilter={setFilter} 
        refetch={refetch}
        handleChange={handleChange} />

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
