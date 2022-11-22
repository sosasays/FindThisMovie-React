import React, { useState, useEffect } from "react";

function StreamingCard(props) {
    
    // const renderStreamingProviders = (streamType) => {
    //     const streamingProviders = [];
    //     console.log(props.streamingData);
    //     if (props.streamingData !== 'Not available to stream, rent, or buy in the US.') {
    //         // Checking if available with a subscription in the US.
    //         if (props.streamingData[streamType]) {
    //             // Loop through subscription providers in the US.
    //             props.streamingData[streamType].forEach((provider) => {
    //                 const serviceProvider = provider['provider_name'];
    //                 streamingProviders.push(<li>{serviceProvider}</li>);
    //             });
    //         } else streamingProviders.push(<li>Not available in the US.</li>);
    //     }
    //     return streamingProviders;
    // }

    // const streamOn = renderStreamingProviders('flatrate');
    // const rentOn = renderStreamingProviders('rent');
    // const buyOn = renderStreamingProviders('buy');

    return (
      <div>
        <ul>
            Stream On:
            {/* {streamOn} */}
        </ul>
      </div>
    );
};

export default StreamingCard;