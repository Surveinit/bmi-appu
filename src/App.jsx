import { useState } from "react";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [bmi, setBmi] = useState("");
  const [category, setCategory] = useState("");

  const [gifUrl, setGifUrl] = useState("");

  async function fetchGif(keyword) {
    const GIPHY_API_KEY = "OG4jeshCvR7NMgLSNPAE0NikVISMNPfw";
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=1`,
    );
    const data = await response.json();
    const gif = data.data[0].images.original.url;

    console.log(gif);
    if (gif) {
      setGifUrl(gif);
    } else {
      setGifUrl("");
    }
  }

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
      fetchGif("Underweight");
    } else if (bmiValue < 24.9) {
      setCategory("Normal");
      fetchGif("Normal");
    } else if (bmiValue < 29.9) {
      setCategory("Overweight");
      fetchGif("Overweight");
    } else {
      setCategory("Obese");
      fetchGif("Obese");
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
      <div className="intro">
        <h1>BMI appu</h1>
        <p className="description">(Calculate your own BMI)</p>
      </div>

      <div className="section-container">
        <div className="input-form">
          <div className="height-input">
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

          <div className="weight-name">
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

          <div className="buttons">
            <button onClick={resetForm}>Reset 🔄</button>
            <button onClick={calculateBmi}>Calculate 🙂‍↔️</button>
          </div>
        </div>

        <div className="output">
          {bmi && (
            <div>
              <h2>Your Bmi,</h2>
              <h4>
                {bmi} ({category})
              </h4>
            </div>
          )}

          {gifUrl && (
            <div>
              <img
                src={gifUrl}
                alt="{category}"
                className="giphy-img"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
