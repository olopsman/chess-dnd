"use client";
import Board from "./ui/board";
import { useState } from "react";

export interface Position  {
  knightX: number;
  knightY: number;
}
export default function Home() {
  const [knightPosition, setKnightPosition] = useState<Position>({knightX: 0, knightY: 0});

  return (
    <div>
      <Board knightPosition={knightPosition} setKnightPosition={setKnightPosition}/>
    </div>
  );
}
