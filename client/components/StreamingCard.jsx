import React, { useState, useEffect } from "react";
const API_KEY = '875ebf3e8605e8636054eb7af4e751ef';


function StreamingCard(props) {
    const [streaming, setStreamingData] = useState([]);
    useEffect(() => {
        const renderStreamingProviders = async () => {
            let streamingResponse;
            let streamingData;
            if ("first_air_date" in props.movieDetails) {
                streamingResponse = await fetch(`https://api.themoviedb.org/3/tv/${props.id}/watch/providers?api_key=${API_KEY}`);
                streamingData = await streamingResponse.json();
            } else {
                streamingResponse = await fetch(`https://api.themoviedb.org/3/movie/${props.id}/watch/providers?api_key=${API_KEY}`);
                streamingData = await streamingResponse.json();
            }
            const streamingProviders = [];
            // If is no streaming data for the given movie/TV show.
            if (Object.keys(streamingData).length === 0 || !streamingData.results.hasOwnProperty("US") || !streamingData.results.US.hasOwnProperty("flatrate")) {
                streamingProviders.push(<li>Not available to stream in the US.</li>);
            } else {
                streamingData.results.US.flatrate.forEach((company) => {
                   streamingProviders.push(<li>{company.provider_name}</li>);
                })
            }
        
            setStreamingData(streamingProviders);
        }
        renderStreamingProviders();
    }, [])

    const renderStreaming = streaming.map((result) => {
        console.log(props.movieDetails);
        return (
            <li>{result}</li>
        );
    });

    return (
      <div className="movieDetails">
        <hr/>
        <ul>
            <span className="subHeading">Title:</span>
            <li className="title">{props.movieDetails.name || props.movieDetails.title}</li>
        </ul>
        <hr/>
        <ul>
            <span className="subHeading">Overview:</span>
            <li className="overview">{props.movieDetails.overview || props.movieDetails.title}</li>
        </ul>
        <hr/>
        <ul>
            <span className="subHeading">Stream On:</span>
            {renderStreaming}
        </ul>
      </div>
    );
};

export default StreamingCard;