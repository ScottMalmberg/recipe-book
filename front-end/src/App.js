import React from 'react';
import Recipes from './components/ViewRecipes';
import AddRecipe from './components/addRecipe';
import Layout from './components/Layout';







function App() {
  return (
    
    <div className="App">
      <Layout>
        <Recipes />
        <AddRecipe />
      </Layout>
    </div>
  );
}

export default App;
