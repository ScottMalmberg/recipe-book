import React from 'react'
import { gql } from 'apollo-boost';
import DeleteRecipe from './DeleteRecipe';
import UpdateRecipe from './EditRecipe';

const RECIPES_QUERY = gql`
    query Recipes($filter: String) {
        recipes(filter: $filter) {
            id
            createdAt
            title
            ingredients
            instructions
        }
    }
`;

const Recipes = (props) => {
    
    if(props.loading) return <p>Loading...</p>;
    if(props.error) return <p>Error :(</p>;

    return props.data.recipes.sort((a,b) => b.createdAt - a.createdAt).map(({ id, title, ingredients, instructions }) => (
        <div className="recipe-card mb-3 p-4" key={ id } style={{
          backgroundColor: `#d3d3d347`,
          borderRadius: `5px`,
        }}>
            <DeleteRecipe 
                id={ id } 
                deleteRecipe={props.deleteRecipe} />
            <UpdateRecipe 
                id={ id } 
                title={ title } 
                ingredients={ ingredients } 
                instructions={ instructions }
                filter={ props.filter }
                />
            <h1 className="mb-3">{title}</h1>
            <p><strong>Ingredients: </strong>
                <ul>
                    {ingredients.split(',').map(i => <li>{i}</li>)}
                </ul>
            </p>
            <p><strong>Instructions: </strong>
                <ul>
                    {instructions.replace(/\.\s*(?!.)/, "").split(/\..(?=.)/g).map(i => <li>{i}</li>)}
                </ul>
            </p>
        </div>
    ))
}

export { RECIPES_QUERY };
export default Recipes;
