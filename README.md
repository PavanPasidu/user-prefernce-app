

---

```markdown
# 🧑‍💻 User Preference Web App

A full-stack web application that allows users to manage their **account**, **notifications**, **privacy**, and **appearance settings**.  
Built using **Django (Python)** for the backend and **Webix (JavaScript)** for the frontend.

---

## 📁 Project Structure

```

user-preference-app/
├── backend/           # Django backend
└── frontend/          # Webix frontend

````

---

## ⚙️ Requirements

- Python 3.10+
- Node.js + npm
- Git

---

## 🚀 Installation & Setup Guide

### 📥 1. Clone the Repository

```bash
git clone https://github.com/PavanPasidu/user-prefernce-app.git
cd user-prefernce-app
````

---

### 🛠️ 2. Backend Setup (Django)

```bash
cd backend

# Create and activate virtual environment (Python 3.10)
py -3.10 -m venv env
env\Scripts\activate   # Windows
# source env/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# (Optional) Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

🌐 Visit: `http://127.0.0.1:8000/`

---

### 💻 3. Frontend Setup (Webix)

Open a **new terminal** window:

```bash
cd frontend

# Install frontend dependencies
npm install

# Start the frontend using Live Server
npm run live-server
```

🌐 Visit: `http://127.0.0.1:8080/` (or the URL shown in terminal)

---

## 🗂️ Folder Structure Overview

### 🔙 Backend (`/backend`)

```
backend/
├── config/                # Django project config
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── core/                  # Django app
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── profile_images/        # User uploaded profile images
├── static/
├── db.sqlite3
└── requirements.txt
```

### 🔜 Frontend (`/frontend`)

```
frontend/
├── assets/
│   ├── audio/
│   ├── data/
│   └── images/
├── css/
│   └── styles.css
├── js/
│   ├── components/
│   │   ├── settings/
│   │   │   ├── accountForm.js
│   │   │   ├── notificationForm.js
│   │   │   ├── privacyForm.js
│   │   │   └── themeForm.js
│   │   ├── login.js
│   │   ├── navbar.js
│   │   └── signup.js
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
├── app.js
├── index.html
└── package.json
```

---

## ✅ Features

* 🔐 User authentication (login, signup)
* 👤 Account settings update
* 🔔 Notification toggle
* 🔒 Privacy control
* 🎨 Theme customization
* 🖼️ Profile image upload
* Fully responsive and dynamic UI (Webix)

---

## 📸 Screenshots (Optional)

*Add screenshots here if needed.*

---

## 🤝 Contributing

Contributions are welcome!
Open issues or PRs for bug fixes or improvements.

---

## 📄 License

MIT License © [PavanPasidu](https://github.com/PavanPasidu)

```


