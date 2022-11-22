import React, { useState, useEffect } from "react";
import Card from "./Card"
import { v4 as uuidv4 } from 'uuid';

function App(props) {

    const API_KEY = '875ebf3e8605e8636054eb7af4e751ef';
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
        const streamingMovieData = await validMovieData.forEach(async (movie) => {
            const streamingResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${API_KEY}`);
            const streamingData = await streamingResponse.json();
            if (!(streamingData.results.US)) movie.streaming = "Not available to stream, rent, or buy in the US."
            else movie.streaming = streamingData.results.US;
            return movie;
        })
    
        const showData = await showsResponse.json();
        const validShowData = showData.results.filter((show) => show.id && show['poster_path']);
        const streamingShowsData = await validShowData.map(async (show) => {
            const streamingResponse = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/watch/providers?api_key=${API_KEY}`);
            const streamingData = await streamingResponse.json();
            if (!(streamingData.results.US) || !('flatrate' in streamingData.results.US)) show.streaming = "Not available to stream in the US."
            else show.streaming = streamingData.results.US.flatrate;
            return show;
        })

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
            <Card key={uuidv4()} id={result.id} posterPath={`https://image.tmdb.org/t/p/w500${result.poster_path}`} movieDetails={result} />
        );
    });

    return (
      <div>
        <h1>Find where you can binge watch your next show.</h1>
        <input type="text" placeholder="Movie or TV Show" onChange={(e) => {setSearchQuery(e.target.value)}}/>
        {renderMovies}
      </div>
    );
};

export default App;