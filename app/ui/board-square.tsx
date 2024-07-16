import React from 'react'
import Square from './square'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './board'
import { BoardProps } from './board'

export default function BoardSquare({x, y, boardProps, children} : {x: number, y: number, boardProps: BoardProps, children: React.ReactNode}) {
    const black = (x + y) % 2 === 1 ? "black" : "white"
    const { knightPosition, setKnightPosition } = boardProps
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.KNIGHT,
          drop: () => setKnightPosition({knightX: x, knightY: y}),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
        [x, y]
      )
  return (
    <div ref={drop}>
        <Square black={black}>{children}</Square>
    </div>
  )
}
