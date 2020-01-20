import React, { Fragment } from 'react';


const Search = (props) => {
    return (
        <Fragment>
            <input type="text" name="search" placeholder="What sounds good?" value={props.filter} onChange={e => props.setFilter(e.target.value)} className="form-control" />
        </Fragment> 
    )
}

export default Search;