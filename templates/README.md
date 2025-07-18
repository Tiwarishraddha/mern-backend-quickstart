🚀MERN Backend Quickstart
    A professional, production-ready MERN backend boilerplate generator to help developers quickly scaffold backend projects using MongoDB, Express, and optional JWT Authentication.
    Customize your setup through the CLI to generate only the files you need.

📥Installation & Usage
    🔧 Install Globally
        npm install -g mern-backend-quickstart
    🚀 Run CLI Anywhere
        create-mern-backend

    🔧 Install Locally in a Project
        npm install mern-backend-quickstart
    🚀 Run CLI via NPX (No Global Install Needed)
        npx create-mern-backend

🛠️Folder Structure :    
    config/
    ├── database.js

    controllers/
    ├── sampleController.js

    middleware/
    ├── authMiddleware.js    # Optional (based on CLI answer)
    
    models/
    ├── sampleModel.js

    routes/
    ├── sampleRoute.js

    utils/
    ├── generateToken.js     # Optional (based on CLI answer)

    .env.example
    server.js
    package.json
    README.md

✨Features :
    🔗 MongoDB Connection using Mongoose
    ⚙️ Express Routing and Controllers
    🔐 JWT Authentication (Optional via CLI)
    🔑 Bcrypt Password Hashing
    🗂️ Clean, Scalable Project Structure
    🛠️ Optional Sample Files (Models, Controllers, Routes)
    📄 Auto-generated .env file

🎯Why Use This?
    ✅ Saves time with ready-made structure
    ✅ Follows backend best practices
    ✅ Easily customizable through interactive CLI
    ✅ Quickly get started with real projects

🔧CLI Options
    When running create-mern-backend, you'll be prompted:
     Do you want Authentication Middleware?
     Do you want Sample Files?
    Your project is customized based on these answers.


🧑‍💻Author
    Shraddha Tiwari
    Designed to save developers from writing the same boilerplate repeatedly.



