# Bước 1: Build app bằng node
FROM node:18-alpine AS build

WORKDIR /app

# Copy source vào container
COPY . .

# Cài đặt các dependencies
RUN npm install

# Build dự án (sẽ tạo ra thư mục dist/)
RUN npm run build

# Bước 2: Dùng nginx để phục vụ static web
FROM nginx:alpine

# Xoá file mặc định của nginx (optional)
RUN rm -rf /usr/share/nginx/html/*

# Copy file đã build từ bước 1 vào nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 để container phục vụ web
EXPOSE 80

# Lệnh khởi động nginx
CMD ["nginx", "-g", "daemon off;"]
