import { useEffect, useState } from "react";
import { geoCodingRoute, tokenFirstParam } from "../Constants/Url";
import useMarkerContext from "../Context/useMarkerContext";

export default function useInput(id) {
  const { markers, removeMarker } = useMarkerContext();

  const [value, setValue] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  // When the corresponding marker has place, load is as default value
  useEffect(() => {
    const currentPoint = markers.find((m) => m.id === id);
    if (currentPoint.place !== null) {
      setValue(currentPoint.place);
    }
  }, [markers, id]);

  // Fetch for suggestions (autocomplete)
  useEffect(() => {
    if (value.length > 3) {
      fetch(geoCodingRoute + value + ".json" + tokenFirstParam)
        .then((res) => res.json())
        .then((data) => {
          setAutocompleteSuggestions(data.features);
        })
        .catch((err) => console.log(err));
    }
  }, [value]);

  return {
    setIsFocused,
    isFocused,
    removeMarker,
    value,
    setValue,
    autocompleteSuggestions,
    setAutocompleteSuggestions,
  };
}
