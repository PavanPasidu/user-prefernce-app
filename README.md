````markdown
# 🚀 User Preference App (Webix + Django)

A sleek and responsive full-stack **User Preference App** built with **Webix** for the frontend and **Django** for the backend.  # 🚀 User Preference App (Webix)

This project is a **User Preference App** built using **Webix**, allowing users to manage their preferences efficiently through a dynamic and responsive UI.

## 🎯 Features

✅ **User-Friendly Interface** – Built with Webix for a smooth and interactive experience.  
✅ **Preference Management** – Users can set and update their preferences.  
✅ **Live Server Development** – Uses `npx live-server` for easy local development.  
✅ **Component-Based Architecture** – Organized structure for scalability and maintainability.  
✅ **Fast & Lightweight** – Webix ensures optimal performance with minimal resource usage.  
✅ **Backend Support** – Uses Express and MongoDB for storing user preferences.

## ⚡ Installation Guide

### 📌 Prerequisites
Ensure you have the following installed:
- 🌐 **Node.js** (>=14.x)
- 📦 **npx** (included with Node.js)
- 🛠 **Webix** (included in the project dependencies)
- 🛢 **MongoDB** (for storing user preferences)

### 🛠 Setup Steps

1️⃣ **Clone the Repository**
```sh
git clone https://github.com/sulakshigunarathne/User_Preference_Webix.git
cd User_Preference_Webix
```

2️⃣ **Install Client Dependencies**  
```sh
cd client
npm install
```

3️⃣ **Run the Development Server**  
```sh
cd ../client
npx live-server````markdown
#🚀 User Preference App (Webix + Django)

A sleek and responsive full-stack **User Preference App** built with **Webix** for the frontend and **Django** for the backend.  
Users can manage their **account**, **notifications**, **privacy**, and **theme settings** easily.

---

## ✨ Features

✅ **User-Friendly Interface** – Smooth Webix-based UI for an interactive experience.  
✅ **Account & Preference Management** – Update profile, notifications, privacy, and appearance.  
✅ **Live Preview & Interactivity** – Theme changes and settings reflect in real-time.  
✅ **Component-Based Design** – Organized structure with reusable Webix modules.  
✅ **Backend API** – Django RESTful endpoints with image upload support.  
✅ **Profile Images** – Upload, store, and display user avatars.

---

## 🧰 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| Webix UI | Django  | SQLite   |
| JavaScript | Django REST Framework | File-based image storage |

---

## ⚙️ Setup Guide

### 📦 Prerequisites

- 🐍 Python 3.10+
- 🟢 Node.js & npm
- 🌐 Git

---

### 🚀 Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/PavanPasidu/user-prefernce-app.git
cd user-prefernce-app
````

#### 2. Backend Setup (Django)

```bash
cd backend
py -3.10 -m venv env
env\Scripts\activate     # Windows
# source env/bin/activate  # macOS/Linux

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

🟠 Visit: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

#### 3. Frontend Setup (Webix)

In a new terminal:

```bash
cd frontend
npm install
npm run live-server
```

🟢 Visit: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

---

## 🗂️ Folder Structure

### 📁 `/frontend/`

```
├── assets/
│   ├── audio/        # Custom notification sounds
│   ├── data/         # Static JSON/data
│   └── images/       # Icons, profile avatars
├── css/styles.css    # Global styles
├── js/
│   ├── components/
│   │   ├── settings/
│   │   │   ├── accountForm.js
│   │   │   ├── notificationForm.js
│   │   │   ├── privacyForm.js
│   │   │   └── themeForm.js
│   │   ├── login.js
│   │   ├── signup.js
│   │   └── navbar.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── logouthome.js
│   │   └── settings.js
│   └── utils/
│       ├── accountUtil.js
│       ├── authAjax.js
│       ├── imageLoader.js
│       ├── pofileUtil.js
│       ├── settingMenu.js
│       └── themeManage.js
├── index.html
└── app.js
```

