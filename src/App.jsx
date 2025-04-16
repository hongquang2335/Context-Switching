import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';
import AlgorithmSelector from './components/AlgorithmSelector';
import Visualization from './components/Visualization';
import { simulateSecondChance } from './utils/pageReplacement';
import { simulateFIFO } from './utils/pageReplacement';
import { simulateLRU } from './utils/pageReplacement';
import { simulateOPT } from './utils/pageReplacement';
import './App.css';

function App() {
  const [referenceString, setReferenceString] = useState('7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1');
  const [frameCount, setFrameCount] = useState(3);
  const [results, setResults] = useState(null);
  const [algorithm, setAlgorithm] = useState('secondChance');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSimulating(true);
    
    try {
      const pages = referenceString.split(',').map(num => parseInt(num.trim(), 10));
      
      let simulationResult;
      switch (algorithm) {
        case 'fifo':
          simulationResult = simulateFIFO(pages, frameCount);
          break;
        case 'lru':
          simulationResult = simulateLRU(pages, frameCount);
          break;
        case 'optimal':
          simulationResult = simulateOPT(pages, frameCount);
          break;
        case 'secondChance':
        default:
          simulationResult = simulateSecondChance(pages, frameCount);
      }

      setResults({ 
        ...simulationResult, 
        pages,
        algorithm: algorithm.charAt(0).toUpperCase() + algorithm.slice(1)
      });
    } catch (error) {
      alert('Invalid input. Please check your reference string and try again.');
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
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
        isSimulating={isSimulating}
      />
      
      {results && (
        <>
          <div className="results-header">
            <h2>{results.algorithm} Algorithm Results</h2>
            <p className="fault-summary">
              Total Page Faults: <strong>{results.faults}</strong> | 
              Fault Rate: <strong>{Math.round((results.faults / results.pages.length) * 100)}%</strong>
            </p>
          </div>
          
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