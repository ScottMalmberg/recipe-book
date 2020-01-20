import React from 'react';

import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String! $ingredients: String! $instructions: String!) {
        addRecipe(title: $title ingredients: $ingredients instructions: $instructions) {
            id
            title
        }
    }
`;

const AddRecipe = (props) => {

    if(!props.showAddForm) {
        return(
            <button type="button" className="btn btn-outline-primary mb-4" onClick={ () => props.setShowAddForm(true)}>New Recipe</button>
        );
    }
    else return (
        <form className="mb-4" onSubmit={(e) => {
            e.preventDefault();
            props.addRecipe({ 
                variables: { title: props.addTitle, ingredients: props.addIngredients, instructions: props.addInstructions }, 
                refetchQueries: [{ query: RECIPES_QUERY, variables: { filter: props.filter } }]
            });
            props.setTitle('');
            props.setIngredients('');
            props.setInstructions('');
            props.setShowAddForm(false);
        }}>
            <div class="form-group">
                <label for="title">What's your recipe called?</label>
                <input type="text" name="title" value={props.addTitle} onChange={e => props.setTitle(e.target.value)} className="form-control" />
            </div>

            <div class="form-group">
                <label for="ingredients">What's in your recipe?</label>
                <input type="text" name="ingredients" value={props.addIngredients} onChange={e => props.setIngredients(e.target.value)} className="form-control" />
            </div>

            <div class="form-group">
                <label for="instructions">How do you make it?</label>
                <input type="textarea" name="instructions" value={props.addInstructions} onChange={e => props.setInstructions(e.target.value)} className="form-control" />
            </div>
            
            <button className="btn btn-primary" type="submit">Add Recipe</button>
        </form>
    )
}

export default AddRecipe;
export {ADD_RECIPE};