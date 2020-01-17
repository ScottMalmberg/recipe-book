import React from 'react';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    
    <div className="App">
      <Layout>
        <AddRecipe />
        <Recipes />
      </Layout>
    </div>
  );
}

export default App;
