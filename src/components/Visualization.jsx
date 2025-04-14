const Visualization = ({ pages, frames }) => {
    return (
      <div className="visualization">
        <h2>Visualization</h2>
        <div className="timeline">
          {pages.map((page, i) => (
            <div key={`step-${i}`} className="timeline-step">
              <div className="page-request">Page: {page}</div>
              <div className="frame-states">
                {frames[i].map((frame, j) => (
                  <div 
                    key={`frame-${i}-${j}`} 
                    className={`frame ${frame === page ? 'highlight' : ''}`}
                  >
                    {frame !== null ? frame : 'Empty'}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Visualization;