import React from "react";
import useInput from "../../Hooks/useInput";
import AutocompleteSuggestion from "./AutocompleteSuggestion";
import "./Input.css";
import RemoveMarkerButton from "./RemoveMarkerButton";

export default function Input({ id }) {
  const {
    setIsFocused,
    isFocused,
    removeMarker,
    value,
    setValue,
    autocompleteSuggestions,
    setAutocompleteSuggestions,
  } = useInput(id);

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
      <RemoveMarkerButton id={id} handleRemoveMarker={handleRemoveMarker} />
      {autocompleteSuggestions.length > 0 && isFocused ? (
        <div className='autocomplete-container'>
          {autocompleteSuggestions.map((place, i) => (
            <AutocompleteSuggestion
              key={i}
              pointId={id}
              place={place}
              setAutocompleteSuggestions={setAutocompleteSuggestions}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
