import React, { useState, useRef, useEffect, useCallback } from "react";
import GameGrid from "../BalloonGrid/BalloonGrid";
import CoverScreen from "../CoverScreen/CoverScreen";
import ScoreCard from "../ScoreCard/ScoreCard";
import { CSSTransition } from "react-transition-group";
import Constants from "../../utils/constants";
import Toast from "../Toast/Toast";
import Button from "../Button/Button";
import "./Game.css";
import { FetchUtils } from "../../utils/fetchUtils";

const Game = ({ numberOfBalloons, gameDuration }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeBalloons, setActiveBalloons] = useState([]);
  const [score, setScore] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [gameStopped, setGameStopped] = useState(false);
  const [hit, setHit] = useState(false);
  const [nameInValid, setNameInValid] = useState(false);
  const [playersData, setPlayersData] = useState([]);

  const [playerName, setPlayerName] = useState("");

  const timerRef = useRef(null);

  const handleChangeName = (name) => {
    setNameInValid(false);
    setPlayerName(name);
  };

  const handleBalloonClick = (id) => {
    setScore((prevScore) => prevScore + 1);
    setHit(true);
    setActiveBalloons((prevActiveBalloons) =>
      prevActiveBalloons.filter((activeId) => activeId !== id)
    );

    setTimeout(() => {
      setHit(false);
    }, Constants.randomnessLimits.lower);
  };

  const startGame = () => {
    if (!playerName) {
      setNameInValid(true);
      return;
    }
    if (playerName) {
      const regex = /^[a-zA-Z ]{2,30}$/;
      if (!regex.test(playerName)) {
        setNameInValid(true);
        return;
      }
    }
    setNameInValid(false);
    setGameStarted(true);
    setScore(0);
    setActiveBalloons([]);
    setTimeRemaining(gameDuration);
    setGameStopped(false);
  };

  const stopGame = () => {
    setGameStarted(false);
    setGameStopped(true);
    // const existingPlayerData = playersData.find(
    //   (x) => x?.playerName?.toLowerCase() === playerName.toLowerCase()
    // );
    // if (existingPlayerData) {
    //   FetchUtils.putRequest(`/games/${existingPlayerData.id}`, {
    //     playerName,
    //     score,
    //   }).then((x) => getAllPlayersData());
    //   return;
    // }
    // FetchUtils.postRequest("/games", { playerName, score }).then((x) =>
    //   getAllPlayersData()
    // );
  };

  const getAllPlayersData = () => {
    FetchUtils.getRequest("/games").then((x) => setPlayersData(x.data));
  };

  useEffect(() => {
    if (gameStopped) {
      const existingPlayerData = playersData.find(
        (x) => x?.playerName?.toLowerCase() === playerName.toLowerCase()
      );
      if (existingPlayerData) {
        FetchUtils.putRequest(`/games/${existingPlayerData.id}`, {
          playerName,
          score,
        }).then((x) => getAllPlayersData());
        return;
      }
      FetchUtils.postRequest("/games", { playerName, score }).then((x) =>
        getAllPlayersData()
      );
    }
  }, [gameStopped]);

  useEffect(() => {
    if (gameStarted && !gameStopped) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => {
          if (prevTimeRemaining > 0) {
            return prevTimeRemaining - 1;
          } else {
            clearInterval(timerRef.current);
            stopGame();
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [gameStarted, gameStopped]);

  useEffect(() => {
    getAllPlayersData();
  }, []);

  return (
    <div className="game-container">
      {(!gameStarted || gameStopped) && (
        <CoverScreen
          players={playersData}
          score={score}
          onStartGame={startGame}
          onPlayerName={handleChangeName}
          duration={Constants.gameDuration}
        />
      )}
      <CSSTransition
        in={gameStarted}
        timeout={250}
        classNames="balloons-screen"
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div className={`balloons-screen balloons-screen--${state}`}>
            <div className="game-nav">
              <h1 className="game-title">{`Name: ${playerName}`}</h1>
              <div className="game-settings">
                <ScoreCard score={score} time={timeRemaining} />
                <Button type={"alert"} onClick={stopGame}>
                  Stop
                </Button>
              </div>
            </div>
            <GameGrid
              numberOfBalloons={numberOfBalloons}
              activeBalloons={activeBalloons}
              onBalloonClick={handleBalloonClick}
            />
          </div>
        )}
      </CSSTransition>
      <Toast message={"+1 hits"} trigger={hit} />
      <Toast message={"Enter valid name"} trigger={nameInValid} />
    </div>
  );
};

export default Game;
