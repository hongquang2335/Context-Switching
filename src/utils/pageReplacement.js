export const simulateSecondChance = (pages, frameCount) => {
    const frames = Array(frameCount).fill(null);
    const referenceBits = Array(frameCount).fill(0);
    const framesHistory = [];
    let faults = 0;
    let pointer = 0; 
  
   framesHistory.push([...frames]);
  
    for (const page of pages) {
      const frameIndex = frames.indexOf(page);
      
      if (frameIndex !== -1) {
        referenceBits[frameIndex] = 1;
        framesHistory.push([...frames]);
        continue;
      }
  
      faults++;
      
      let replaced = false;
      while (!replaced) {
        if (referenceBits[pointer] === 0) {
          frames[pointer] = page;
          referenceBits[pointer] = 1;
          replaced = true;
        } else {
           referenceBits[pointer] = 0;
        }
        
        pointer = (pointer + 1) % frameCount;
      }
      
      framesHistory.push([...frames]);
    }
  
    return {
      frames: framesHistory.slice(0, -1),
      faults
    };
  };

export const simulateFIFO = (pages, frameCount) => {
  const frames = Array(frameCount).fill(null);
  const framesHistory = [];
  let faults = 0;
  let pointer = 0;
  framesHistory.push([...frames]);

  for (const page of pages) {
      if (frames.includes(page)) {
          framesHistory.push([...frames]);
          continue;
      }

      faults++;
      
      frames[pointer] = page;
      pointer = (pointer + 1) % frameCount;
      
      framesHistory.push([...frames]);
  }

  return {
      frames: framesHistory.slice(0, -1),
      faults
  };
};

export const simulateLRU = (pages, frameCount) => {
  const frames = Array(frameCount).fill(null);
  const framesHistory = [];
  const lastUsed = {};
  let faults = 0;
  let time = 0;

  framesHistory.push([...frames]);

  for (const page of pages) {
      time++;
      
      const frameIndex = frames.indexOf(page);
      if (frameIndex !== -1) {
          lastUsed[page] = time;
          framesHistory.push([...frames]);
          continue;
      }

      faults++;
      
      let lruPage = null;
      let minTime = Infinity;
      
      for (const framePage of frames) {
          if (framePage === null) {
              lruPage = null;
              break;
          }
          if (lastUsed[framePage] < minTime) {
              minTime = lastUsed[framePage];
              lruPage = framePage;
          }
      }

      const replaceIndex = lruPage ? frames.indexOf(lruPage) : frames.indexOf(null);
      frames[replaceIndex] = page;
      lastUsed[page] = time;
      
      framesHistory.push([...frames]);
  }

  return {
      frames: framesHistory.slice(0, -1),
      faults
  };
};

export const simulateOPT = (pages, frameCount) => {
  const frames = Array(frameCount).fill(null);
  const framesHistory = [];
  let faults = 0;

  framesHistory.push([...frames]);

  for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      if (frames.includes(page)) {
          framesHistory.push([...frames]);
          continue;
      }

      faults++;
      
      let replaceIndex = frames.indexOf(null); 
      if (replaceIndex === -1) {
          let farthest = -1;
          for (let j = 0; j < frames.length; j++) {
              const currentPage = frames[j];
              let nextUse = Infinity;
              
              for (let k = i + 1; k < pages.length; k++) {
                  if (pages[k] === currentPage) {
                      nextUse = k;
                      break;
                  }
              }
              
              if (nextUse === Infinity) {
                  replaceIndex = j;
                  break;
              }
              
              if (nextUse > farthest) {
                  farthest = nextUse;
                  replaceIndex = j;
              }
          }
      }

      frames[replaceIndex] = page;
      framesHistory.push([...frames]);
  }

  return {
      frames: framesHistory.slice(0, -1),
      faults
  };
};

// Thêm vào file pageReplacement.js

