import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './ViewRecipes';

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String! $ingredients: String! $instructions: String!) {
        addRecipe(title: $title ingredients: $ingredients instructions: $instructions) {
            id
            title
        }
    }
`;

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [addRecipe, { data }] = useMutation(ADD_RECIPE);
    

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addRecipe({ 
                variables: { title: title, ingredients: ingredients, instructions: instructions }, 
                refetchQueries: [{ query: RECIPES_QUERY }]
            });
            setTitle('');
            setIngredients('');
            setInstructions('');
        }}>
            <input 
                name="title" 
                placeholder="What's your recipe called?"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input 
                name="ingredients" 
                placeholder="What's in your recipe?"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
            />
            <input 
                name="instructions" 
                placeholder="How do you make it?"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
            />
            <button type="submit">Add Recipe</button>
        </form>
    );
}

export default AddRecipe;