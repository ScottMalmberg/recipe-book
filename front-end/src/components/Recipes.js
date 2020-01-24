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
    if(props.networkStatus === 4) return <p>Refetching...</p>;

    return props.data.recipes.sort((a,b) => a.title.localeCompare(b.title)).map(({ id, title, ingredients, instructions }) => (
        <div className="recipe-card mb-3 p-4" key={ id } style={{
          backgroundColor: `#d3d3d347`,
          borderRadius: `5px`,
        }}>
            <DeleteRecipe 
                id={ id } 
                deleteRecipe={props.deleteRecipe}
                filter={props.filter} />
            <UpdateRecipe 
                id={ id } 
                title={ title } 
                ingredients={ ingredients.split(', ') } 
                instructions={ instructions.split('. ') }
                filter={ props.filter }
                />
            <h1 className="mb-3">{title}</h1>
            <p><strong>Ingredients: </strong></p>
            <ul>
                {ingredients.split(',').map(i => <li>{i}</li>)}
            </ul>
            <p><strong>Instructions: </strong></p>
            <ul>
                {instructions.replace(/\.\s*(?!.)/, "").split(/\..(?=.)/g).map(i => <li>{i}</li>)}
            </ul>
        </div>
    ))
}

export { RECIPES_QUERY };
export default Recipes;
