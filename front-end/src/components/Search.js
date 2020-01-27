import React, { Fragment } from 'react';



const Search = (props) => {
  
    return (
        <Fragment>
            <input type="text" id="search" name="search" placeholder="What sounds good?" value={props.filter} onChange={props.handleChange} className="form-control mb-4" />
        </Fragment> 
    )
}

export default Search;