import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/userSchema.js";
const router = express.Router();

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Wir suchen nach dem Benutzernamen in der Datenbank
  const user = await User.findOne({ username });
  //   Bedeutung: Zeigt an, dass die angeforderte Ressource nicht gefunden werden konnte. In diesem Fall konnte das System den angegebenen Benutzernamen nicht in der Datenbank finden.
  if (!user) return res.status(404).json({ message: "User not found" });

  // Wir vergleichen das Passwort
  const isMatch = await bcrypt.compare(password, user.password);
  //   Bedeutung: Zeigt an, dass ein Fehler oder ungültige Daten in der Anfrage des Clients vorliegen.
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  //JWT
  //JWT wird für die Authentifizierung und Autorisierung eines Benutzers verwendet.
  // Nachdem sich der Benutzer erfolgreich angemeldet hat, stellt ihm der Server ein JWT aus.
  // Dieses Token enthält benutzerspezifische Informationen (z. B. Benutzer-ID, Rolle) und wird vom Server signiert.
  // Der Client authentifiziert sich dann, indem er dieses Token an den Server sendet.
  const token = jwt.sign(
    {
      // Wir fügen die Benutzer-ID und die Rolle zur Nutzlast des JWTs hinzu
      userId: user._id,
      role: user.role,
    },
    // Wir verwenden den geheimen Schlüssel zum Signieren des JWT
    process.env.JWT_SECRET,
    // Wir setzen die Gültigkeitsdauer des JWT auf 1 Stunde
    { expiresIn: "1h" }
  );
  // Wir geben das generierte JWT im JSON-Format zurück
  res.json({ token });
});

export default router;
