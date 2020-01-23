import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';

const UPDATE_RECIPE = gql`
    mutation UpdateRecipe($id: String! $title: String $ingredients: String $instructions: String) {
        updateRecipe(id: $id title: $title ingredients: $ingredients instructions: $instructions) {
            id
            title
            ingredients
            instructions
        }
    }
`;

const UpdateRecipe = (props) => {
    const [editRecipe] = useMutation(UPDATE_RECIPE);
    // const [currentTitle, updateTitle] = useState(props.title);
    // const [currentIngredients, updateIngredients] = useState(props.ingredients);
    // const [currentInstructions, updateInstructions] = useState(props.instructions);
    const [updateRecipe, setUpdateRecipe] = useState({title: props.title, ingredients: props.ingredients.split(', '), instructions: props.instructions.split('. ')});
    const [showEditForm, setShowEditForm] = useState(false);
    

    if(!showEditForm) {
        return(
            <button className="btn btn-outline-secondary float-right mr-2" onClick={ () => setShowEditForm(true)}>Edit</button>
        );
    }
    else return (
        <form className="mb-4" onSubmit={(e) => {
            e.preventDefault();
            editRecipe({ 
                variables: { 
                    id: props.id, 
                    title: updateRecipe.title, 
                    ingredients: updateRecipe.ingredients.map(i => i.name).join(", "), 
                    instructions: updateRecipe.instructions.map(i => i.name).join(". ")
                }, 
                refetchQueries: [{ query: RECIPES_QUERY, variables: { filter: props.filter } }]
            });
            setShowEditForm(false);
        }}>
            <div class="form-group">
                <label for="title">What's your recipe called?</label>
                <input type="text" name="title" value={updateRecipe.title} onChange={e => setUpdateRecipe({...updateRecipe, title: e.target.value})} className="form-control" />
            </div>

            <div class="form-group">
                <label for="ingredients">What's in your recipe?</label>
                {/* <input type="text" name="ingredients" onChange={e => updateIngredients(e.target.value)} className="form-control" /> */}
            </div>

            <div class="form-group">
                <label for="instructions">How do you make it?</label>
                {/* <input type="textarea" name="instructions" onChange={e => updateInstructions(e.target.value)} className="form-control" /> */}
            </div>
            
            <button className="btn btn-primary" type="submit">Update Recipe</button>
        </form>
        
    );

    
    
}

export default UpdateRecipe;