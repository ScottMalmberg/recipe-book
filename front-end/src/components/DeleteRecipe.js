import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';

const DELETE_RECIPE = gql`
    mutation DeleteRecipe($id: String!) {
        deleteRecipe(id: $id)
    }
`;

const DeleteRecipe = (id) => {
    const [deleteRecipe, { data }] = useMutation(DELETE_RECIPE);
    const recipeId = id.id;

    return (
        <button className="btn btn-outline-danger float-right" onClick={() => 
            {if (window.confirm("Are you sure you want to delete this recipe?")) deleteRecipe({ 
                variables: { id: recipeId }, 
                refetchQueries: [{ query: RECIPES_QUERY }]
            })}
        }>
            Delete</button>
        
    );
    
}

export default DeleteRecipe;