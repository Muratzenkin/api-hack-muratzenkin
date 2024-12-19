# Hack the Planet!

Eure Aufgabe ist es, eine REST API zu bauen.  
Dafür habt ihr bis **14:00 Uhr** Zeit.  
Danach werdet ihr euch den Code eines anderen Teams schnappen und versuchen, deren Anwendung kaputt zu machen. :-)

## 1. Findet euch in einem Team zusammen

Bildet Teams!  
Arbeitet zusammen, um euren Code effizient fertigzustellen.

## 2. Erstellt ein Repo mit einem Pull Request

1. Legt ein neues Repo in unserer Organisation an. Nennt es `api-hack-<eure Namen>`.
2. Jeder in unserer Organisation sollte die Möglichkeit haben, das Repo zu lesen und Pull Requests zu bearbeiten. Die korrekte Rolle heißt "Triage".
3. Legt eine `README.md`-Datei an und macht einen ersten Commit auf eurem `main`-Branch.
4. Alle weiteren Commits sollten auf einem anderen Branch geschehen, den ihr `feature/user` nennt.
5. Macht eine kleine Änderung. Gebt der `README.md` zum Beispiel eine Überschrift. Commitet diese Änderung auf dem `feature/user`-Branch.
6. Pusht den Branch auf GitHub und legt einen Pull Request von `feature/user` auf `main` an.
7. Folgende Endpunkte müssen implementiert sein:

## 3. Erschafft eure API

Welche Bibliotheken ihr verwenden möchtet, steht euch komplett frei.  
Ihr werdet Daten dauerhaft speichern müssen. Wie ihr das genau macht, steht euch komplett frei.

**Wichtig:** Ein anderes Team wird eure Anwendung starten wollen. Die `README.md` sollte genau erklären, welche Schritte unternommen werden müssen, um die Anwendung zu starten. Sollte z.B. eine Datenbank verwendet werden, beschreibt genau, wie man die Anwendung konfigurieren muss.

### 3.1 Die Daten

Die Anwendung dreht sich um Nutzerdaten. Wie diese Daten gespeichert werden, bleibt euch überlassen. Nach außen müssen die Nutzerdaten diese Form aufweisen:

- `username`\*
- `email`\*
- `bio`
- `address` ein Objekt mit folgenden Properties:
  - `streetName`\*
  - `streetNumber`\*
  - `city`\*
  - `zipCode`\*

Alle mit \* markierten Felder sind _required_.

### 3.2 Die Endpunkte

Ihr werdet diese Endpunkte implementieren.  
Es gibt drei Stufen der Privilegierung:

- Offen: Jeder Benutzer, ob angemeldet oder nicht, darf auf diese Daten zu greifen
- Angemeldet: Angemeldete Nutzer dürfen ihre eigenen Daten sehen
- Admin: Ein Admin darf alle Daten sehen

Implementiert folgende Endpunkte:

- `POST /login` ermöglicht es einem Nutzer, sich anzumelden. Ihr dürft frei entscheiden, wie ihr Nutzer authentifizieren möchtet.
- `GET /users` gibt alle Nutzer aus
  - Da es viele User geben kann, muss dieser Endpunkt eine Paginierung haben!
  - Jeder darf Nutzername und Bio sehen, diese Daten sind offen.
  - Nur Admins dürfen die E-Mail-Adressen und Adressen der Nutzer sehen.
- `GET /users?filter=bio` gibt nur die Nutzer aus, die eine Bio haben
  - Da es viele User geben kann, muss dieser Endpunkt eine Paginierung haben!
  - Jeder darf Nutzername und Bio sehen, diese Daten sind offen.
  - Nur Admins dürfen die E-Mail-Adressen und Adressen der Nutzer sehen.
- `GET /users?filter=admins` gibt nur die Admin-Nutzer aus
  - Da es viele User geben kann, muss dieser Endpunkt eine Paginierung haben!
  - Nur angemeldete Nutzer dürfen diesen Filter verwenden
  - Nur Admins dürfen die E-Mail-Adressen und Adressen der Nutzer sehen.
- `POST /users` Erschafft einen neuen Nutzer. Ihr entscheidet, in welcher Form ihr die Daten annehmt.
  - Nur Admins dürfen neue Nutzer hinzufügen.
- `GET /users/:username` gibt einen Nutzer anhand seines `username`s aus.
  - Jeder darf Nutzername und Bio sehen, diese Daten sind offen.
  - Nur Admins dürfen die E-Mail-Adressen und Adressen der Nutzer sehen.
- `PATCH /users/:username` patcht einen Nutzer anhand seines `username`s.
  - Jeder angemeldete Nutzer darf nur seine **eigenen** Daten ändern.
  - Admins dürfen die Daten aller Nutzer ändern.

Die Endpunkte müssen dokumentiert sein: Welchen Input erwarten sie und was geben sie zurück. Datentypen, ob Felder optional sind und welche Einschränkungen gelten, dürft ihr selbst definieren.
Haltet die Doku einfach und fügt sie in die `README.md` ein.

Legt gerne auch eine `requests.http`-Datei bei oder exportiert eine Postman-Collection.

### 3.3 Demodaten

Es müssen bereits **100 Datensätze** vorliegen. Diese können z.B. bei Start des Programms, über ein Seed-Skript oder eine beliebige andere Art hinzugefügt werden.  
Mindestens zwei Nutzer müssen Admins sein.

Falls ihr ein Seed-Skript o.ä. verwendet, dokumentiert, wie es benutzt werden soll.

## 4. Werdet bis 14:00 Uhr fertig!

Ihr habt **bis 14:00 Uhr** Zeit.  
Sobald eure Zeit um ist **müsst ihr euren aktuellen Stand pushen**, egal, wie weit ihr seid.

Versucht euch eure Zeit so einzuteilen, dass ihr euch nach der Mittagspause nur noch um Dokumentation und Feinschliff kümmern müsst.

Nehmt euch nach 14:00 Uhr auch irgendwann 15 Minuten Pause. :-)

## 5. Hackt!

Jedes Team nimmt klont sich nun das Repo des jeweils nächsten Teams. Geht hierfür einfach nach Reihenfolge der Breakout-Räume vor: Holt euch das Repo des jeweils nächsten Teams.

Führt das Programm des anderen Teams aus und versucht, Sicherheitslücken zu entdecken. Ihr dürft den Code ansehen aber **nicht manipulieren**.

Notiert auch, falls das Programm unvollständig ist, z.B.:

- Keine Erklärung, wie man das Seed-Skript ausführt
- Keine oder unvollständige Dokumentation der Endpunkte
- Implementierung von Endpunkten ist falsch oder unvollständig

Alles, was ihr findet, kommentiert ihr in einer Review des Pull Requests, den das andere Team angelegt hat. Seid gründlich, aber bleibt fair und freundlich. Falls ihr etwas seht, was euch sehr gefällt, könnt ihr natürlich auch positive Kommentare hinterlassen. :-)
