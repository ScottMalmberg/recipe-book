import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const RECIPES_QUERY = gql`
    {
        recipes {
            title
            ingredients
            instructions
        }
    }
`;

const ViewRecipes = () => {
    const { loading, error, data } = useQuery(RECIPES_QUERY);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error :(</p>;

    return data.recipes.map(({ title, ingredients, instructions }) => (
        <div className="recipe-card" style={{
          padding: `1.5rem`,
          marginBottom: `1rem`,
          backgroundColor: `#d3d3d347`,
          borderRadius: `5px`,
        }}>
            <h1>{title}</h1>
            <p><strong>Ingredients: </strong>{ingredients}</p>
            <p><strong>Instructions: </strong>{instructions}</p>
        </div>
    ))
}

export default ViewRecipes;