import React, { useEffect, useState } from 'react';
import MovieComp from './MovieComp';
import utilsForUsers from './utilsForUsers';
import { useHistory } from 'react-router-dom';


const MoviesFromLink = (props) => {
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
            let moviesForSearch = moviesFromServer.filter(movie => movie.name.includes(props.match.params.name))
            let movieTempSearch = moviesForSearch.map((movie,index) => {
                return <MovieComp key={index} movie={movie}/>
            })
            await setMoviesListSearchComp(movieTempSearch)
            await setMoviesListSearchCompShow("true")
            console.log(movieTempSearch);
        }
        fetchMovies()
        console.log(props.match.params);
        console.log("j");
    },[moviesListSearchCompShow,props.match.params,moviesFromServer])

    const getAllMovies = async () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "View Movies")
        setMoviesListSearchCompShow("false")
        if (tempCheackPre.length > 0) {

            if (moviesListShow === "false") {

                let mapMovies = moviesFromServer.map((movie,index) => {
                    console.log(movie);
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

    const findMovie = (e) => {
        setMoviesListShow("false") 
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        console.log("userForMain",userForMain);
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "View Movies")
        console.log("tempCheackPre",tempCheackPre);


        
        if (tempCheackPre.length > 0) {
            console.log("tempCheackPre.length ",tempCheackPre.length );
            console.log(moviesListShow);

            if (moviesListShow === "false"){
                console.log(moviesListShow);
                console.log(JSON.parse(localStorage.getItem('userForMain')));
                let moviesForSearch = moviesFromServer.filter(movie => movie.name.includes(e.target.value))
                let movieTempSearch = moviesForSearch.map((movie,index) => {
                    console.log("gd");
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
            Find Movie: <input type="text" onChange={e => findMovie(e)}/>
            {moviesListShow === "true" ? moviesListComp : "" }
            {moviesListSearchCompShow === "true" ? moviesListSearchComp : ""}
        </div>
    );
};

export default MoviesFromLink;