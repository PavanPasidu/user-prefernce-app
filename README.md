````markdown
# 🚀 User Preference App (Webix + Django)

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

---

## 🖼️ Screenshots (Optional)

> *Include UI screenshots of profile settings, theme switch, and dashboard here.*

---

## 🤝 Contribution

Pull requests are welcome!
Feel free to open issues for suggestions or bugs.

---

## 📄 License

MIT License © [PavanPasidu](https://github.com/PavanPasidu)

```


