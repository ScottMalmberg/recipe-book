import React from 'react';


const Search = (props) => {
    return (
        <form className="mb-4" onSubmit={(e) => {
            e.preventDefault();
          
           
         
            props.setFilter('');

        }}>
            <div class="form-group">
                <label for="search">What are you searching for?</label>
                <input type="text" name="search" value={props.filter} onChange={e => props.setFilter(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-primary" type="submit">Add Recipe</button>
        </form>
    )
}

export default Search;