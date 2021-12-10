import React, { useEffect, useState } from 'react';
import MovieComp from './MovieComp';
import utilsForUsers from './utilsForUsers';
import './MainPage.css'
import { useHistory } from 'react-router-dom';

const Movies = (props) => {
    const [moviesFromServer,setMoviesFromServer] = useState([])

    const [moviesListComp,setMoviesListComp] = useState([])
    const [moviesListShow,setMoviesListShow] = useState("false")

    const [moviesListSearchComp,setMoviesListSearchComp] = useState([])
    const [moviesListSearchCompShow,setMoviesListSearchCompShow] = useState("false")

    const [addMovieShow , setAddMovieShow ] = useState("false")

    const history = useHistory()

    useEffect(()=>{
        async function fetchMovies() {
            let moviesTemp = await utilsForUsers.getALLMovies()
            setMoviesFromServer(moviesTemp)
        }
        fetchMovies()
    },[])

    const getAllMovies = async () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "View Movies")
        setMoviesListSearchCompShow("false")
        if (tempCheackPre.length > 0) {

            if (moviesListShow === "false") {

                let mapMovies = moviesFromServer.map((movie,index) => {
                    return <MovieComp key={index} movie={movie}/>
                })
                setMoviesListComp(mapMovies)
                setMoviesListShow("true")
            }
            else{
                setMoviesListShow("false")
            }
        }
        else{
            alert("you dont have the right permission to view movies")
        }
    }

    const addMovie = () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "Create Movies")

        if (tempCheackPre.length > 0) {
            setMoviesListShow("false") 
            if (addMovieShow === "false") {
                setAddMovieShow("true")
                history.push({
                    pathname: `/MainPage/AddMovie`
                })
            }
            else{
                setAddMovieShow("false")
            }
        }
        else{
            alert("you dont have the right permission to create a new movie")
        }
    }

    const findMovie = (e) => {
        setMoviesListShow("false") 
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "View Movies")
        
        if (tempCheackPre.length > 0) {
            console.log("tempCheackPre.length ",tempCheackPre.length );
            console.log(moviesListShow);

            if (moviesListShow === "false"){
                let moviesForSearch = moviesFromServer.filter(movie => movie.name.includes(e))
                let movieTempSearch = moviesForSearch.map((movie,index) => {
                    return <MovieComp key={index} movie={movie}/>
                })
                setMoviesListSearchComp(movieTempSearch)
                setMoviesListSearchCompShow("true")
            }
            else{
                setMoviesListSearchCompShow("false")
            }
        }
        else {
            alert("you dont have the right permission to view movies")
        }  
      
    }

    return (
        <div>
            <h4>Movies</h4>
            <input type="button" value="All Movie's"  onClick={getAllMovies}/>
            <input type="button" value="Add Movie" onClick={addMovie}/><br/><br/>
            <h4 className={"findMovie"}>Find Movie</h4>: <input type="text" onChange={e => findMovie(e.target.value)}/><br/><br/>
            <div className={"tbl"}>
                {moviesListShow === "true" ? moviesListComp : "" }
                {moviesListSearchCompShow === "true" ? moviesListSearchComp : ""}
            </div>
        </div>
    );
};

export default Movies;