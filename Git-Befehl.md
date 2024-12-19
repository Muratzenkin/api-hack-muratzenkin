## 1. Überprüfen Sie Ihren aktuellen Status

Zunächst sollten Sie überprüfen, in welchem Branch Sie sich befinden und den Status der letzten Änderungen ansehen. Verwenden Sie dazu folgenden Befehl:

```bash
git status

git checkout main   # Wechseln Sie zum main Branch, falls Sie sich nicht darin befinden
git pull origin main  # Holen Sie die neuesten Daten vom Haupt-Branch
git checkout -b murat   # Erstellen Sie einen neuen Branch und wechseln Sie zu ihm
git add .  # Fügen Sie alle Änderungen hinzu
git commit -m "Meine Änderungen"  # Commiten Sie Ihre Änderungen
git push origin murat   # Pushen Sie den 'murat' Branch zum Remote-Repository
git checkout main   # Wechseln Sie zum Haupt-Branch
git pull origin main   # Holen Sie die neuesten Updates des Haupt-Branches
git merge murat   # Mergen Sie die Änderungen aus dem 'murat' Branch in den Haupt-Branch
git checkout main  # Wechseln Sie zum Haupt-Branch
git pull origin main  # Holen Sie die neuesten Updates des Haupt-Branches
git checkout murat  # Wechseln Sie zurück zum 'murat' Branch
git merge main  # Mergen Sie die Änderungen aus dem Haupt-Branch in den 'murat' Branch
git pull origin main # Um Updates vom Haupt-Branch zu holen:
git checkout -b murat # Um einen neuen Branch zu erstellen
git commit -m "Nachricht" # Um Änderungen zu committen
git push origin murat # Um Ihren Branch zum Remote-Repository zu pushen
git merge murat  # (Aus dem Haupt-Branch heraus) Um den Branch mit dem Haupt-Branch zu mergen
git branch -d murat  # Um einen lokalen Branch zu löschen, verwenden Sie folgenden Befehl:
git branch -D murat # Falls der Branch ohne gesicherte Änderungen gelöscht werden soll, können Sie den -D Schalter verwenden, um ihn zu erzwingen:
git push origin --delete murat # Wenn Sie den murat Branch nicht nur lokal, sondern auch im Remote-Repository löschen möchten, verwenden Sie folgenden Befehl
git fetch --prune #Nach dem Löschen eines Remote-Branches können Sie mit folgendem Befehl die gelöschten Branches auch lokal bereinigen
```
