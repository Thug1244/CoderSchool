import React, { useState, useEffect } from "react";

import { TextField, Button, CircularProgress } from "@material-ui/core"; // Import Material-UI components

const OnlineCompiler = () => {
  const [inputValue, setInputValue] = useState(`print("Code School")`);
  const [response, setResponse] = useState();
  const [clearInput, setClearInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    const encodedParams = new URLSearchParams();
    encodedParams.append("LanguageChoice", "5");
    encodedParams.append("Program", inputValue);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "66e9770a7emsh877f75c7d416558p1591b9jsnabd36b57de3e",
        "X-RapidAPI-Host": "code-compiler.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://code-compiler.p.rapidapi.com/v2", options)
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setResponse(response.Result);
        setClearInput(true);
      })
      .catch((err) => console.error(err));
  };

  const handleClearInput = () => {
    setClearInput(false);
    setInputValue("");
  };

  useEffect(() => {
    if (clearInput) {
      handleClearInput();
    }
  }, [clearInput]);

  return (
    <div
      style={{
        boxShadow: " 0 16px 32px 0 rgb(244, 242, 242)",
        transition: "0.3s",
        width: "90%",
        height: "50%",
        margin: "auto",
        borderRadius: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Online Compiler</h2>

      <div>
        <div
          style={{
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            variant="outlined"
            label="Code Input"
            multiline
            style={{
              width: "50%",
              minHeight: "500px",
              backgroundColor: "white",
              alignSelf: "center",
              borderRadius: "15px",
            }}
          />
          <div className="compilerButtonMain">
            <Button
              onClick={handleButtonClick}
              style={{
                width: "100px",
                padding: "10px",
                backgroundColor: "#da4ea2",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
        <div className="CompilerRightSide">
          <h2 style={{ textAlign: "center" }}>Result</h2>
          <div style={{ alignItems: "center", textAlign: "center" }}>
            {isLoading ? (
              <CircularProgress size={48} />
            ) : (
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginLeft: "30%",
                  paddingBottom: "15px",
                }}
              >
                {response && (
                  <div
                    style={{
                      background: "white",
                      width: "60%",
                      minHeight: "100px",
                      borderRadius: "15px",
                    }}
                  >
                    <p>{response}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
