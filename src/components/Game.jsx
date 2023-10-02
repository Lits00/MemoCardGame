import { useEffect, useState } from "react";
import Header from "./header/Header";
import MainContainer from "./main/MainContainer";
import Footer from "./Footer";

export default function Game(){
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [pokedex, setPokedex] = useState([]);
    const [reset, setReset] = useState(false);
    const [gameState, setGameState] = useState({win: false, lose: false});
    const [isLoading, setIsLoading] = useState(false);

    const generateRandomNum = () => {
        const randomNumbers = [];
        while (randomNumbers.length < 10) {
            const randomNum = Math.floor(Math.random() * 721) + 1;
            if (!randomNumbers.includes(randomNum)) {
                randomNumbers.push(randomNum);
            }
        }
        return randomNumbers;
    }

    const requestPokemon = async (randomNumbers) => {
        // array of pokemon data promises
        const pokemons = randomNumbers.map(async (randomNum) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const { name, id, sprites } = await response.json();
                return { name, id, sprites }
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
                return null;
            }
        })

        return Promise.all(pokemons)
    }

    const gameWon = () => {
        setGameState( prevState => ({...prevState, win: true}))
    }

    const lostRound = () => {
        setGameState( prevState => ({...prevState, lose: true}))

    }

    const restartGame = () => {
        setGameState({win: false, lose: false})
        setScore(0)
        setPokedex([])
        setReset(prevReset => !prevReset)
    }

    function shuffleCards(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          // Generate a random index between 0 and i
          const j = Math.floor(Math.random() * (i + 1));
      
          // Swap elements at i and j
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    const handleClick = (id) => {
        const isClicked = pokedex.some((obj) => obj.id === id && obj.clicked)
        if(isClicked) return lostRound()
        setScore( prevScore => prevScore + 1)
        setPokedex( prevData => {
            return prevData.map( obj => (obj.id === id) ? { ...obj, clicked: true } : obj)
        })
        shuffleCards(pokedex)
    }

    // High Score setter
    useEffect(() => {
        setHighScore(prevHighScore => {
            return (score > prevHighScore) ? score : prevHighScore;
        })
        if(score === 10) gameWon()
    }, [score])

    // pokeapi request on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const randomNums = generateRandomNum();
                const pokemonData = await requestPokemon(randomNums);
                setPokedex(pokemonData);
                setIsLoading(false);
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [reset])

    return (
        <>
            <Header
                score={score}
                highScore={highScore}
            />
            <MainContainer 
                pokedex={pokedex}
                handleClick={handleClick}
                gameState={gameState}
                restartBtn={restartGame}
                isLoading={isLoading}
            />
            <Footer />
        </>
    )
}