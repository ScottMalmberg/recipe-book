import React from 'react';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';

const DELETE_RECIPE = gql`
    mutation DeleteRecipe($id: String!) {
        deleteRecipe(id: $id)
    }
`;

const DeleteRecipe = (props) => {
   
    return (
        <button className="btn btn-outline-danger float-right mb-3" onClick={() => 
            {if (window.confirm("Are you sure you want to delete this recipe?")) props.deleteRecipe({ 
                variables: { id: props.id }, 
                refetchQueries: [{ query: RECIPES_QUERY }]
            })}
        }>
            Delete</button>
    );
}

export default DeleteRecipe;
export {DELETE_RECIPE};