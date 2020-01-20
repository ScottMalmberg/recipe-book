import React, { Fragment } from 'react';



const Search = (props) => {

    
    return (
        <Fragment>
            <input type="text" name="search" placeholder="What sounds good?" value={props.filter} onChange={props.handleChange} className="form-control" />
        </Fragment> 
    )
}

export default Search;