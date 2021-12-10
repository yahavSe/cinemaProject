import React, { useEffect, useState } from "react";
import utilsForUsers from "./utilsForUsers";

const MemberMovieAdd = (props) => {
  const [movieDrop, setMovieDrop] = useState();
  const [movieWatched, setMovieWatched] = useState(props.movies[0].name);
  const [temp, setTemp] = useState();
  const [dateWatched, setDateWatched] = useState();
  const [dateWatched2, setDateWatched2] = useState(props.sub[0].movies);

  useEffect(() => {
    let t = props.movies;
    let filterDropManue;
    if (dateWatched2[0].movieId === undefined) {
      filterDropManue = props.movies;
    } else {
      var filteredArray = t.filter(function (array_el) {
        return (
          dateWatched2.filter(function (anotherOne_el) {
            return anotherOne_el.movieId === array_el._id;
          }).length === 0
        );
      });
      filterDropManue = filteredArray;

      if (filteredArray.length === 0) {
        filterDropManue = [{ name: "no new movies to watch" }];
        setMovieWatched();
      } else {
        setMovieWatched(filterDropManue[0].name);
      }
    }

    let movieDropTemp = filterDropManue.map((movie, index) => {
      return <option key={index}>{movie.name}</option>;
    });
    setMovieDrop(movieDropTemp);
  }, [dateWatched2, movieWatched,props.movies]);

  const putMovie = async (e) => {
    e.preventDefault();

    let check = temp === undefined ? movieWatched : temp;
    let filterMovieId = props.movies.filter((movie) => movie.name === check);

    let tempIdMovie = filterMovieId[0]._id;
    let tempMemberId = props.member._id;

    if (!props.sub[0].movies[0].movieId) {
      let objToSub = {
        id: tempMemberId,
        memberId: props.member.id,
        movies: [
          {
            movieId: tempIdMovie,
            date: dateWatched,
          },
        ],
      };
      await utilsForUsers.updateSubscription(objToSub,props.sub[0]._id);

      dateWatched2.pop(0);
      dateWatched2.push(objToSub.movies[0]);

      let t = props.movies;
      let filterDropManue;
      var filteredArray = t.filter(function (array_el) {
        return (
          dateWatched2.filter(function (anotherOne_el) {
            return anotherOne_el.movieId === array_el._id;
          }).length === 0
        );
      });
      filterDropManue = filteredArray;

      if (filteredArray.length === 0) {
        filterDropManue = [{ name: "no new movies to watch" }];
        setMovieWatched();
      } else {
        setMovieWatched(filterDropManue[0].name);
      }

      let movieDropTemp = filterDropManue.map((movie, index) => {
        return <option key={index}>{movie.name}</option>;
      });
      setMovieDrop(movieDropTemp);

      props.callBackAdd(objToSub.movies[0]);

    } else {

      let objToSub = {
        id: tempMemberId,
        memberId: props.member.id,
        $push: {
          movies: [
            {
              movieId: tempIdMovie,
              date: dateWatched,
            },
          ],
        },
      };
      await utilsForUsers.updateSubscription(objToSub,props.sub[0]._id);
      let arr = dateWatched2;
      arr.push(objToSub.$push.movies[0]);
      setDateWatched2(arr);

      let t = props.movies;
      let filterDropManue;
      var filteredArray2 = t.filter(function (array_el) {
        return (
          dateWatched2.filter(function (anotherOne_el) {
            return anotherOne_el.movieId === array_el._id;
          }).length === 0
        );
      });
      filterDropManue = filteredArray2;

      if (filteredArray2.length === 0) {
        filterDropManue = [{ name: "no new movies to watch" }];
        setMovieWatched();
      } else {
        setMovieWatched(filterDropManue[0].name);
      }

      let movieDropTemp = filterDropManue.map((movie, index) => {
        return <option key={index}>{movie.name}</option>;
      });
      setMovieDrop(movieDropTemp);

      props.callBackAdd(objToSub.$push.movies[0]);
    }
    setTemp();
  };

  return (
    <div>
      <h6>Add Movie</h6>

      <form onSubmit={putMovie}>
        Movie's:{" "}
        <select onChange={(e) => setTemp(e.target.value)}>{movieDrop} </select>
        <br />
        Date watched:{" "}
        <input type="text" onChange={(e) => setDateWatched(e.target.value)} />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default MemberMovieAdd;
