import React, { useState, useEffect } from "react";

function Card(props) {

    return (
      <div>
        <img src={props.posterPath} alt="" />
      </div>
    );
};

export default Card;