const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const http = require("http");
const mongoose = require("mongoose");
const connectMongo = require('connect-mongo');
const session = require("express-session");
const passport = require('passport');
const { v4 } = require('uuid');
const articlesController = require('./controllers/ArticlesController');
const cryptoController = require('./controllers/CryptoController');
const authController = require('./controllers/AuthController');
const rssFeedController = require('./controllers/RssFeedController');
const usersController = require('./controllers/UserController');
const favoriteController = require('./controllers/FavoritesController');
const PORT = 8081;
const githubAuth = require('./controllers/OauthGithubController');
const googleAuth = require('./controllers/OauthGoogleController');
const AdministrationController = require("./controllers/AdministrationController");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const server = http.Server(app);
const MongoStore = connectMongo(session);
require('./config/auth');

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_BDD } = process.env;

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_BDD}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to DB");
}).catch(err => {
  console.error("Connection error", err);
  process.exit();
});


app.use(express.json());
app.use(cors({ credentials: true, origin: true, exposedHeaders: ['x-auth-token'] }));

app.use(session({
  genid: (req) => v4(),
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'dashboard salt',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', authController);
app.use('/manageUsers', usersController);
app.use('/cryptos', cryptoController);
app.use('/articles', articlesController);
app.use('/admin/', AdministrationController);
app.use('/rssfeed', rssFeedController);
app.use('/favorites', favoriteController);
app.use('/users/auth', githubAuth);
app.use('/users/auth', googleAuth);



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8081/",
      },
    ],
  },
  apis: ["./controllers/CryptoController.js", "./controllers/AdministrationController.js"],
  };

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);



app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

server.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});
