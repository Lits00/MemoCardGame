import HighScore from "./HighScore";
import Score from "./Score";

export default function Header({ score, highScore }) {

    return (
        <header> 
            <h1>Memory Card Game</h1>
            <div className="scoreboard">
                <Score 
                    score={score}
                />
                <HighScore 
                    highScore={highScore}
                />
            </div>
        </header>
    )
}