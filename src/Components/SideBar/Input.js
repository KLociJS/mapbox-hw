import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useInput from "../../Hooks/useInput";
import AutocompleteSuggestion from "./AutocompleteSuggestion";
import "./Input.css";

export default function Input({ id }) {
  const {
    setIsFocused,
    isFocused,
    removeMarker,
    indexRef,
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
    removeMarker(indexRef.current);
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
      />
      {id > 1 ? (
        <button onClick={handleRemoveMarker} className='icon-button'>
          <AiOutlineCloseCircle className='icon' />
        </button>
      ) : null}
      {autocompleteSuggestions.length > 0 && isFocused ? (
        <div className='autocomplete-container'>
          {autocompleteSuggestions.map((place, i) => (
            <AutocompleteSuggestion
              key={i}
              pointId={indexRef.current}
              place={place}
              setAutocompleteSuggestions={setAutocompleteSuggestions}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
