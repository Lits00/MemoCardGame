export default function Result({ gameState, restartBtn }) {
    return (
        <div className="result">
            <h3 style={(gameState.win) ? {color: "#00ff00"} : {color: "#ff0000"}}>
                { (gameState.win) ? "You Win!" : "You Lose" }
            </h3>
            <button onClick={restartBtn}>
                <span>{ (gameState.win) ? "Play again" : "Try again" }</span>
            </button>
        </div>
    )
}