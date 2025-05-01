import { useState, useEffect } from "react";

export default function JokeFetcher() {
  const [joke, setJoke] = useState("Click the button to fetch a joke!");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.log(error);
      setJoke("Oops! Failed to fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <p>{loading ? "Loading..." : joke}</p>
      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Fetching..." : "Get Another Joke"}
      </button>
    </div>
  );
}
