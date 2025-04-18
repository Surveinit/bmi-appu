import { useState } from "react";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div>
      <h1>BMI appu</h1>

      <div>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 170"
          />
        </label>
      </div>

      <div>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 72"
          />
        </label>
      </div>

      <button>Calculate 🙂‍↔️</button>
    </div>
  );
}