export const simulateLFU = (pages, frameCount) => {
    const frames = Array(frameCount).fill(null);
    const framesHistory = [];
    const frequency = {}; // Lưu tần suất sử dụng của từng trang
    let faults = 0;

    framesHistory.push([...frames]);

    for (const page of pages) {
        const frameIndex = frames.indexOf(page);
        
        if (frameIndex !== -1) {
            // Tăng tần suất nếu trang đã tồn tại trong frame
            frequency[page] = (frequency[page] || 0) + 1;
            framesHistory.push([...frames]);
            continue;
        }

        faults++;
        
        let replaceIndex = frames.indexOf(null);
        if (replaceIndex === -1) {
            // Tìm trang có tần suất sử dụng thấp nhất
            let minFrequency = Infinity;
            let candidates = [];
            
            for (let i = 0; i < frames.length; i++) {
                const framePage = frames[i];
                if (frequency[framePage] < minFrequency) {
                    minFrequency = frequency[framePage];
                    candidates = [i];
                } else if (frequency[framePage] === minFrequency) {
                    candidates.push(i);
                }
            }
            
            // Nếu có nhiều trang cùng tần suất thấp nhất, chọn trang đầu tiên (FIFO)
            replaceIndex = candidates[0];
        }

        // Thêm trang mới và cập nhật tần suất
        frames[replaceIndex] = page;
        frequency[page] = 1;
        
        framesHistory.push([...frames]);
    }

    return {
        frames: framesHistory.slice(0, -1),
        faults
    };
};

export const simulateMRU = (pages, frameCount) => {
    const frames = Array(frameCount).fill(null);
    const framesHistory = [];
    const lastUsed = {}; // Lưu thời điểm sử dụng gần nhất
    let faults = 0;
    let time = 0;

    framesHistory.push([...frames]);

    for (const page of pages) {
        time++;
        
        const frameIndex = frames.indexOf(page);
        if (frameIndex !== -1) {
            lastUsed[page] = time;
            framesHistory.push([...frames]);
            continue;
        }

        faults++;
        
        let replaceIndex = frames.indexOf(null);
        if (replaceIndex === -1) {
            // Tìm trang được sử dụng gần nhất
            let mruTime = -1;
            for (let i = 0; i < frames.length; i++) {
                const framePage = frames[i];
                if (lastUsed[framePage] > mruTime) {
                    mruTime = lastUsed[framePage];
                    replaceIndex = i;
                }
            }
        }

        frames[replaceIndex] = page;
        lastUsed[page] = time;
        
        framesHistory.push([...frames]);
    }

    return {
        frames: framesHistory.slice(0, -1),
        faults
    };
};

export const simulateMFU = (pages, frameCount) => {
    const frames = Array(frameCount).fill(null);
    const framesHistory = [];
    const frequency = {}; // Lưu tần suất sử dụng của từng trang
    let faults = 0;

    framesHistory.push([...frames]);

    for (const page of pages) {
        const frameIndex = frames.indexOf(page);
        
        if (frameIndex !== -1) {
            // Tăng tần suất nếu trang đã tồn tại trong frame
            frequency[page] = (frequency[page] || 0) + 1;
            framesHistory.push([...frames]);
            continue;
        }

        faults++;
        
        let replaceIndex = frames.indexOf(null);
        if (replaceIndex === -1) {
            // Tìm trang có tần suất sử dụng cao nhất
            let maxFrequency = -1;
            let candidates = [];
            
            for (let i = 0; i < frames.length; i++) {
                const framePage = frames[i];
                if (frequency[framePage] > maxFrequency) {
                    maxFrequency = frequency[framePage];
                    candidates = [i];
                } else if (frequency[framePage] === maxFrequency) {
                    candidates.push(i);
                }
            }
            
            // Nếu có nhiều trang cùng tần suất cao nhất, chọn trang đầu tiên (FIFO)
            replaceIndex = candidates[0];
        }

        // Thêm trang mới và cập nhật tần suất
        frames[replaceIndex] = page;
        frequency[page] = 1;
        
        framesHistory.push([...frames]);
    }

    return {
        frames: framesHistory.slice(0, -1),
        faults
    };
};