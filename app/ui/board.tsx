import React from 'react'
import Knight from "./knight";
import Square from "./square";
import BoardSquare from './board-square';
import { Position } from "../page";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
    KNIGHT: 'knight'
  }

export interface BoardProps {
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
    
        return (
        <div key={i} onClick={() => handdleSquareClick(x, y)}>
            <BoardSquare x={x} y={y} canMoveKnight={canMoveKnight} boardProps={props} >
                {renderPiece(x, y, knightX, knightY)}
            </BoardSquare>
            </div>
        );
    }

    function renderPiece(x: number, y: number, knightX: number, knightY: number) {
        if (x === knightX && y === knightY) {
          return <Knight />
        }
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
