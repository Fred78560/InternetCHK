exports.action = function(data) {

    var url = 'http://www.google.fr/';

    console.log(url);
    var request = require('request');
    request({ 'uri': url }, function(err, response, body) {

        if (err || response.statusCode != 200) {
            JarvisIASpeech("Pas de connexion internet");
        } else {
            JarvisIASpeech("La connexion fonctionne correctement.");
        }
    });

}

exports.cron = function(task) {
    var url = 'http://www.google.fr/';

    var fs = require('fs');
    fs.exists('./plugins/InternetCHK/stat.txt', function(exists) {
        var Statt = fs.createWriteStream('./plugins/InternetCHK/stat.txt');
        Statt.end();
    });
    var etat;
    etat = fs.readFileSync("./plugins/InternetCHK/stat.txt", "UTF-8");
    console.log("CRON contenu fichier etat.txt = " + etat);

    console.log(url);
    var request = require('request');
    request({ 'uri': url }, function(err, response, body) {

        if (err || response.statusCode != 200) {
            if (etat != "NOK") {
                fs.writeFileSync("./plugins/InternetCHK/stat.txt", "NOK", "UTF-8");
                JarvisIASpeech("Pas de connexion internet");
                return;
            }
        } else {
            if (etat != "OK") {
                fs.writeFileSync("./plugins/InternetCHK/stat.txt", "OK", "UTF-8");
                JarvisIASpeech("La connexion fonctionne correctement ");
                return;
            }
        }
    });
}