# BP WS24_25-B3 Feuerwehr-SocialMedia

Hier finden sich grundlegende Angaben zu den Abgaben, welche im Rahmen des oben genannten IMI-Projektes am Ende des Bearbeitungszeitraumes den Betreuern zur Verfügung gestellt werden müssen um eine Bewertung des Projektes zu ermöglichen.

## Entwicklung
Die Entwicklungsarbeit soll gesammelt im dafür vorgesehenen Ordner abgelegt werden. Dabei ist darauf zu achten, dass eine passende .gitignore-Datei verwendet wird um unnötige Uploads wie z.B. Build-Ordner zu vermeiden. Für verschiedene Projekte, wie z.B. Unity-Projekte, findet man entsprechende .gitignore-Vorlagen im Netz.

Sollten für ein Projekt mehrere Repros benötigt werden, z.B. weil ein Projekt aus mehreren Komponenten besteht, können für das Projekt eine Projektgruppe mit mehreren Repros angelegt werden. In den Beschreibungen muss dann klargestellt werden welches das Hauptrepro mit der Dokumentation und diesem Dokument ist.


Ordner für die Entwicklungsarbeiten:
<br>[/development](/development) 


## Dokumentation
Für den Abschluss des Projektes soll eine Dokumentation erstellt werden, diese dient sowohl der Dokumentation des Projektprozesses, als auch der Dokumentation der verwendete Technologien, benutzten Ressourcen und Anleitung zum Aufsetzen des Projektes (Deployment-Sheet).

Die Dokumentation enthält u.a. folgende Punkte:

1. Allgemeines (Teamvorstellung (inkl. Studi-Mailadressen), Worum ging es in dem Projekt, Link zur Showtimewebseite, ...)
2. Prozess (Projekt-Meilensteine, genutzte UND verworfene Konzepte/Technologien (gerne mit Links), technische Herausforderungen, ...)
3. Konzeptentwicklung und Konzeptergebnis
4. Wichtigste Rechercheergebnisse (eingeflossene Publikationen etc., Darstellung von MockUps etc.)
5. Implementierung (Softwarearchitektur, wichtigste Klassen, wie könnten wir Code erweitern (z.B. neue APIs), ...)
6. Probleme/Lösungen (Welche Probleme sind euch bekannt/wie kann man die beheben?, Bekannte Fehlermeldungen, wichtige Einstellungen, etc.)
7. Reflexion (Was hat gut funktioniert?, Was weniger?, Was könnte man beim nächsten Mal besser machen?, Ausblick für potenzielle Folgeprojekte, ...)
   1. Individuelle Reflexion (Bitte jede(r) individuell die eigene Arbeit und die eigene Rolle im Team reflektieren - max 1/2 Seite pro Person)
8. **Deployment** (Wie kann eine komplett unwissende Person das Projekt wie es hier im GitLab vorliegt das Projekt in Betrieb nehmen)
   1. Zur Projektzeit verwendete Hardware
   2. Softwareanforderungen/Unity-Version/Accounts für APIs/...?
   3. Wo müssen im Projekt Anpassungen durchgeführt werden für den Einsatz z.B. IP-Adressen in Config-Datei o.ä.)

Alle Punkte in der neutralen Form geschrieben, Punkt 6 kann in der Ich/Wir-Form geschrieben werden.

Dokumentation kann im Wiki vom Repo erstellt werden, abgegeben werden muss als eine PDF-Datei (Kapitel 1-6)
<br>ZUSÄTZLICH **Deployment** als eine eigene Datei (Kapitel 7)

Ordner für die Dokumentation des Projektes:
<br>[/documentation](/documentation)

Wiki des Projektes:
<br>[../../wikis/home](/-/wikis/home)


## Medien
Für die Präsentation der im Rahmen vom FKI/FG Creative Media begleiteten Projekte sollen passende Medien in einem getrennten Ordner zur Verfügung gestellt werden. Diese müssen unter einer zeitlich unbeschränkten Nutzungslizenz zur nicht-commerziellen Präsentation und Vervielfälltigung stehen, u.a. damit sie aufexterne Datenträger für Präsentationen kopiert werden dürfen.

- Kurze Beschreibung des Projektes (1-2 Absätze)
- Nachvollziehbare Bilder (Screenshots, Fotos der Showtime, ggf. relevante technische Bilder)
- Wenn für die Showtime angefertigt: Vorstellungsvideo des Projektes, Posterdateien etc.

Für sehr große Daten kann auf Nachfrage ein Nextcloud-Ordner als Cloudspeicher der Forschungsgruppe zur Verfügung gestellt werden.

Medien des Projektes im Ordner
<br>[/media](/media)


## Lizenz
Für das Projekt soll eine geeignete Lizenz gewählt werden, welche sowohl die Nutzung, als auch die Weiterentwicklung des Projektes ermöglichen. Darüber hinaus soll dokumentiert werden welche Lizenzen ggf. verwendet bzw. benötigt werden für eingesetzte externe Ressourcen (Assets, API-Zugänge etc.). Damit soll sichergestellt werden, dass bekannt ist welchen Lizenzeinschränkungen das Projekt unterliegt oder welche Lizenzen für eine weitere Verwendung in Anspruch genommen werden müssen.

Dokumentation der Lizenzen im Ordner
<br>[/licence](/licence)


## Abgabe

Ansonsten möchten wir am Ende:
Einen Ordner (z.B. als .zip) mit dem fertigen Build (wenn anwendbar, z.B. .apk)
<br>[/build](/build)

Ins Gitlab: finale Codeversion inkl. verständlicher Readme und .gitignore (die ihr hoffentlich bereits habt ;))
- Kurzbeschreibung in den Einstellungen im Repo, bei mehreren Repos (z.B. für verschiedene Komponenten), nachvollziehbare Repobezeichnung basierend auf der Bezeichnung von diesem Repo.


## Sonstiges
Vergesst auch nicht die Rückgabe der ausgeliehenen Hardware 
- Zurückgesetzt, ohne persönliche Accounts
- Lauffähige Version kann nach Rücksprache auf dem Gerät verbleiben
- Entfernt aus alles Device-Portalen, z.B. bei Apple
- Kein eigen-gesetztes Passwort

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

----
**Im folgenden die Original-readME zum Einstieg in dieses Repo:**

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://code.fki.htw-berlin.de/cm/studierendenprojekte/bp-ws24_25-b3-feuerwehr.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://code.fki.htw-berlin.de/cm/studierendenprojekte/bp-ws24_25-b3-feuerwehr/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.
