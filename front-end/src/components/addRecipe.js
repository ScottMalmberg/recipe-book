import React, { Component } from 'react'

export class addRecipe extends Component {
    
    state = {
        title: "",
        ingredients: [],
        instructions: []
    }
    
    // handles change and sets state based on the name of the input being changed (e.g. "name")
    onChange = (e) => this.setState({[e.target.name]: e.target.value});    

    onSubmit = (e) => {
        // empty catch
        if(this.state.title === "") {
            e.preventDefault();
            return alert("You can't bring nothing to camp :) Try adding an item again!")
        }
        // stops it from submitting to the file
        e.preventDefault();
        // passes up the input
        this.props.addItem(this.state.name);
        // resets input field
        this.setState({name: ""});
    }
    
    render() {
        return (
            <form>
                <input 
                    type="text" 
                    name="title" 
                    value={this.state.title} 
                    onChange={this.onChange}
                    autoComplete="off"
                />              
            </form>
        )
    }
}

export default addRecipe
