import React from "react";
import AutocompleteSuggestion from "./AutocompleteSuggestion";

export default function AutocompleteSuggestions({
  autocompleteSuggestions,
  setAutocompleteSuggestions,
  isFocused,
  id,
}) {
  return (
    <>
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
    </>
  );
}
