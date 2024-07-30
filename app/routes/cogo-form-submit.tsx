import { useEffect } from 'react';

const CogoFormSubmit = () => {
  useEffect(() => {
    const handleFormSubmit = (event) => {
      event.preventDefault();

      const name = event.target.elements.name.value;
      const solarPanelKw = event.target.elements.solarPanelKw.value;

      const jsonData = JSON.stringify({ name, solarPanelKw });

      event.target.elements.data.value = jsonData;

      event.target.submit();
    };

    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    return () => {
      form.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <div>
      <p>COGO view React</p>
      <form
        action="http://localhost:5173/brighte-marketplace-form-submit"
        method="POST"
      >
        <input type="hidden" id="data" name="data" value="" />
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="solarPanelKw">Solar Panels (kW):</label>
          <input type="number" id="solarPanelKw" name="solarPanelKw" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CogoFormSubmit;
