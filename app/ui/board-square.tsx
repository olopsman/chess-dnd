import React from 'react'
import Square from './square'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './board'
import { BoardProps } from './board'

export default function BoardSquare({x, y,  canMoveKnight, boardProps, children} : {x: number, y: number, canMoveKnight: (toX: number, toY: number) => boolean, boardProps: BoardProps, children: React.ReactNode}) {
    const black = (x + y) % 2 === 1 ? "black" : "white"
    const { knightPosition, setKnightPosition } = boardProps
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
          accept: ItemTypes.KNIGHT,
          canDrop: () => canMoveKnight(x, y),
          drop: () => setKnightPosition({knightX: x, knightY: y}),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
        }),
        [x, y]
      )
  return (
    <div ref={drop}>
        <Square black={black}>{children}</Square>
        {isOver && canDrop && <div className="absolute w-20  h-20 z-[1] bg-green-500 opacity-25"></div>}
        {!isOver && canDrop && <div className="absolute w-20  h-20 z-[1] bg-yellow-500 opacity-25"></div>}
        {!isOver && !canDrop && <div className="absolute w-20  h-20 z-[1] bg-red-500 opacity-25"></div>}
    </div>
  )
}
