import React, { useState, useEffect } from "react";
import Card from "./Card"
import { v4 as uuidv4 } from 'uuid';
import StreamingCard from "./StreamingCard";
const API_KEY = '875ebf3e8605e8636054eb7af4e751ef';

function App(props) {

    const [APIData, setAPIData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Fetch data given the provided search query.
    useEffect(() => {
    const search = async () => {
        // Fetch the movie and TV show data.
        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);
        const showsResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);

        // Parse the JSON for movie and TV show search results.
        const movieData = await movieResponse.json();
        const validMovieData = movieData.results.filter((movie) => movie.id && movie['poster_path']);
    
        const showData = await showsResponse.json();
        const validShowData = showData.results.filter((show) => show.id && show['poster_path']);

        // Combine the search results and sort it by popularity.
        const searchResults = [...validMovieData, ...validShowData];
        const sortedSearchResults = searchResults.sort((a, b) => b.popularity - a.popularity);

        // Set the search results to the state.
        setAPIData(sortedSearchResults);
    }
    // Ensure the search query is valid with atleast 2 characters.
    if(searchQuery.length >= 2) search();

    }, [searchQuery])
    
    // Render the individual cards of movie data.
    const renderMovies = APIData.map((result) => {
        return (
            <div>
                <Card key={uuidv4()} id={result.id} posterPath={`https://image.tmdb.org/t/p/w500${result.poster_path}`} movieDetails={result}/>
                <StreamingCard key={uuidv4()} id={result.id} movieDetails={result}/>
            </div>
        );
    });

    return (
      <div>
        {/* <img src="../images/popcorn-logo.png" /> */}
        <h1>Find where to binge watch your next show.</h1>
        <input type="text" placeholder="Search here..." onChange={(e) => {setSearchQuery(e.target.value)}}/>
        <div className="moviesContainer">
            {renderMovies}
        </div>
      </div>
    );
};

export default App;