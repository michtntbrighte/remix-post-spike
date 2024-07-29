const CogoFormSubmit = () => {
  return (
    <div>
      <p>COGO view</p>
      <form
        action="http://localhost:5173/brighte-marketplace-form-submit"
        method="POST"
      >
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
