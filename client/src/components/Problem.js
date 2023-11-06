import React, { useState, useEffect } from 'react';
import Results from './Results';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Problem({ socket, setQueued }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState("");
  const [found, setFound] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState("");
  const [problem, setProblem] = useState({});
  const [you, setYou] = useState({});
  const [opponent, setOpponent] = useState({});
  const [winner, setWinner] = useState({});
  const [loser, setLoser] = useState({});
  const [winChange, setWinChange] = useState(0);
  const [loseChange, setLoseChange] = useState(0);

  const checkSolution = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      const e1 = arr1[i];
      const e2 = arr2[i];
      const t1 = e1.trim();
      const t2 = e2.trim();
      if (t1 !== t2) {
        return false;
      }
    }
    return true;
  }

  const handleWin = async () => {
    const win = you.username;
    const lose = opponent.username;
    const response = await axiosPrivate.put('/users',
    JSON.stringify({
      "win": win,
      "lose": lose
    }),
    {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    setWinChange(response?.data.winner);
    setLoseChange(response?.data.loser);
    return [response.data.winner, response.data.loser];
  }

  const submit = async (e) => {
    e.preventDefault();
    const answerData = problem.answer.trim().replace(/\r\n/g, "\n").split("\n");
    const submitData = answer.trim().replace(/\r\n/g, "\n").split("\n");
    if (checkSolution(answerData, submitData)) {
      toast.success("You got the answer correct!");
      setWinner(you);
      setLoser(opponent);
      const [win, lose] = await handleWin();
      console.log(`winner: ${JSON.stringify(you)}`);
      console.log(`winChange: ${win}`);
      console.log(`loseChange: ${lose}`);
      socket.emit("win", room, you, opponent, win, lose);
      setFinished(true);
    } else {
      toast.error("Incorrect answer, please try again.");
    }
    setAnswer("");
  };

  const closeResults = () => {
    socket.emit("remove-room", room);
  }

  useEffect(() => {
    socket.on("player-found", (room, players, random) => {

      const getProblem = async () => {
        try {
          const response = await axiosPrivate.get('/problems');
          setProblem(response.data[random % response.data.length])
        } catch (error) {
          console.error(error);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }

      const setPlayers = async () => {
        const y = await players.find((o) => o.id === socket.id);
        const op = await players.find((o) => o.id !== socket.id);
        setYou(y);
        setOpponent(op);
      }

      getProblem();
      setPlayers();
      setFound(true);
      setRoom(room);
    });

    socket.on("lost", (winner, loser, winChange, loseChange) => {
      setWinner(winner);
      setLoser(loser);
      setWinChange(winChange);
      setLoseChange(loseChange);
      setFinished(true);
    })

    socket.on("close", () => {
      setWinner("");
      setQueued(false);
    })
  }, [socket]);

  return (
    <div className="problem">
      {!found
        ? (<div> Waiting for player... </div >)
        : (<div>
          <div>
            <article>
              <h2>{problem.title}</h2>
              <p>Created by: {problem.author}</p>
              <div>
                <p>{problem.body}</p>
              </div>
              <h3>Input Specification</h3>
              <p>{problem.inputspec}</p>
              <h3>Output Specification</h3>
              <p>{problem.outputspec}</p>
              <h3>Sample Input</h3>
              <p className="box">{problem.sampleinput}</p>
              <h3>Sample Output</h3>
              <p className="box">{problem.sampleoutput}</p>
            </article>
          </div>
          <hr />
          <div>
            <h2>Submit:</h2>
            <button onClick={() => {
              navigator.clipboard.writeText(problem.input);
              toast.success('Input data copied to clipboard!');
            }}>Click to copy input</button>
            <form onSubmit={submit}>
              <label>Your Answer</label>
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
              <button>Submit</button>
            </form>
            {finished && <Results winner={winner} loser={loser} winChange={winChange} loseChange={loseChange} closeResults={closeResults} />}
          </div>
        </div>)}
    </div>
  )
}
export default Problem