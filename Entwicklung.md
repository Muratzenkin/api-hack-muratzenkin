```bash

npm init -y
npm install express mongoose bcrypt jsonwebtoken body-parser dotenv nodemon

```

```
/api-hack-Muratzenkin
    /models
        user.js
    /routes
        auth.js
        users.js
    .env
    app.js

```

```
.env.example
PORT=5000
MONGO_URI=mongodb://localhost:27017/api-hack
JWT_SECRET=your_jwt_secret_key
```

### MongooseSchema

toJSON-Methode: Die Felder password und \_\_v werden in der JSON-Ausgabe weggelassen. Dies ist wichtig, um Kennwörter beim Export von Benutzerdaten zu schützen.
