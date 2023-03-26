# Projet avec le framework HapiJS

## Pour démarrer le projet :

Après avoir cloné le repository, suivez les étapes suivantes :

1. Exécutez la commande ```npm install``` à partir d'un terminal dans le répertoire du projet.

2. Vous avez deux options au choix :

A. Configurez les variables d'environnement (voir l'étape 3)

B. Lancez le conteneur Docker avec la commande suivante : docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=toto -e MYSQL_DATABASE=user -d mysql:5. Ce conteneur sera la base de données du projet avec l'utilisateur root et le mot de passe toto.

3. Configuration des variables d'environnement : Créez un fichier ```.env``` à la racine du projet. Ajoutez-y les variables d'environnement suivantes. Si vous avez utilisé la commande Docker de l'étape précédente, vous n'avez pas besoin de configurer les variables d'environnement pour la base de données.
   Pour configurer les emails, vous pouvez aller à l'adresse suivante : https://ethereal.email/ et créer un nouveau compte. Cela vous donnera une configuration fonctionnelle.

```
API_KEY=your_api_key

DB_HOST=host_of_the_db
DB_USER=username_of_the_db
DB_PASSWORD=password_of_the_db
DB_DATABASE=name_of_the_db

MAIL_HOST=hosting_for_the_mail
MAIL_PORT=port_for_the_mail
MAIL_USER=sender_mail
MAIL_PASS=password_of_the_sender_mail
```

4. Démarrez le serveur avec la commande ```npm start```

À partir de ce moment, vous pouvez accéder aux différentes méthodes de l'API en allant à l'adresse suivante : http://localhost:3000/documentation.
------