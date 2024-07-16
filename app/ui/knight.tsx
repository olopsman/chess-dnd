import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './board'

export default function Knight({}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.KNIGHT,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      })) 
  return (
    <div 
    ref={drag}
    className={`text-6xl isDragging ? 'opacity-50' : ''}`}>♘
    </div>
  )
}
