import Loader from "../Loader";
import Card from "./Card";
import Result from "./Result";

export default function MainContainer({ pokedex, handleClick, gameState, restartBtn, isLoading }) {

    const display = () => {
        if(gameState.win) return <Result gameState={gameState} restartBtn={restartBtn} />
        if(gameState.lose) return <Result gameState={gameState} restartBtn={restartBtn} />
        return (isLoading) ? <Loader /> : pokedex.map( pokemon => {
            return (     
                <Card 
                    key={pokemon.id}
                    name={pokemon.name}
                    id={pokemon.id}
                    pic={pokemon.sprites.front_default}
                    handleClick={handleClick}
                />
            )
        })
    }

    return (
        <>
            <main className="cardContainer">
                {display()}
            </main>
        </>
    )
}