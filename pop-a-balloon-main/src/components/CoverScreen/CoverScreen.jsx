import Button from "../Button/Button";
import "./CoverScreen.css";

const CoverScreen = ({
  score,
  onStartGame,
  duration,
  onPlayerName,
  players,
}) => (
  <div className="intro">
    <h1 className="title">{score > -1 ? "Game over!" : "Pop-a-balloon! 🎈"}</h1>
    {score > -1 ? (
      <p className="description">
        {`You scored ${
          score === 0 ? "nothing" : `${score} ${score > 1 ? "hits" : "hit"}`
        }`}
      </p>
    ) : (
      <>
        <p className="description">
          A small &amp; simple {duration}-second balloon game built.
        </p>
        <div>
          <input
            type="text"
            className="player-name"
            placeholder="Enter Name"
            onChange={(e) => onPlayerName(e.target.value)}
          />
        </div>
      </>
    )}
    <div className="action">
      <Button onClick={onStartGame} width={"wide"}>
        {score > -1 ? "Play again" : "Start Game"}
      </Button>
    </div>
    {score > -1 && (
      <div className="ranking">
        <div id="header">
          <h1>Ranking</h1>
        </div>
        <div id="leaderboard">
          <div class="ribbon"></div>
          <table>
            {(players || [])
              .sort((a, b) => Number(b.score) - Number(a.score))
              .map((player, index) => (
                <tr key={player.id}>
                  <td class="number">{index + 1}</td>
                  <td class="name">{player.playerName}</td>
                  <td class="points">
                    {player.score}
                    {index == 0 && (
                      <img
                        class="gold-medal"
                        src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                        alt="gold medal"
                      />
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    )}
  </div>
);

export default CoverScreen;
