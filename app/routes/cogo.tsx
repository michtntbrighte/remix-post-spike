import React, { useState } from 'react';

/**
 * Ideally we don't care which UI the provider would be let it be mobile, web, etc
 * the only reason I'm putting it here is because I don't want to deal with CORS issue and this is
 * for testing purposes only, in this case it is plain React here. The main idea is the same, they do the POST request and redirect to our url
 * Note: i think it's not possible to redirect from our end hence the `window.open` handler after request
 * as redirect needs to be triggered via form feel free to prove me wrong
 */
const Cogo = () => {
  const [name, setName] = useState('');
  const [solarPanelKw, setSolarPanelKw] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { name, solarPanelKw };

    /** the important code */
    try {
      const response = await fetch(
        'http://localhost:5173/brighte-marketplace',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        window.open('http://localhost:5173/brighte-marketplace');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p>COGO view</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="solarPanelKw">Solar Panels (kW):</label>
          <input
            type="number"
            id="solarPanelKw"
            value={solarPanelKw}
            onChange={(e) => setSolarPanelKw(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Cogo;
