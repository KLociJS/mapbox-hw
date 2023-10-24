import React from "react";
import useMarkerContext from "../../Context/useMarkerContext";
import useInput from "../../Hooks/useInput";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import "./Input.css";
import RemoveMarkerButton from "./RemoveMarkerButton";

export default function Input({ id }) {
  const {
    setIsFocused,
    isFocused,
    value,
    setValue,
    autocompleteSuggestions,
    setAutocompleteSuggestions,
  } = useInput(id);
  const { removeMarker, activeMarkers } = useMarkerContext();

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleRemoveMarker = () => {
    removeMarker(id);
  };

  return (
    <div className='input-group'>
      <input
        type='text'
        className='point-input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder='Start typing a place...'
      />
      <RemoveMarkerButton
        activeMarkers={activeMarkers}
        handleRemoveMarker={handleRemoveMarker}
      />
      <AutocompleteSuggestions
        id={id}
        autocompleteSuggestions={autocompleteSuggestions}
        setAutocompleteSuggestions={setAutocompleteSuggestions}
        isFocused={isFocused}
      />
    </div>
  );
}
