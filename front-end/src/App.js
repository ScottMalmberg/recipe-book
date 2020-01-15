import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Recipes from './components/ViewRecipes';







function App() {
  return (
    
    <div className="App">
      <Recipes />
    </div>
  );
}

export default App;