### 🛠️ `/backend/`

```
├── config/                # Django project config
│   ├── settings.py
│   └── urls.py
├── core/                  # Main Django app
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── serializers.py
├── profile_images/        # Uploaded profile pictures
├── static/                # Static files
├── db.sqlite3
└── requirements.txt
```


## 🤝 Contribution

Pull requests are welcome!
Feel free to open issues for suggestions or bugs.

---




```

4️⃣ **Access the Application**  
Open your browser and navigate to:
```
http://127.0.0.1:8080/
```
(Port may vary depending on the live server configuration.)

## 📁 Project Structure

```
User_Preference_Webix/
│── client/          # Frontend application
│   ├── assets/      # Static assets (images, fonts, etc.)
│   ├── components/  # Reusable Webix components
│   ├── pages/       # Main application pages
│   ├── styles/      # CSS styles
│   ├── tests/       # Test cases for the app
│   ├── utils/       # Utility functions
│   ├── index.html   # Main entry point
│   ├── app.js       # Core application logic
│   ├── package.json # Project metadata
```

## 🛠 Tech Stack

- **Frontend:** Webix, JavaScript, HTML, CSS   
- **Development Server:** npx live-server  

Users can manage their **account**, **notifications**, **privacy**, and **theme settings** easily.

---

## ✨ Features

✅ **User-Friendly Interface** – Smooth Webix-based UI for an interactive experience.  
✅ **Account & Preference Management** – Update profile, notifications, privacy, and appearance.  
✅ **Live Preview & Interactivity** – Theme changes and settings reflect in real-time.  
✅ **Component-Based Design** – Organized structure with reusable Webix modules.  
✅ **Backend API** – Django RESTful endpoints with image upload support.  
✅ **Profile Images** – Upload, store, and display user avatars.

---

## 🧰 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| Webix UI | Django  | SQLite   |
| JavaScript | Django REST Framework | File-based image storage |

---

## ⚙️ Setup Guide

### 📦 Prerequisites

- 🐍 Python 3.10+
- 🟢 Node.js & npm
- 🌐 Git

---

### 🚀 Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/PavanPasidu/user-prefernce-app.git
cd user-prefernce-app
````

#### 2. Backend Setup (Django)

```bash
cd backend
py -3.10 -m venv env
env\Scripts\activate     # Windows
# source env/bin/activate  # macOS/Linux

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

🟠 Visit: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

#### 3. Frontend Setup (Webix)

In a new terminal:

```bash
cd frontend
npm install
npm run live-server
```

🟢 Visit: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

---

## 🗂️ Folder Structure

### 📁 `/frontend/`

```
├── assets/
│   ├── audio/        # Custom notification sounds
│   ├── data/         # Static JSON/data
│   └── images/       # Icons, profile avatars
├── css/styles.css    # Global styles
├── js/
│   ├── components/
│   │   ├── settings/
│   │   │   ├── accountForm.js
│   │   │   ├── notificationForm.js
│   │   │   ├── privacyForm.js
│   │   │   └── themeForm.js
│   │   ├── login.js
│   │   ├── signup.js
│   │   └── navbar.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── logouthome.js
│   │   └── settings.js
│   └── utils/
│       ├── accountUtil.js
│       ├── authAjax.js
│       ├── imageLoader.js
│       ├── pofileUtil.js
│       ├── settingMenu.js
│       └── themeManage.js
├── index.html
└── app.js
```

### 🛠️ `/backend/`

```
├── config/                # Django project config
│   ├── settings.py
│   └── urls.py
├── core/                  # Main Django app
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── serializers.py
├── profile_images/        # Uploaded profile pictures
├── static/                # Static files
├── db.sqlite3
└── requirements.txt
```


## 🤝 Contribution

Pull requests are welcome!
Feel free to open issues for suggestions or bugs.

---



