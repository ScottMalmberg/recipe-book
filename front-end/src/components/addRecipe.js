import React from 'react';
import '../App.css';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';
import RecipeBuilder from './RecipeBuilder';

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String! $ingredients: String! $instructions: String!) {
        addRecipe(title: $title ingredients: $ingredients instructions: $instructions) {
            id
            title
        }
    }
`;

const AddRecipe = (props) => {

    const submitRecipe = (e) => {
        e.preventDefault();
        props.addRecipe({ 
            variables: { 
                title: props.recipe.title, 
                ingredients: props.recipe.ingredients.map(i => i.name).join(", "), 
                instructions: props.recipe.instructions.map(i => i.name).join(". ") 
            }, 
            refetchQueries: [{ query: RECIPES_QUERY, variables: { filter: props.filter } }]
        });
        props.setRecipe({title: '', ingredients: [], instructions: []})
        props.setShowAddForm(false);
    }
    
    if(!props.showAddForm) {
        return(
            <button type="button" className="btn btn-outline-primary mb-4" onClick={ () => props.setShowAddForm(true)}>New Recipe</button>
        );
    }
    else return (
        <RecipeBuilder 
            recipe={props.recipe}
            setRecipe={props.setRecipe}
            handleSubmit={submitRecipe}
            buttonText="Add Recipe"
        />
    )
}

export default AddRecipe;
export {ADD_RECIPE};