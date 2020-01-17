import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
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

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [addRecipe, { data }] = useMutation(ADD_RECIPE);
    const [showForm, setShowForm] = useState(false);

    if(!showForm) {
        return(
            <button type="button" class="btn btn-outline-primary mb-4" onClick={ () => setShowForm(true)}>New Recipe</button>
        );
    }
    else return(
        <form className="mb-4" onSubmit={(e) => {
            e.preventDefault();
            addRecipe({ 
                variables: { title: title, ingredients: ingredients, instructions: instructions }, 
                refetchQueries: [{ query: RECIPES_QUERY }]
            });
            setTitle('');
            setIngredients('');
            setInstructions('');
            setShowForm(false);
        }}>
            <div class="form-group">
                <label for="title">What's your recipe called?</label>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} class="form-control" />
            </div>

            <div class="form-group">
                <label for="ingredients">What's in your recipe?</label>
                <input type="text" name="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} class="form-control" />
            </div>

            <div class="form-group">
                <label for="instructions">How do you make it?</label>
                <input type="textarea" name="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} class="form-control" />
            </div>
            
            <button className="btn btn-primary" type="submit">Add Recipe</button>
        </form>
    )

    // return (
    //     <div>
    //         {toggleForm ? (<button type="button" class="btn btn-outline-primary" onClick={setToggleForm(!toggleForm)}>New Recipe</button>) : <form className="mb-4" onSubmit={(e) => {
    //         e.preventDefault();
    //         addRecipe({ 
    //             variables: { title: title, ingredients: ingredients, instructions: instructions }, 
    //             refetchQueries: [{ query: RECIPES_QUERY }]
    //         });
    //         setTitle('');
    //         setIngredients('');
    //         setInstructions('');
    //     }}>
    //         <div class="form-group">
    //           <label for="title">What's your recipe called?</label>
    //           <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} class="form-control" />
    //         </div>

    //         <div class="form-group">
    //           <label for="ingredients">What's in your recipe?</label>
    //           <input type="text" name="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} class="form-control" />
    //         </div>

    //         <div class="form-group">
    //           <label for="instructions">How do you make it?</label>
    //           <input type="textarea" name="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} class="form-control" />
    //         </div>
            
    //         <button className="btn btn-primary" type="submit">Add Recipe</button>
    //     </form>}
            
    //     </div>
            
    // );
    
    
    
    
}

export default AddRecipe;