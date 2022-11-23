import React from "react";

function Card(props) {
    return (
      <div className="movieArtwork">
        <img id={props.id} src={props.posterPath} onClick={(e) => {console.log(e.target.id)}}/>
      </div>
    );
};

export default Card;