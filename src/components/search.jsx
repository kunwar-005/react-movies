import React from 'react'

const Search = ({search, setSearch}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt="" />
            <input type="text" placeholder='search through thousand of movies' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
      
    </div>
  )
}

export default Search
