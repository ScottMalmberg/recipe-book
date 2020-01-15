import React, { Component } from 'react'




export class addRecipe extends Component {
    
    state = {
        title: "",
        ingredients: "",
        instructions: ""
    }


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
    
    render() {
        

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    value={this.state.title} 
                    onChange={this.onChange}
                    autoComplete="off"
                />       
                <input 
                    type="text" 
                    name="ingredients" 
                    value={this.state.ingredients} 
                    onChange={this.onChange}
                    autoComplete="off"
                />       
                <input 
                    type="text" 
                    name="instructions" 
                    value={this.state.instructions} 
                    onChange={this.onChange}
                    autoComplete="off"
                />
                <input 
                    type="submit" 
                    value="Add" 
                    className="button"
                    id="add-button"                                    
                />              
            </form>
        )
    }
}

export default addRecipe
