const AlgorithmSelector = ({ algorithm, setAlgorithm }) => {
    return (
      <div className="algorithm-selector">
        <label>Select Page Replacement Algorithm:</label>
        <select 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="secondChance">Second Chance (Clock)</option>
          <option value="fifo" disabled>FIFO (Coming Soon)</option>
          <option value="lru" disabled>LRU (Coming Soon)</option>
          <option value="optimal" disabled>Optimal (Coming Soon)</option>
        </select>
      </div>
    );
  };
  
  export default AlgorithmSelector;