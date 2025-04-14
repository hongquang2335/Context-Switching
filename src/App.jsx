import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';
import AlgorithmSelector from './components/AlgorithmSelector';
import Visualization from './components/Visualization';
import { simulateSecondChance } from './utils/pageReplacement';
import './App.css';

function App() {
  const [referenceString, setReferenceString] = useState('');
  const [frameCount, setFrameCount] = useState(3);
  const [results, setResults] = useState(null);
  const [algorithm, setAlgorithm] = useState('secondChance');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu và tính toán kết quả
    const pages = referenceString.split(',').map(num => parseInt(num.trim()));
    const { frames, faults } = simulateSecondChance(pages, frameCount);
    setResults({ frames, faults, pages });
  };

  return (
    <div className="App">
      <h1>Page Replacement Algorithm Simulator</h1>
      
      <AlgorithmSelector 
        algorithm={algorithm} 
        setAlgorithm={setAlgorithm} 
      />
      
      <InputForm 
        referenceString={referenceString}
        setReferenceString={setReferenceString}
        frameCount={frameCount}
        setFrameCount={setFrameCount}
        handleSubmit={handleSubmit}
      />
      
      {results && (
        <>
          <ResultTable 
            pages={results.pages} 
            frames={results.frames} 
            faults={results.faults} 
          />
          <Visualization 
            pages={results.pages} 
            frames={results.frames} 
          />
        </>
      )}
    </div>
  );
}

export default App;