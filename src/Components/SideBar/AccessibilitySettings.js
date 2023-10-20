import React from "react";
import useRouteStyleContext from "../../Context/useRouteStyleContext";

export default function AccessibilitySettings() {
  const { color, setColor, lineWidth, setLineWidth } = useRouteStyleContext();
  return (
    <div className='accessibility-container'>
      <p className='accessibility-header'>Edit Route appearance</p>
      <div className='input-label-group'>
        <label className='input-label' htmlFor='color-picker'>
          Color
        </label>
        <input
          type='color'
          name='color-picker'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className='input-label-group'>
        <label className='input-label' htmlFor='route-line-width'>
          width
        </label>
        <input
          type='range'
          name='route-line-width'
          min={5}
          max={15}
          step={1}
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </div>
    </div>
  );
}
