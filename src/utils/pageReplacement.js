export const simulateSecondChance = (pages, frameCount) => {
    const frames = Array(frameCount).fill(null);
    const referenceBits = Array(frameCount).fill(0);
    const framesHistory = [];
    let faults = 0;
    let pointer = 0; // Con trỏ đồng hồ
  
    // Khởi tạo lịch sử với các frame ban đầu
    framesHistory.push([...frames]);
  
    for (const page of pages) {
      // Kiểm tra nếu trang đã có trong frame
      const frameIndex = frames.indexOf(page);
      
      if (frameIndex !== -1) {
        // Nếu trang đã tồn tại, set bit tham chiếu = 1
        referenceBits[frameIndex] = 1;
        framesHistory.push([...frames]);
        continue;
      }
  
      // Nếu không tìm thấy trang (page fault)
      faults++;
      
      // Tìm trang để thay thế
      let replaced = false;
      while (!replaced) {
        if (referenceBits[pointer] === 0) {
          // Thay thế trang này
          frames[pointer] = page;
          referenceBits[pointer] = 1; // Set bit tham chiếu cho trang mới
          replaced = true;
        } else {
          // Cho trang này "second chance" - reset bit tham chiếu
          referenceBits[pointer] = 0;
        }
        
        // Di chuyển con trỏ theo vòng tròn
        pointer = (pointer + 1) % frameCount;
      }
      
      // Lưu lại trạng thái hiện tại
      framesHistory.push([...frames]);
    }
  
    return {
      frames: framesHistory.slice(0, -1), // Bỏ trạng thái cuối cùng thừa
      faults
    };
  };