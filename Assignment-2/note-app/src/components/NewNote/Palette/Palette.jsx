import { useState } from "react";
import colors from "./colors"
import './Palette.css'

function Palette({ setColor }) {
  const handleSelection = (color) => {
    setColor(color);
  }
  return (
    <div className="palette">
      {
        colors.map(item => {
          return (
            <div key={item.id} className={"pick "+item.color}>
              <input type="radio" name="color" id={item.color} onClick={() => handleSelection(item.color)}/>
              <div className="ring"></div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Palette