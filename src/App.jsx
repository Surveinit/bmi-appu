import { useState } from "react";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [bmi, setBmi] = useState("");
  const [category, setCategory] = useState("");

  function calculateBmi() {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setBmi(null);
      setCategory("Please enter valid numbers!");
      return;
    }

    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(2);

    setBmi(roundedBmi);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 24.9) {
      setCategory("Normal");
    } else if (bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  }

  function resetForm() {
    setHeight("");
    setWeight("");
    setBmi("");
    setCategory("");
  }

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

      <button onClick={calculateBmi}>Calculate 🙂‍↔️</button>
      <button onClick={resetForm}>Reset 🔄</button>

      {bmi && (
        <div>
          <h2>Your Bmi,</h2>
          <h3>
            {bmi} ({category})
          </h3>
        </div>
      )}
    </div>
  );
}
