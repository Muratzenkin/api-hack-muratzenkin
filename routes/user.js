import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/userSchema.js";
const router = express.Router();

//TODO Middleware: Token-Validierung
const authenticate = (req, res, next) => {
  // Wir erhalten das Token aus dem Autorisierungs-Header
  // replace(„Bearer ‚, ‘“) entfernt den Ausdruck „Bearer“ und übernimmt nur den Token-Teil.
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    //Überprüfung der Signatur: Prüft, ob das Token mit dem vom Server angegebenen JWT_SECRET signiert ist.
    // Überprüfung der Dauer: Prüft, ob das Token abgelaufen ist.
    // Wenn das Token gültig ist:
    // Dekodiert die Informationen im Token (userId, role, etc.).
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Speichert die Informationen (userId, role) aus dem validierten Token-Inhalt im Feld req.user.
    // Dadurch werden die Identität des Benutzers und die Autorisierungsinformationen für die nachfolgende Middleware und die Routen bereitgestellt.
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

//TODO Auflistung der Benutzer (Paging und Filterung)
// Über einen GET /users-Endpunkt kann ein autorisierter Benutzer die Benutzerliste abrufen, indem er sie nach bestimmten Kriterien filtert und paginiert.
// authentifizieren: Middleware-Funktion. Sie prüft, ob der Anfragende autorisiert ist. Wenn das Token nicht gültig ist oder fehlt, gibt diese Middleware einen Fehler zurück und die eigentliche Funktion wird nicht ausgeführt.
router.get("/users", authenticate, async (req, res) => {
  // req.query: Ruft die Abfrageparameter (z. B.?page=2&filter=admins) aus der URL der Anfrage ab.
  // page: Stellt die aktuelle Seite für das Paging dar. Wenn page in der URL nicht angegeben ist, wird standardmäßig 1 zugewiesen.
  // Filter: Ein Kriterium, das zum Filtern der Benutzerliste verwendet wird. Zum Beispiel:
  // filter=bio: Gibt nur Benutzer mit einer Biografie zurück.
  // filter=admins: Gibt nur Benutzer zurück, deren Rolle „admin“ ist.
  const { page = 1, filter } = req.query;
  //proSeite: Bestimmt die maximale Anzahl der Benutzer, die pro Seite angezeigt werden sollen
  const perPage = 10;

  //  Dient zur Erstellung eines dynamischen Abfrageobjekts. Dieses Objekt wird für die Abfrage von Benutzern in MongoDB verwendet.
  let query = {};

  // Filterzugriffskontrolle für Administratoren
  if (filter === "admins" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized to view admins" });
  }
  // { $exists: true }: prüft, ob das Bio-Feld existiert.
  // $ne: null: prüft, ob das Bio-Feld nicht leer ist (null).
  if (filter === "bio") query.bio = { $exists: true, $ne: null };
  if (filter === "admins") {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to filter by admins" });
    }
    query.role = "admin";
  }

  const users = await User.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ _id: 1 });

  const userData = users.map((user) => {
    const userObj = {
      username: user.username,
      bio: user.bio,
    };
    // Admin kullanıcılar e-posta ve adres bilgilerini görebilir
    if (req.user.role === "admin") {
      userObj.email = user.email;
      userObj.address = user.address;
    }
    return userObj;
  });
  // res.json(users): Gibt die als Ergebnis der Abfrage erhaltene Benutzerliste im JSON-Format an den Client zurück.
  res.json(users);
});

