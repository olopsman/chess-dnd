import React from 'react'
import Knight from "./knight";
import Square from "./square";
import { Position } from "../page";

interface BoardProps {

    knightPosition: Position;
    setKnightPosition: React.Dispatch<React.SetStateAction<Position>>;
  }

export default function Board(props : BoardProps) {
    const squares = []
    //deconstructing the props
    const { knightPosition, setKnightPosition } = props


    function renderSquare(i: number, knightX: number, knightY: number) {
        const x = i % 8
        const y = Math.floor(i / 8)
        const isKnightHere = x === knightX && y === knightY
        const black = (x + y) % 2 === 1
        const piece = isKnightHere ? <Knight /> : null
    
        return (
        <div key={i} onClick={() => handdleSquareClick(x, y)}>
            <Square black={black ? "black" : "white"}>
                {piece}
            </Square>
            </div>
        );
    }


    function handdleSquareClick(toX: number, toY: number) {
        setKnightPosition({knightX: toX, knightY: toY})
    }

    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition.knightX, knightPosition.knightY))
    }


  return (
    <div className='flex flex-wrap'>
        {squares}
    </div>
  )
}