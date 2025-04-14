# 🔄 Page Replacement Algorithm Simulator (React + Vite)

Dự án mô phỏng các thuật toán thay thế trang trong hệ điều hành, hiện tại hỗ trợ **Second Chance (Clock Algorithm)**. Người dùng có thể nhập thủ công chuỗi tham chiếu trang và số lượng khung (frames), sau đó hệ thống sẽ hiển thị trực quan các lần xảy ra page fault cùng trạng thái bộ nhớ theo từng bước.

---

## 📦 Cài đặt & chạy thủ công

### 1. Clone project

```bash
git clone https://github.com/hongquang2335/Context-Switching
cd your-repo-name

```
### 2. Cài đặt dependencies

```bash
npm install
npm run dev
npm install

```
### 3. Khởi động ứng dụng

```bash
npm run dev
```
Mở trình duyệt truy cập: http://localhost:5173

## 🐳 Chạy ứng dụng bằng Docker (khuyên dùng nếu không cài Node.js)
Yêu cầu:
Docker Desktop (miễn phí): https://www.docker.com/products/docker-desktop

Docker đã chạy: kiểm tra bằng lệnh docker version

Các bước chạy bằng Docker

### 1. Build Docker image:

```bash
docker build -t vite-react-simulator .

```
### 2. Chạy container:

```bash
docker run -d -p 8080:80 vite-react-simulator
```

Mở trình duyệt và truy cập: http://localhost:8080


---
## 🚀 Demo
![Nhập input](./assets/nhap_input.png)
> Nhập chuỗi trang và số lượng frame

---

![Kết quả mô phỏng](./assets/output.png)
> Kết quả mô phỏng thuật toán Second Chance: hiển thị chi tiết từng bước và tổng số page faults

---
### 📸 Trường hợp xảy ra hiện tượng Belady

| 3 Frames | 4 Frames |
|----------|----------|
| <img src="./assets/truong_hop_xay_ra_belady.png" width="400"/> | <img src="./assets/output.png" width="400"/> |

> 🔍 Với 3 frame (trái), số lần page fault là **9**.  
> Với 4 frame (phải), số lần page fault lại tăng thành **10** – minh họa cho **hiện tượng Belady**.

---

## 🧠 Tính năng chính

- ✅ Nhập chuỗi tham chiếu trang thủ công
- ✅ Nhập số lượng khung trang (frame)
- ✅ Chọn thuật toán thay thế trang (hiện tại là **Second Chance**)
- ✅ Hiển thị trạng thái bộ nhớ và lỗi trang từng bước

---

## 🛠️ Công nghệ sử dụng

- ⚡ **Vite** – bundler siêu nhanh cho React
- ⚛️ **React** – thư viện xây dựng giao diện người dùng

---
