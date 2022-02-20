var token;
var identifiant;
var password;
var url;
var pages = ['connexion', 'formulaire'];

function display(page) {
    pages.forEach((value) => {
        if (value == page) {
            document.getElementById(value).hidden = false
        } else if (value != page) {
            document.getElementById(value).hidden = true
        }
    })
}

function connexion() {
    identifiant=document.getElementById("nom_utilisateur").value;
    password=document.getElementById("motdepasse").value;
    url=document.getElementById("url").value;
    dossier=document.getElementById("dossier").value;

    console.log('identfiant: ' +identifiant);
    console.log('motdepasse: '+ password);
    console.log('url: '+ url);
    console.log('dossier: ' +dossier);
    getToken(identifiant, password);

};

function getToken (identifiant, password) {
var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function() 
    {
        if (this.status == 200 & this.readyState == 4) 
        {
            //Use parse() method to convert JSON string to JSON object
            console.log('succes!', xmlhttp);
            console.log('succes!', xmlhttp.response);
            var responseObject= JSON.parse(xmlhttp.response);
            window.token = responseObject.success.token;
            console.log('token: '+ token);
            display("formulaire");

        }
        else {
            alert('Mauvais mot de passe ou identifiant');
            display('connexion');
        }

        
    };

    xmlhttp.open('GET', 'http://' + url + dossier + '/api/index.php/login?login=' + identifiant + '&password='+ password);
    xmlhttp.send();
};

function getInvoices (){

    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onload = function() {

        if (this.status >= 200 && this.status < 500 ) 
        {
            //Use parse() method to convert JSON string to JSON object
            console.log('succes!', xmlhttp2.responseText);
        };

    };
xmlhttp2.open('GET', 'http://'+ url + dossier + '/api/index.php/bankaccounts/1/lines');
console.log("Chaine string token : " + token);
//xmlhttp2.setRequestHeader("DOLAPIKEY", "H5sgp362Y98poZIKbQLqSM53t4Tv9xMn");
xmlhttp2.setRequestHeader("DOLAPIKEY", token);
xmlhttp2.send();

};


function postInvoices () {
    var date = new Date (document.getElementById("date").value);
    console.log("date:"+ date);
    var timeStamp = date.getTime() /1000;
    console.log("time:"+timeStamp);
    var libelle = document.getElementById("libelle").value;
    var montant = document.getElementById("montant").value;
    var mode_reglement = document.getElementById("mode_reglement").value;
    var sens = document.getElementsByClassName("sens").value;

    var xmlhttp3 = new XMLHttpRequest();
    xmlhttp3.onload = function () {
        if (this.status >= 200 && this.status < 500) 
        {
            //Use parse() method to convert JSON string to JSON object
            console.log('succes!', xmlhttp3.responseText);
        };
    };
xmlhttp3.open('POST', 'http://'+ url + dossier + '/api/index.php/bankaccounts/1/lines');
xmlhttp3.setRequestHeader("Content-Type", "application/json");
xmlhttp3.setRequestHeader("DOLAPIKEY",  window.token);
xmlhttp3.send('{"date": "'+ timeStamp + '","label": "' + libelle + '", "amount" : "' 
+ parseInt(montant) + '", "type" :"' + mode_reglement + '", "sens":"' + sens +'"}');
};



//  Photo to show from selected file
function readURL(input) {
	if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
					$('#showSelectedImage')
                            .attr('src', e.target.result)
                            .show()
                    ;
			};

			reader.readAsDataURL(input.files[0]);
	}
}
