import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String! $ingredients: String! $instructions: String!) {
        addRecipe(title: $title ingredients: $ingredients instructions: $instructions) {
            id
            title
        }
    }
`;

const AddRecipe = () => {
    // handles change and sets state based on the name of the input being changed (e.g. "name")
    onChange = (e) => this.setState({[e.target.name]: e.target.value});    

    onSubmit = (e) => {
        
        const { title, ingredients, instructions } = this.state;
        // empty catch
        if(this.state.title === "") {
            e.preventDefault();
            return alert("You have to give your masterpiece a title! Try again.")
        }
        // stops it from submitting to the file
        e.preventDefault();
        // passes up the input
        this.props.addRecipe({ variables: { title: title, ingredients: ingredients, instructions  } })
        // resets input field
        this.setState({title: "", ingredients: "", instructions: ""});
    }
}

export default AddRecipe;