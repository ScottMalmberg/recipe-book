import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Recipes from './components/ViewRecipes';
import AddRecipe from './components/addRecipe';







function App() {
  return (
    
    <div className="App">
      <Recipes />
      <AddRecipe />>
    </div>
  );
}

export default App;
