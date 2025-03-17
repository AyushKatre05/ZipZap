# ZipZap - Modern E-Commerce Platform

## 🚀 Overview
ZipZap is a cutting-edge eCommerce platform built with modern web technologies. It provides a seamless shopping experience with a beautifully designed UI and powerful backend features.

## 🛠 Tech Stack
### **Frontend**
- **Next.js** - React Framework for SSR & SSG
- **TypeScript** - Strictly typed JavaScript for better scalability
- **Tailwind CSS** - Utility-first styling framework
- **ShadCN** - Modern UI components for an elegant design

### **Backend**
- **Node.js & Express.js** - Scalable API architecture
- **Prisma ORM** - Database modeling & queries
- **PostgreSQL** - Relational database running in **Docker**
- **Jose** - Secure JWT authentication

### **Other Integrations**
- **Arcjet** - Optimized Next.js deployment
- **Cloudinary** - Image & media management

## 🎨 Features
✅ **Modern UI & UX** - Built with ShadCN & Tailwind CSS  
✅ **Authentication** - Secure login & JWT-based authentication  
✅ **Product Management** - CRUD operations for products  
✅ **Cart & Checkout** - Smooth eCommerce experience  
✅ **PostgreSQL with Prisma** - Efficient database management  
✅ **Image Uploads** - Cloudinary integration for fast image hosting  
✅ **Optimized Performance** - Server-side rendering with Next.js  

## 📦 Installation

### 1️⃣ **Clone the Repository**
```bash
  git clone https://github.com/your-username/zipzap.git
  cd zipzap
```

### 2️⃣ **Install Dependencies**
```bash
  # Install backend dependencies
  cd server
  npm install

  # Install frontend dependencies
  cd ../client
  npm install
```

### 3️⃣ **Setup Environment Variables**
Create a `.env` file in both **server** and **client** directories.

#### 📌 **Server `.env`**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/zipzap
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 📌 **Client `.env`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4️⃣ **Run PostgreSQL in Docker**
```bash
docker-compose up -d
```

### 5️⃣ **Run Prisma Migrations**
```bash
cd server
npx prisma migrate dev --name init
```

### 6️⃣ **Start the Application**
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

## 🎯 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a product (Admin) |
| POST | `/api/upload` | Upload product images |

## 🚀 Deployment
### **Backend Deployment (Vercel, Arcjet, etc.)**
```bash
npm run build
npm start
```

### **Frontend Deployment (Vercel, Netlify, etc.)**
```bash
npm run build
npm run start
```

## 🎉 Contributing
We welcome contributions! Please follow the [Contribution Guide](CONTRIBUTING.md).

## 📄 License
This project is licensed under the **MIT License**.

---

Made with ❤️ by the ZipZap Team

