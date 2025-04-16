const AlgorithmSelector = ({ algorithm, setAlgorithm }) => {
  return (
    <div className="algorithm-selector">
      <label>Select Page Replacement Algorithm:</label>
      <select 
        value={algorithm} 
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="secondChance">Second Chance (Clock)</option>
        <option value="fifo">FIFO</option>
        <option value="lru">LRU</option>
        <option value="optimal">Optimal</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;