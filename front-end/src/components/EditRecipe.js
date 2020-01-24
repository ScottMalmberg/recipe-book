import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RECIPES_QUERY } from './Recipes';
import RecipeBuilder from './RecipeBuilder';
import uuid from 'uuid';

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
    let ingredientsList = [];
    props.ingredients.map(i => ingredientsList.push({id: uuid.v4(), name: i}));
    let instructionsList = [];
    props.instructions.map(i => instructionsList.push({id: uuid.v4(), name: i}));

    const [editRecipe] = useMutation(UPDATE_RECIPE);
    const [updateRecipe, setUpdateRecipe] = useState({title: props.title, ingredients: ingredientsList, instructions: instructionsList});
    const [showEditForm, setShowEditForm] = useState(false);

    const submitRecipeUpdate = (e) => {
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
    }
    
    if(!showEditForm) {
        return(
            <button className="btn btn-outline-secondary float-right mr-2" onClick={ () => setShowEditForm(true)}>Edit</button>
        );
    }
    else return (
        <RecipeBuilder 
            recipe={updateRecipe}
            setRecipe={setUpdateRecipe}
            handleSubmit={submitRecipeUpdate}
            buttonText="Update Recipe"
        />
        
    );

    
    
}

export default UpdateRecipe;