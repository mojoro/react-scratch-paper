import { useState } from "react";

export default function GreetingForm() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setGreeting(`Hello, ${name}!`);
    } else {
      setGreeting("Please enter your name!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>
        <button type="submit">Greet Me</button>
      </form>
      {greeting && <p>{greeting}</p>}
    </div>
  );
}
