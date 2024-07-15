import React from 'react'
import Knight from "./knight";
import Square from "./square";
import { Position } from "../page";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
    KNIGHT: 'knight'
  }

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

    //handle onclick and set the knight new position
    function handdleSquareClick(toX: number, toY: number) {
        if (canMoveKnight(toX, toY)) {
            setKnightPosition({knightX: toX, knightY: toY})
        }
    }
    // check if knight can move in that position
    function canMoveKnight(toX: number, toY: number) {
        const { knightX, knightY } = knightPosition
        const dx = toX - knightX
        const dy = toY - knightY
      
        return (
          (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
          (Math.abs(dx) === 1 && Math.abs(dy) === 2)
        )
      }

    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition.knightX, knightPosition.knightY))
    }


  return (
    <DndProvider backend={HTML5Backend}>
        <div className='flex flex-wrap'>
            {squares}
        </div>
    </DndProvider>
  )
}
