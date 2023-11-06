import React, { useEffect, useState } from 'react'
import Number from "./Number";

function Results({ winner, loser, winChange, loseChange, closeResults}) {
  return (
    <div className="results">
      <div className="result-content">
        <h2>Match Over!</h2>
        <h2>Match Winner: {winner.username}</h2>
        <div>
          <div className="inline">
            <p>{winner.username}: </p>
            <Number original={winner.rating-winChange} change={winChange} />
            <p>{winChange}</p>
          </div>
          <div className="inline">
            <p>{loser.username}: </p>
            <Number original={loser.rating-loseChange} change={loseChange} />
            <p>{loseChange}</p>
          </div>
        </div>
        <button onClick={closeResults}>Continue</button>
      </div>
    </div>
  )
}

export default Results