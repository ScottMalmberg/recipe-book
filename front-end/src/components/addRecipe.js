import React from 'react';
import '../App.css';
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

    const addIngredient = (e) => {
        e.preventDefault();
        props.setNewRecipe({...props.newRecipe, ingredients: [...props.newRecipe.ingredients, document.getElementById("ingredient").value]});
        return document.getElementById("ingredient").value = '';
    }

    const addInstruction = (e) => {
        e.preventDefault();
        props.setNewRecipe({...props.newRecipe, instructions: [...props.newRecipe.instructions, document.getElementById("instruction").value]});
        return document.getElementById("instruction").value = '';
    }
    
    if(!props.showAddForm) {
        return(
            <button type="button" className="btn btn-outline-primary mb-4" onClick={ () => props.setShowAddForm(true)}>New Recipe</button>
        );
    }
    else return (
        <div className="row">
            <div className="col-md-8">
                <form className="mb-4" onSubmit={(e) => {
                e.preventDefault();
                props.addRecipe({ 
                    variables: { title: props.newRecipe.title, ingredients: props.newRecipe.ingredients.join(", "), instructions: props.newRecipe.instructions.join(". ") }, 
                    refetchQueries: [{ query: RECIPES_QUERY, variables: { filter: props.filter } }]
                });
                // props.setTitle('');
                // props.setIngredients('');
                // props.setInstructions('');
                props.setNewRecipe({title: '', ingredients: [], instructions: []})
                props.setShowAddForm(false);
                }}>
                    <div class="form-group">
                        <label for="title">What's your recipe called?</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={props.newRecipe.title} 
                            onChange={e => props.setNewRecipe({...props.newRecipe, title: e.target.value})} 
                            className="form-control" />
                    </div>

                    <div class="form-group">
                        <label for="ingredient">What's in your recipe?</label>
                        <input 
                            type="text" 
                            name="ingredient" 
                            id="ingredient"
                            // value={props.newRecipe.ingredients} 
                            className="form-control" />
                        <button className="btn add-btn" onClick={addIngredient}>+</button>
                    </div>

                    <div class="form-group">
                        <label for="instruction">How do you make it?</label>
                        <input 
                            type="textarea" 
                            name="instruction" 
                            id="instruction"
                            // value={props.newRecipe.instructions} 
                            className="form-control" />
                        <button className="btn add-btn" onClick={addInstruction}>+</button>
                    </div>
                    
                    <button className="btn btn-primary" type="submit">Add Recipe</button>
                </form>
            </div>
            <div className="col-md-4">
                <p><strong>Title: </strong>{props.newRecipe.title}</p>
                <p><strong>Ingredients: </strong></p>
                <ul>
                    {props.newRecipe.ingredients !== undefined ? props.newRecipe.ingredients.map(i => <li>{i}</li>) : ''}
                </ul>
                <p><strong>Instructions: </strong></p>
                <ul>
                    {props.newRecipe.instructions !== undefined ? props.newRecipe.instructions.map(i => <li>{i}</li>) : ''}
                </ul>
            </div>
        </div>
       
        
    )
}

export default AddRecipe;
export {ADD_RECIPE};