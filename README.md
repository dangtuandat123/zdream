# ZDream - Tiệm Ảnh Kỹ Thuật Số

Biến hình ảnh của bạn thành tác phẩm nghệ thuật với AI. Zero-Prompt, siêu đơn giản!

## 🚀 Tech Stack

### Frontend
- Next.js 14+ (Static Export)
- TailwindCSS + Shadcn UI
- FontAwesome Icons
- Glassmorphism Design

### Backend
- Laravel 10
- MySQL
- MinIO (S3-compatible storage)
- OpenRouter AI API

## 📦 Cài đặt

### Frontend
```bash
cd frontend
npm install
npm run dev      # Development
npm run build    # Production build
```

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

## 🎨 Features
- 8+ AI Styles có sẵn
- Upload ảnh đơn giản
- Thanh toán QR VietQR
- Mobile-first responsive design

## 📄 License
MIT
