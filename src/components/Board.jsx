import React, { useState, useEffect } from 'react'
import Square from './Square'

const Board = () => {

    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [checkBox, setCheckBox] = useState(false)
    const [choosePlayer, setChoosePlayer] = useState(true)


    const handlClick = (index) => {
        if (state[index] !== null) {
            return
        }
        else {
            if (isXTurn === 'X') {
                state[index] = isXTurn ? 'X' : 'O'
                setIsXTurn(!isXTurn)
                if (state.includes(null)) {
                    return setChoosePlayer(false)
                }
                else {
                    setCheckBox(!checkBox)
                }
            }
            else {
                setIsXTurn(!isXTurn)
                state[index] = isXTurn ? 'X' : 'O'
                setIsXTurn(!isXTurn)
                if (state.includes(null)) {
                    return setChoosePlayer(false)
                }
                else {
                    setCheckBox(!checkBox)
                }
            }
        }
    }

    const getValue = (e) => {
        if (e === "X") {
            setIsXTurn(true)
        }
        else {
            setIsXTurn(false)
        }
    }

    const checkWinner = () => {
        let winnerPoints = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < winnerPoints.length; i++) {
            const [a, b, c] = winnerPoints[i];
            if (state[a] && state[a] === state[b] && state[a] === state[c]) {
                return state[a];
            }
        }
        return false;
    }

    const playAgain = () => {
        setState(Array(9).fill(null))
        setCheckBox(false)
        setChoosePlayer(true)
    }

    const isWinner = checkWinner()

    // useEffect(() => {
    //     let turn = prompt('Pls Choss Your Player X or O // Default Player is X')
    //     let PlayerValue = turn.trim().toUpperCase()
    //     if (PlayerValue === 'O' || PlayerValue === 'X') {
    //         if (PlayerValue === "O") {
    //             setIsXTurn(false)
    //         }
    //         else {
    //             setIsXTurn(true)
    //         }
    //     }
    //     else if (PlayerValue == '') {
    //         alert("Pls choose Right player")
    //     }

    // }, [])

    return (
        <>
            <h1>Tic Tac Toe Game</h1>
            {choosePlayer ? <div className='select-player'>
                <h3>Select Your Player</h3>
                <select onClick={(e) => getValue(e.target.value)}>
                    <option value="X">X</option>
                    <option value="O">O</option>
                </select>
            </div> : <>{checkBox ? <></> : <>{isWinner ? <></> : <h3>Player <span>{isXTurn ? "X" : "O"}</span> Your Move</h3>}</>}</>}

            {isWinner ? <></> : checkBox ? <h2>Oops, no one won the game, let's start again <button onClick={playAgain}>Restart</button></h2> : <></>}
            {
                isWinner ? <><h3>{isWinner} is winner</h3> <button onClick={playAgain}>Play Again</button></> :
                    <>
                        <div className="game-board">
                            <div className="row">
                                <Square onClick={() => handlClick(0)} value={state[0]} />
                                <Square onClick={() => handlClick(1)} value={state[1]} />
                                <Square onClick={() => handlClick(2)} value={state[2]} />
                            </div>
                            <div className="row">
                                <Square onClick={() => handlClick(3)} value={state[3]} />
                                <Square onClick={() => handlClick(4)} value={state[4]} />
                                <Square onClick={() => handlClick(5)} value={state[5]} />
                            </div>
                            <div className="row">
                                <Square onClick={() => handlClick(6)} value={state[6]} />
                                <Square onClick={() => handlClick(7)} value={state[7]} />
                                <Square onClick={() => handlClick(8)} value={state[8]} />
                            </div>
                        </div>
                    </>
            }

        </>
    )
}

export default Board;