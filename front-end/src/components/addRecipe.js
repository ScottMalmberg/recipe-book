import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String! $ingredients: String! $instructions: String!) {
        addRecipe(title: $title ingredients: $ingredients instructions: $instructions) {
            id
            title
        }
    }
`;

const AddRecipe = () => {
    const [addRecipe, { data }] = useMutation(ADD_RECIPE);
      

    onSubmit = (e) => {
        e.preventDefault();
        addRecipe({ variables: { title: title.value, ingredients: ingredients.value, instructions: instructions.value } });
        title.value, ingredients.value, instructions.value = "";
    }

    return (
        <form onSubmit={onSubmit()}>
            <input name="title"></input>
            <input name="ingredients"></input>
            <input name="instructions"></input>
            <button type="submit">Add Recipe</button>
        </form>
    );
}

export default AddRecipe;