import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Homepage = () => {
    const [movies, setMovies] = useState([])
    const [editRating, setEditRating] = useState({})
    const [newMovie, setNewMovie] = useState({
        movieTitle: "",
        movieImage: "",
        ratings: 3,
    })
    useEffect(()=>{
        axios.get("http://localhost:3000/movies-list")
        .then(res => {
            setMovies(res.data)
        })
    }, [])

    const startEdit = (index) => {
        setEditRating({
            index: index,
            rating: movies[index].ratings
        })
    }

    const ratingChangeHandler = (event) => {
        setEditRating({...editRating, rating: event.target.value})
    }

    const updateRating = () => {
        axios.put("http://localhost:3000/movies-list", editRating)
        .then(res => {
            alert("Updated successfully")
            setMovies(res.data)
            setEditRating({})
        })
        .catch(err => {
            alert("Something went wrong. Try again.")
        })
    }

    const addMovie = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3000/movies-list", newMovie)
        .then(res => {
            setMovies(res.data)
            setNewMovie({
                movieTitle: "",
                movieImage: "",
                ratings: 0,
            })
        })
        .catch(err => {
            alert(err.response.data.message)
        })
    }

    const changeHandler = (event) => {
        let tempNewMovie = {...newMovie}
        tempNewMovie[event.target.name] = event.target.value
        setNewMovie(tempNewMovie)
    }


  return (
    <div className='container'>
        <h1>Movies list</h1>
        <form onSubmit = {addMovie}>
            <input type = "text" placeholder='Movie Title' name = "movieTitle" style = {{fontSize: "20px" ,padding: "5px 15px", marginBottom: "5px"}} value = {newMovie.movieTitle} onChange={changeHandler}/><br />
            <input type = "text" placeholder='Movie Image' name = "movieImage" style = {{fontSize: "20px" ,padding: "5px 15px", marginBottom: "5px"}} value = {newMovie.movieImage} onChange={changeHandler}/><br />
            <input type = "number" placeholder='Movie Rating' name = "ratings" style = {{fontSize: "20px" ,padding: "5px 15px", marginBottom: "5px"}} value = {newMovie.ratings} onChange={changeHandler}/><br />
            <input type = "submit" value = "Add movie" className='btn-success' />
        </form>
        <div className='movies-list'>
            {movies.map((movie, index) => {
                return (
                    <div className='movie-container'>
                        <img src = {movie.movieImage} />
                        <h3>{movie.movieTitle}</h3>
                        <p>Rating : {movie.ratings}</p>
                        {editRating.index === index 
                            ?<div>
                                <input type = "number" name = "rating" className='card-input' value = {editRating.rating} onChange = {ratingChangeHandler} max="5"/>
                                <button className='btn-success' onClick = {updateRating}>Update</button>
                            </div>
                            :<button className='btn-warning' onClick={()=>startEdit(index)}>Edit rating</button>
                        }
                        
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Homepage