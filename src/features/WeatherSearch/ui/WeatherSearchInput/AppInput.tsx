"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface props {
  handleSearchButton: (value: string) => void;
  lastSearch: string;
}

export default function WeatherSearchInput({
  handleSearchButton,
  lastSearch,
}: props) {
  const [input, setInput] = useState<string>(lastSearch ?? "");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setInput(lastSearch);
  }, [lastSearch]);

  function handleSearchStart() {
    if (!input) {
      setError(true);
      return;
    }
    handleSearchButton(input);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (error) {
      setError(false);
    }
    setInput(e.target.value);
  }

  return (
    <>
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${error ? "is-invalid" : "valid"}`}
          id="app-input"
          aria-describedby="basic-addon3 basic-addon4"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchStart();
          }}
          value={input}
        />
        <label htmlFor="app-input">City</label>
      </div>
      <button
        className="btn btn-outline-info"
        type="button"
        id="button-addon1"
        onClick={handleSearchStart}
      >
        Search
      </button>
    </>
  );
}
