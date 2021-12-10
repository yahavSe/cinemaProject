import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MemberMovieAdd from "./MemberMovieAdd";

const MemberMovieComp = (props) => {
  const [MemberMovieAddShow, setMemberMovieAddShow] = useState("false");
  const [x,setx] = useState(props.subscriptionMovies[0].movies[0])
  const [y,sety] = useState()
  const [dateWatched2] = useState([props.subscriptionMovies[0].movies]);

  useEffect(() => {
    if (x.movieId !== undefined) {
      if(dateWatched2[0].length === undefined){
        let moviePre = dateWatched2.map((movie, index) => {
        var name = props.movies.filter((i) => i._id === movie.movieId);

        return (
          <ul key={index}>
            <li>
              <Link to={`/MainPage/${name[0].name}`}>{name[0].name}</Link> ,{" "}
              {movie.date}
            </li>
          </ul>
        );
      });
    sety(moviePre);
    }
    else{
      let moviePre = dateWatched2[0].map((movie, index) => {
        var name = props.movies.filter((i) => i._id === movie.movieId);
        return (
          <ul key={index}>
            <li>
              <Link to={`/MainPage/${name[0].name}`}>{name[0].name}</Link> ,{" "}
              {movie.date}
            </li>
          </ul>
        );
      });
      sety(moviePre)
    }
  }
    else{
      sety("")
    }
  },[dateWatched2,props.movies,x.movieId])

  const SubscribeMovie = () => {
    if (MemberMovieAddShow === "false") {
      setMemberMovieAddShow("true");
    } else {
      setMemberMovieAddShow("false");
    }
  };
  const callBackAdd = (data) => {

    if (dateWatched2[0].movieId === undefined ) {
      dateWatched2.pop(0);
      dateWatched2.push(data);

    } else {
      dateWatched2.push(data);
    }
    prsentMoviesWatched();
  };

  const prsentMoviesWatched = () => {
    if(dateWatched2[0].length === undefined){
    let moviePre = dateWatched2.map((movie, index) => {
      var name = props.movies.filter((i) => i._id === movie.movieId);
      setx(movie)

      return (
        <ul key={index}>
          <li>
            <Link to={`/MainPage/${name[0].name}`}>{name[0].name}</Link> ,{" "}
            {movie.date}
          </li>
        </ul>
      );
    });
    sety(moviePre)}
    else{
      let moviePre = dateWatched2[0].map((movie, index) => {
        var name = props.movies.filter((i) => i._id === movie.movieId);

        return (
          <ul key={index}>
            <li>
              <Link to={`/MainPage/${name[0].name}`}>{name[0].name}</Link> ,{" "}
              {movie.date}
            </li>
          </ul>
        );
      });
      sety(moviePre)}
  };

  return (
    <div>
      <h5>Movie's Watched</h5>

      <input
        type="button"
        value="Subscribe to a new movie"
        onClick={SubscribeMovie}
      />
      <br />
      <br />
      {MemberMovieAddShow === "true" ? (
        <MemberMovieAdd
          callBackAdd={(data) => callBackAdd(data)}
          member={props.member}
          movies={props.movies}
          sub={props.subscriptionMovies}
        />
      ) : (
        ""
      )}

      {x.movieId === undefined
        ? "No Movie's watched"
        :  y}
      <br />
      <br />
    </div>
  );
};

export default MemberMovieComp;
