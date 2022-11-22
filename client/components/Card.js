import React, { useState } from "react";
import StreamingCard from "./StreamingCard";
const API_KEY = '875ebf3e8605e8636054eb7af4e751ef';

function Card(props) {
    return (
      <div>
        <img id={props.id} src={props.posterPath} onClick={(e) => {console.log(e.target.id)}}/>
        <StreamingCard streamingData={props.movieDetails.streaming}/>
      </div>
    );
};

export default Card;