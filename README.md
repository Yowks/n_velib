# n_velib
 
### Etape 1 : Vérifier si l'utilisateur est connecté ou pas
- Inclure une condition sur le router avant les routes, si l'user est log on continue, sinon on redirige sur la page de login.
- User enregistrer dans la base de donnée, pas de register



### Etape 2 : Création d'un appel API avec adresse ou coordonnées longitude/latitude en argument
- Créer une route API avec des parametres optionnels
    - /api/?adress=[adress]&coords=[L/l]
    - Créer des retours en fonction du résultat
        - 200 (trouvé un résultat)
        - 400 (pas de résultat)
        - 404 (erreur dans l'url)
    - Retour en JSON

- Commencer avec une route simple, si l'envie (et le temps) te vient, tu peut ajouter une clé [token] dans l'url pour sécuriser le tout
    - /api/[token]/?adress=[adress]



### Etape 3 : Visualisation des bornes vélib autour de notre position (pouvoir entrer une adresse à Paris) sur une carte.
- Utilisation de Mapbox (j'ai utiliser sur Hygie)
    - On ajoute leur plugin de recherche ou de clic, on récupère la long et lat qu'on envoie dans l'url de notre API pour ensuite récupérer le résultat qu'on 
    affichera sur la carte. (utilisation des sockets pour l'actualisation)