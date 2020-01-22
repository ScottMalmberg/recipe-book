import React from 'react';
import '../App.css';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';
import uuid from 'uuid';

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
        props.setNewRecipe({...props.newRecipe, ingredients: [...props.newRecipe.ingredients, {id: uuid.v4(), name: document.getElementById("ingredient").value}]});
        return document.getElementById("ingredient").value = '';
    }

    const addInstruction = (e) => {
        e.preventDefault();
        props.setNewRecipe({...props.newRecipe, instructions: [...props.newRecipe.instructions, {id: uuid.v4(), name: document.getElementById("instruction").value}]});
        return document.getElementById("instruction").value = '';
    }

    const removeIngredient = (id) => {
        props.setNewRecipe({...props.newRecipe, ingredients: [...props.newRecipe.ingredients.filter(i => i.id !== id)]});
    }

    const removeInstruction = (id) => {
        props.setNewRecipe({...props.newRecipe, instructions: [...props.newRecipe.instructions.filter(i => i.id !== id)]});
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
                    variables: { 
                        title: props.newRecipe.title, 
                        ingredients: props.newRecipe.ingredients.map(i => i.name).join(", "), 
                        instructions: props.newRecipe.instructions.map(i => i.name).join(". ") 
                    }, 
                    refetchQueries: [{ query: RECIPES_QUERY, variables: { filter: props.filter } }]
                });
                props.setNewRecipe({title: '', ingredients: [], instructions: []})
                props.setShowAddForm(false);
                }}>
                    <div className="form-group">
                        <label for="title">What's your recipe called?</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={props.newRecipe.title} 
                            onChange={e => props.setNewRecipe({...props.newRecipe, title: e.target.value})} 
                            className="form-control" />
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-10">
                                <label for="ingredient">What's in your recipe?</label>
                                <input 
                                    type="text" 
                                    name="ingredient" 
                                    id="ingredient"
                                    className="form-control" />
                            </div>
                            <div className="col-2 add-btn-container">
                                <button className="btn add-btn" onClick={addIngredient}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-10">
                                <label for="instruction">How do you make it?</label>
                                <input 
                                    type="textarea" 
                                    name="instruction" 
                                    id="instruction"
                                    className="form-control" />
                            </div>
                            <div className="col-2 add-btn-container">
                                <button className="btn add-btn" onClick={addInstruction}>+</button>
                            </div>
                        </div>
                    </div>                   
                    <button className="btn btn-primary" type="submit">Add Recipe</button>
                </form>
            </div>
            <div className="col-md-4">
                <p><strong>Title: </strong>{props.newRecipe.title}</p>
                <p><strong>Ingredients: </strong></p>
                <ul>
                    {props.newRecipe.ingredients !== undefined ? props.newRecipe.ingredients.map(i => 
                        <li>{i.name}<button className="btn btn-outline-danger remove-btn" onClick={e => removeIngredient(i.id)}>x</button></li>) : ''}
                </ul>
                <p><strong>Instructions: </strong></p>
                <ul>
                    {props.newRecipe.instructions !== undefined ? props.newRecipe.instructions.map(i =>  
                        <li>{i.name}<button className="btn btn-outline-danger remove-btn" onClick={e => removeInstruction(i.id)}>x</button></li>) : ''}
                </ul>
            </div>
        </div>
       
        
    )
}

export default AddRecipe;
export {ADD_RECIPE};