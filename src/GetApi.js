import "./GetApi.css";
import { useState } from "react";

function GetApi() {
  // This state stores what you input in the textfield at the top of the program
  const [apiUrl, setapiUrl] = useState("");

  // This state stores the response given from the API
  const [apiResponse, setApiResponse] = useState("");

  // This state stores the error message
  const [error, setError] = useState("");

  // This states stores whether the application is loading or not
  const [isLoading, setIsLoading] = useState(false);

  // Resets all states to empty strings
  function resetStates() {
    // setApiRequest("");
    setApiResponse("");
    setError("");
  }

  // fetches from the url given in the input
  async function fetchRequest() {
    try {
      resetStates();
      setIsLoading(true);

      //The main "get API" portion of the program, take a look if you'd like
      const res = await fetch(`${apiUrl}`);
      const data = await res.json();

      // feel free to modify this line or add another, all it's doing so far is converting the data
      // variable, which currently is a JSON object, to a string
      // you however, can access specific elements of the JSON by typing data.[insert element here]
      setApiResponse(JSON.stringify(data));
    } catch (err) {
      setError(`oopsie, an error occured :( - ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  // event handler for input field
  function onApiInputChange(e) {
    setapiUrl(e.target.value);
  }

  return (
    <div className="api-wrapper">
      <div className="main-input">
        <input
          type="text"
          placeholder="enter your url here (https://)"
          value={apiUrl}
          onChange={(e) => onApiInputChange(e)}
        />
        <button onClick={() => fetchRequest()}>Fetch!</button>
      </div>

      <div className="response-wrapper">
        <h2>Response:</h2>
        {/* the code below is a chain of if-else's, which basically asks:
        is it loading, is there a response, is there an error? */}
        <div className="response-text">
          {isLoading
            ? "Loading..."
            : apiResponse
            ? apiResponse
            : error
            ? error
            : "Nothing so far..."}
        </div>
      </div>
    </div>
  );
}

export default GetApi;
