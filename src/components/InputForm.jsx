const InputForm = ({
    referenceString,
    setReferenceString,
    frameCount,
    setFrameCount,
    handleSubmit
  }) => {
    return (
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label htmlFor="referenceString">Reference String (comma separated):</label>
          <input
            type="text"
            id="referenceString"
            value={referenceString}
            onChange={(e) => setReferenceString(e.target.value)}
            placeholder="e.g., 7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="frameCount">Number of Frames:</label>
          <input
            type="number"
            id="frameCount"
            min="1"
            max="10"
            value={frameCount}
            onChange={(e) => setFrameCount(parseInt(e.target.value))}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Simulate</button>
      </form>
    );
  };
  
  export default InputForm;