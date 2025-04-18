
# Mini Social Media App

A simple social media web application built with **Node.js**, **Express.js**, **MongoDB**, **JWT** for authentication, and **EJS** as the templating engine. The app allows users to register, log in, create posts, like/unlike posts, and manage their profiles.

## Features

- **User Authentication**: Sign up and log in with JWT-based authentication.
- **Password Encryption**: Secure password storage using **Bcrypt**.
- **Create Posts**: Users can create and manage their own posts.
- **Like/Unlike Posts**: Users can like and unlike posts.
- **Profile Management**: View and edit user profile with posts.
- **Route Protection**: Protected routes using **middleware** to check authentication.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **Templating Engine**: EJS
- **Middleware**: cookie-parser for handling cookies

## Project Structure

```
project-root/
│
├── models/
│   ├── users.js          # User schema (MongoDB)
│   └── posts.js          # Post schema (MongoDB)
│
├── views/
│   ├── index.ejs         # Home Page
│   ├── login.ejs         # Login Page
│   ├── profile.ejs       # User Profile Page
│   └── edit.ejs          # Edit Post Page
│
├── app.js                # Main Express.js application
└── README.md             # Project documentation (this file)
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yes20sh/mini-social-media.git
cd mini-social-media
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Set up MongoDB

Ensure MongoDB is running locally or configure a remote database URI. Update the connection string in `app.js`:

```js
mongoose.connect("mongodb://localhost:27017/socialApp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
```

Alternatively, use a cloud service like MongoDB Atlas for a remote database.

### 4. Run the App

```bash
node app.js
```

Visit **http://localhost:3000** in your browser to view the app.

## API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/`              | Home page                 |
| GET    | `/login`         | Render login form         |
| POST   | `/login`         | Log in to the application |
| POST   | `/register`      | Register a new user       |
| GET    | `/logout`        | Log out the user          |
| GET    | `/profile`       | View user profile         |
| POST   | `/post`          | Create a new post         |
| GET    | `/like/:id`      | Like/Unlike a post        |
| GET    | `/edit/:id`      | Edit an existing post     |
| POST   | `/update/:id`    | Update post content       |
| GET    | `/delete/:id`    | Delete a post             |

## Middleware

- **isLoggedIn**: A middleware function to check if the user is logged in before accessing protected routes such as creating posts, editing, or deleting.

## Future Improvements

- Add form validation for registration and login
- Implement user profile picture upload
- Add pagination for posts
- Implement a frontend framework like React for a better user experience
- Use environment variables for sensitive data (e.g., JWT secret)

## License

This project is licensed under the MIT License.

---

## Author

**Yashraj Singh Solanki**
