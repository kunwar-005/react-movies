import {useState,useEffect} from 'react'
import Search from '../components/search'
import Spinner from '../components/spinner'
import Moviecard from '../components/card-container'
import { useDebounce } from 'react-use'   
import { trendingmovies, updatecount } from '../appwrite'
import { useNavigate, useParams } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate()
  
const [search, setSearch] = useState("")
const [movielist,setmovielist]= useState([])
const [errormessage, seterrormessage ]= useState('')
const[isloading,setisloading]=useState(false)
const [debouncesearch, setDebouncesearch] = useState('')
const [Trendingmovies, setTrendingmovies ] = useState([])

const API_KEY = "2c7baa372ef850733e43db2e9e80a6ea";

const API_OPTIONS = {
method: 'GET',
headers: {
  accept: 'application/json',
}}



const fetchMovies = async (query='') => {
  setisloading(true)
  seterrormessage('')
  
  try { 
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(endpoint, API_OPTIONS)
    
    if(!response.ok){
      throw new Error(`error finding movie: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json()
    console.log('API Response:', data)
    console.log('Results array:', data.results)

    setmovielist(data.results || [])
    console.log('Movie list after setting:', data.results)

    if(query && data.results.length>0){
      await updatecount(query,data.results[0])
    }
    // if(query && data.results.length > 0) {
    //   await updateSearchCount(query, data.results[0]);
    // }
  }    
  catch (error) {
    console.error('Error fetching movies:', error)
    seterrormessage("failed fetching movies pls try again later ")
  }
  finally{
    setisloading(false)
  }

}

const loadtrending= async()=>{
  try {
    const movies=await trendingmovies()
    setTrendingmovies(movies)
    // console.log(movies)

  } catch (error) {
    console.log(error)
  }
}

useDebounce(()=>setDebouncesearch(search),500,[search])
 
useEffect(() => {
  loadtrending()
  // console.log("iam rendered again")
}, [])


useEffect(() => {
  fetchMovies(debouncesearch)
}, [debouncesearch])

const handleCardClick = (movie_id) => {
    navigate(`/video/${movie_id}`)
    
  }

  return (
    <>
     <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="" />
            <h1>figggdnd The <span className='text-gradient'>Movies </span> You'll Love</h1>
          <Search search={search} setSearch={setSearch} />
          </header>
          
          {Trendingmovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {Trendingmovies.map((movie, index) => (
                <li key={movie.$id} className=' cursor-pointer' onClick={() => handleCardClick(movie.movie_id)}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
          
          <section className="all-movies">
            <h2 className='mt-2'>All Movies </h2>

              {isloading ? (<Spinner />) :(
                errormessage ? (<p className='text-red-700'>{errormessage}</p>) : (
                  <ul className='text-amber-50'>
                    {
                      movielist.map((movies) =>(
                       <Moviecard key={movies.id} movies={movies}/>
                      ))
                    }
                  </ul>
                  )
                )
              }
          </section>

        </div>
      </div>
     </main>
    </>
  )
}

export default HomePage