
# 🧭 Wanderlust

[🌐 Visit Website](https://wanderlust-nt0i.onrender.com)

**Wanderlust** is a full-stack travel accommodation platform where users can explore and list vacation rentals. Built with Node.js, Express, and MongoDB, the app supports dynamic listing creation, interactive maps, image uploads, and secure user authentication—providing a smooth experience for both hosts and travelers.

---

## 🔑 Key Functionalities

* 🔐 Secure user registration and login
* 🏠 Add, edit, and delete property listings
* 📍 Interactive map integration via Mapbox
* 📸 Upload and manage listing image
* 💬 Flash messages for user feedback
* 📱 Fully responsive webapp

---

## 📁 Project Folder Structure

```
Wanderlust/
├── controllers/        # Route logic handlers
├── init/               # MongoDB connection setup
├── middleware.js       # Custom Express middleware
├── cloudConfig.js      # Cloudinary image config
├── models/             # Mongoose models
├── public/             # Static assets (CSS, JS)
├── routes/             # Auth, Listing, Review routes
├── utils/              # Geocoding & data helpers
├── views/              # EJS templates
├── app.js              # Main application entry
└── package.json
```

---

## 🛠️ Tech Stack

* **Frontend**: EJS, HTML5, CSS3, JavaScript
* **Backend**: Node.js, Express.js
* **Database**: MongoDB + Mongoose
* **Auth**: Passport.js, Express-Session
* **File Hosting**: Cloudinary, Multer
* **Mapping**: Mapbox API

---


## 🖼️ Sneak Peek

| Home Page                                 | Listing Detail                              | Create Listing                              |
| ----------------------------------------- | ------------------------------------------- | ------------------------------------------- |
|https://ibb.co/GvxdBh51 | https://ibb.co/GvxdBh51 | https://ibb.co/GvxdBh51 |

---

## 📦 Dependencies

| Package         | Purpose              |
| --------------- | -------------------- |
| `express`       | Backend routing      |
| `mongoose`      | MongoDB ODM          |
| `passport`      | Authentication       |
| `multer`        | Image uploads        |
| `cloudinary`    | Image hosting        |
| `dotenv`        | Environment config   |
| `mapbox`        | Geolocation and maps |
| `ejs`           | Templating engine    |
| `connect-flash` | Flash messaging      |

---

## ⚙️ Installation & Setup

### 1. Clone and Install

```bash
git clone https://github.com/sigo-ai/Wanderlust.git
cd Wanderlust
npm install
```

### 2. Setup `.env`

```env
DB_URL=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
SECRET=session_secret
```

### 3. Run the App

```bash
npm start
```

Access the app at: `http://localhost:3000`

---

## 📡 API Routes

### Auth Routes

* `GET /register` – Registration form
* `POST /register` – Register a new user
* `GET /login` – Login form
* `POST /login` – Authenticate user
* `GET /logout` – Logout user

### Listing Routes

* `GET /listings` – View all listings
* `GET /listings/new` – New listing form
* `POST /listings` – Create listing
* `GET /listings/:id` – View single listing
* `PUT /listings/:id` – Update listing
* `DELETE /listings/:id` – Delete listing

---

## ✨ Features

* 🧑‍💻 RESTful MVC architecture
* 🔍 Search listings by title or location
* 🗺️ Interactive location picker with Mapbox
* ☁️ Upload images via Cloudinary
* 🚫 User authorization & ownership checks
* ✅ Flash messages for feedback (success/error)

---

## 📬 Contact

* 👨‍💻 **Author**: Aman ([@sigo-ai](https://github.com/sigo-ai))
* 📫 **Email**: [sharmajiaman562@gmail.com](mailto:sharmajiaman562@gmail.com)
* 🔗 **Website**: [https://wanderlust-nt0i.onrender.com](https://wanderlust-nt0i.onrender.com)

---

## 🙏 Thank You!

Thank you for checking out Wanderlust! Feel free to leave a ⭐ on the [repository](https://github.com/sigo-ai/Wanderlust) if you found it helpful or inspiring.

---

Would you like me to generate matching banner images or GitHub badges for this README?
