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
    server.js

```

```
.env.example
PORT=5000
MONGO_URI=mongodb://localhost:27017/api-hack
JWT_SECRET=your_jwt_secret_key
```

### MongooseSchema

toJSON-Methode: Die Felder password und \_\_v werden in der JSON-Ausgabe weggelassen. Dies ist wichtig, um Kennwörter beim Export von Benutzerdaten zu schützen.

### Authentifizierung

### POST /auth/login

- **Beschreibung**: Authentifiziert den Benutzer für den Login.
- **Anforderungs-Body**:

  - `username`: Benutzername
  - `password`: Passwort

- **Antwort**:
  - `token`: JWT-Token

## Benutzer

### GET /users

- **Beschreibung**: Ruft die Liste der Benutzer ab.
- **Abfrageparameter**:
  - `page`: Seitenzahl
  - `filter`: `bio` oder `admins`
- **Antwort**:
  - `users`: Benutzerdaten (Benutzername, Bio)
  - `pagination`: Paginierungsinformationen (totalCount, pageCount, currentPage, perPage)

### GET /users/:username

- **Beschreibung**: Ruft einen bestimmten Benutzer anhand des Benutzernamens ab.
- **Antwort**:
  - `username`: Benutzername
  - `bio`: Benutzerbiografie
  - (Für Admins) `email`, `address`

### PATCH /users/:username

- **Beschreibung**: Aktualisiert die Benutzerdaten.
- **Anforderungs-Body**:
  - `bio`: Neue Biografie
  - `address`: Neue Adresse

### POST /users

- **Beschreibung**: Erstellt einen neuen Benutzer. (Nur für Admins)
- **Anforderungs-Body**:
  - `username`: Benutzername
  - `email`: E-Mail-Adresse
  - `password`: Passwort
  - `bio`: Biografie
  - `address`: Adresse
  - `role`: Rolle (`admin` oder `user`)

---

## Installation

1. **Repository klonen:**

```bash
git clone https://github.com/dein-benutzername/dein-repository.git
```
