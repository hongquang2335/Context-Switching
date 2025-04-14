const ResultTable = ({ pages, frames, faults }) => {
    return (
      <div className="result-section">
        <h2>Simulation Results</h2>
        <p>Total Page Faults: <strong>{faults}</strong></p>
        
        <div className="table-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>Page</th>
                {frames[0].map((_, index) => (
                  <th key={`frame-${index}`}>Frame {index + 1}</th>
                ))}
                <th>Fault</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, i) => (
                <tr key={`row-${i}`}>
                  <td>{page}</td>
                  {frames[i].map((frame, j) => (
                    <td key={`cell-${i}-${j}`}>{frame !== null ? frame : '-'}</td>
                  ))}
                  <td>{frames[i].includes(page) ? '' : '✓'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ResultTable;