import React, { useEffect, useRef, useState } from "react";
import useMapContext from "../../Context/useMapContext";
import AutocompleteSuggestion from "./AutocompleteSuggestion";
import "./Input.css";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const APIURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const PARAMS = `?access_token=${TOKEN}`;

export default function Input({ id }) {
  const { markers, removeMarker } = useMapContext();
  const indexRef = useRef(id);

  const [value, setValue] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

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

  // When the corresponding Point has place, load is as default value
  useEffect(() => {
    const currentPoint = markers.find((m) => m.id === id);
    if (currentPoint.place !== null) {
      setValue(currentPoint.place);
    }
  }, [markers, id]);

  // Fetch for suggestions (autocomplete)
  useEffect(() => {
    if (value.length > 3) {
      fetch(APIURL + value + ".json" + PARAMS)
        .then((res) => res.json())
        .then((data) => {
          setAutocompleteSuggestions(data.features);
        })
        .catch((err) => console.log(err));
    }
  }, [value]);

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
      {id > 1 ? <button onClick={handleRemoveMarker}></button> : null}
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