//TODO Benutzer anlegen (nur Admin kann neue Benutzer hinzufügen)
router.post("/users", authenticate, async (req, res) => {
  // req.user.role: Die Authentifizierungs-Middleware fügt die Benutzerinformationen (z. B. Rolle, userId) im authentifizierten JWT zum req.user-Objekt hinzu. Hier prüfen wir die Rolle des Benutzers.
  // req.user.role !== „admin“: Wenn die Rolle des Benutzers nicht admin ist, ist dieser Vorgang nicht autorisiert.
  if (req.user.role !== "admin")
    // HTTP 403: Unbefugter Zugriff.
    return res.status(403).json({ message: "Not authorized" });
  // req.body: Empfängt die Daten aus dem Body der Anfrage.
  const { username, email, password, bio, address, role } = req.body;
  // bcrypt.hash(): Verschlüsselt das Passwort sicher (erzeugt einen verschlüsselten Wert).
  // password: Das vom Benutzer in der Anfrage gesendete einfache Passwort.
  // 10: Der saltRounds-Parameter der Hash-Funktion. Je höher der Wert ist, desto stärker ist der Hashwert, erfordert aber auch mehr Rechenleistung.
  const hashedPassword = await bcrypt.hash(password, 10);
  //   new User({...}): Erzeugt ein neues Benutzerobjekt aus dem Benutzermodell.
  const newUser = new User({
    username,
    email,
    // Das Benutzerpasswort wird gehasht gespeichert.
    password: hashedPassword,
    bio,
    address,
    role,
  });

  await newUser.save();
  //   HTTP 201: Eine neue Ressource (Benutzer) wurde erfolgreich erstellt.
  res.status(201).json({ message: "User created successfully" });
});

//TODO Benutzerdaten
// Der Teil :username ist ein dynamischer URL-Parameter und enthält einen bestimmten Benutzernamen.
// Zum Beispiel sucht die Anfrage /users/johndoe nach einem Benutzer mit dem Benutzernamen johndoe.
router.get("/users/:username", authenticate, async (req, res) => {
  // Sucht in der Datenbank nach dem angegebenen Benutzernamen.
  const user = await User.findOne({ username: req.params.username });
  //   HTTP 404 (Nicht gefunden): Zeigt an, dass der Benutzer nicht gefunden werden konnte.
  if (!user) return res.status(404).json({ message: "User not found" });

  //   userData:
  // Erzeugt ein Objekt, das die zurückzugebenden Benutzerdaten enthält.
  // Standardmäßig sind nur der Benutzername und die Lebenslaufdaten enthalten.
  // Warum begrenzte Daten?
  // Aus Datenschutz- und Sicherheitsgründen werden sensible Informationen wie E-Mail und Adresse nur an autorisierte Personen weitergegeben.
  const userData = {
    username: user.username,
    bio: user.bio,
  };
  //   Admin: Wenn der anfragende Benutzer ein Administrator ist, ist er berechtigt, alle Benutzerinformationen zu sehen.
  //   Eigene Informationen: Wenn der Benutzer versucht, auf sein eigenes Profil zuzugreifen (req.user.userId === user._id.toString()), kann er auf alle Informationen zugreifen.
  if (req.user.role === "admin" || req.user.userId === user._id.toString()) {
    userData.email = user.email;
    userData.address = user.address;
  }
  res.json(userData);
});

//TODO Benutzeraktualisierung

router.patch("/users/:username", authenticate, async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ message: "User not found" });

  // req.user.userId:
  // Die Middleware für die Authentifizierung speichert die Informationen über den authentifizierten Benutzer im Objekt req.user. Hier steht req.user.userId für die ID des anfragenden Benutzers.
  // user._id.toString():
  // Die _id des Benutzerobjekts in der Datenbank ist vom Typ ObjectId von MongoDB. toString() wandelt diese ID in das String-Format um.

  //   Der Benutzer kann nur seine eigenen Informationen aktualisieren. Wenn der Antragsteller nicht mit dem zu aktualisierenden Benutzer identisch ist und kein Administrator ist, wird der Vorgang abgebrochen.
  if (req.user.userId !== user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  // Die in der Anfrage gesendeten Daten werden empfangen. Hier werden nur Bio- und Adressinformationen empfangen. Diese beiden Felder werden zur Aktualisierung angefordert.
  const { bio, address } = req.body;
  // Wenn der Body der Anfrage einen Bio-Wert enthält, wird das Bio-Feld des Benutzerobjekts aktualisiert.
  if (bio) user.bio = bio;
  if (address) user.address = address;

  await user.save();
  res.json({ message: "User updated successfully" });
});

export default router;
