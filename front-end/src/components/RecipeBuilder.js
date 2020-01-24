import React from 'react';
import uuid from 'uuid';

const RecipeBuilder = (props) => {
    
    const addIngredient = (e) => {
        e.preventDefault();
        props.setRecipe({...props.recipe, ingredients: [...props.recipe.ingredients, {id: uuid.v4(), name: document.getElementById("ingredient").value}]});
        return document.getElementById("ingredient").value = '';
    }

    const addInstruction = (e) => {
        e.preventDefault();
        props.setRecipe({...props.recipe, instructions: [...props.recipe.instructions, {id: uuid.v4(), name: document.getElementById("instruction").value}]});
        return document.getElementById("instruction").value = '';
    }

    const removeIngredient = (id) => {
        props.setRecipe({...props.recipe, ingredients: [...props.recipe.ingredients.filter(i => i.id !== id)]});
    }

    const removeInstruction = (id) => {
        props.setRecipe({...props.recipe, instructions: [...props.recipe.instructions.filter(i => i.id !== id)]});
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <form className="mb-4" onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <label for="title">What's your recipe called?</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={props.recipe.title} 
                            onChange={e => props.setRecipe({...props.recipe, title: e.target.value})} 
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
                    <button className="btn btn-primary" type="submit">{props.buttonText}</button>
                </form>
            </div>
            <div className="col-md-4">
                <p><strong>Title: </strong>{props.recipe.title}</p>
                <p><strong>Ingredients: </strong></p>
                <ul>
                    {props.recipe.ingredients !== undefined ? props.recipe.ingredients.map(i => 
                        <li className="mb-3">{i.name}<button className="btn btn-outline-danger remove-btn" onClick={e => removeIngredient(i.id)}>x</button></li>) : ''}
                </ul>
                <p><strong>Instructions: </strong></p>
                <ul>
                    {props.recipe.instructions !== undefined ? props.recipe.instructions.map(i =>  
                        <li className="mb-3">{i.name}<button className="btn btn-outline-danger remove-btn" onClick={e => removeInstruction(i.id)}>x</button></li>) : ''}
                </ul>
            </div>
        </div>
    );
}

export default RecipeBuilder;