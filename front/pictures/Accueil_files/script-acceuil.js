//Utilisation des fonctions en bas de page//


//script permettant de recharger le script puisque ajout de script lors de l'appel de la page appointment.html

function load_jsCalendar()
{
   let head= document.getElementsByTagName('head')[0];
   let script= document.createElement('script');
   script.src= '../js/script_calendar.js';
   script.id='script_call';
   head.appendChild(script);
}
function load_jsRdv()
{
   let head= document.getElementsByTagName('head')[0];
   let script= document.createElement('script');
   script.src= '../js/vosrdv_script.js';
   script.id='script_call2';
   head.appendChild(script);
}
function load_consultMedecin()
{
   let head= document.getElementsByTagName('head')[0];
   let script= document.createElement('script');
   script.src= '../js/consult_medecin.js';
   script.id='script_call3';
   head.appendChild(script);
}

//Variable générales pour modifier les informations via reqûete AJAX

let section=document.getElementById("section");
let xhr=new XMLHttpRequest();

//Requête AJAX pour afficher les informations du patient sur son espace privé

let json;
let json1;
let jsonUser=Array.from(document.querySelectorAll('.user-json'));



//cette variable permet d'afficher les informations concernant RDV, prendre RDV et Consulter Médecin

let xhr1=new XMLHttpRequest();

function updateAccueil(){
    
    xhr1.onreadystatechange=function(){
        
        if(xhr1.readyState==4 && xhr1.status==200){
            
            console.log(xhr1.responseText);
            json1=JSON.parse(xhr1.responseText);
            jsonUser[0].innerText=json1.nom;
            jsonUser[1].innerText=json1.prenom;
            jsonUser[2].innerText=json1.mail;
            jsonUser[3].innerText=json1.telephone;
            console.log(json)
        }
        else{
            console.log("Pb fonction")
            console.log(xhr1.status)
            console.log(xhr1.readyState)
            
        }
    };
    xhr1.open("GET","http://localhost:8888/MEDICA/back/accueilBDD.php",false);
    xhr1.send();
}

//Affiche les informations de la requête sur la page d'accueil

jsonUser.forEach((p)=>{
    console.log(p.innerHTML);
});

//Affiche la page RDV

function affichageRdvAccueil(){

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            section.innerHTML=xhr.responseText
            section.className="section-vosrdv";
            load_jsRdv();
        }
    }
    xhr.open("GET","http://localhost:8888/MEDICA/front/html/vosrdv.html",false);
    xhr.send();
}






//Requête AJAX pour modifier la page lors du clique sur "Vos rendez-vous", "Prendre Rendez vous", "consulter médecin"

//Variable des boutons pour créer les évènements

let btnVosRdv=document.getElementById('vrdv');
let btnPrendreRdv=document.getElementById('prdv');
let btnConsulterMedecin=document.getElementById('cm');
let scriptcal;


//Evènement 'click' pour déclencher une fonction permettant de modifier la page

btnPrendreRdv.addEventListener('click',()=>{
    
        if(scriptcal!=undefined){
            scriptcal.parentNode.removeChild(scriptcal);
            scriptcal=undefined;
        }
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
                    section.innerHTML=xhr.responseText;
                    section.className="section-appointment";
                    load_jsCalendar();
                    scriptcal=document.getElementById('script_call');
                }
        }
        xhr.open("GET","http://localhost:8888/MEDICA/front/html/appointment.html",false);
        xhr.send();
        
        
    
    
    
});

//Affiche RDV sur la page accueil voir vosrdv.html

btnVosRdv.addEventListener('click',()=>{
    let script=document.getElementById("script-call")
    console.log('click');
    xhr.onreadystatechange=function(){
        if(xhr.readyState==3){
            console.log("Début 3 sec");
            setTimeout(()=>{
                console("attente en cours");
            },3000)
            console.log("Fin")
        }
        console.log(this.status+"+"+this.readyState)
        if(xhr.readyState==4 && xhr.status==200){
            section.innerHTML=xhr.responseText;
            section.className="section-vosrdv";
            load_jsRdv();
        }
    }
    xhr.open("GET","http://localhost:8888/MEDICA/front/html/vosrdv.html",false);
    xhr.send();
});

//Permet de consulter la disponibilité d'un médecin voir consultation_medecin.html

btnConsulterMedecin.addEventListener('click',()=>{
    console.log("click");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            section.innerHTML=xhr.responseText;
            section.className="section-consulter-medecin";
            load_consultMedecin();
        }
    }
    xhr.open("GET","http://localhost:8888/MEDICA/front/html/consultation_medecin.html",false);
    xhr.send();
});



//Utilisation des fonctions//

updateAccueil();
affichageRdvAccueil();