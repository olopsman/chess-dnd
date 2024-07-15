import React from 'react'

export default function Square({black, children}: {black: string; children: React.ReactNode}) {
  return (
    <div className={`${black === 'black' ? "bg-black" : "bg-white"} ${black === 'black' ? "text-white" : "text-black"} border w-20 h-20`}>
      {children}
    </div>
  )
}
