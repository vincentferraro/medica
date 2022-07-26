//Affiche rdv patient

//Fonctions pour DIV "Appointment"

//Créer balise img
function addImage(src){
    let img=document.createElement('img');
    img.src=src;
    return img;
}
//Créer balise ul et li

function addListUl(nom,date,heure){
    ul=document.createElement('ul');
    li1=document.createElement('li');
    li1.innerText="Dr "+nom;
    li2=document.createElement('li');
    li2.innerText=date;
    li3=document.createElement('li');
    li3.innerText=heure;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    return ul;
}
//Créer button Annuler
function addCancelButton(name){
    let input=document.createElement('input');
    input.classList.add('button-cancel');
    input.type="button";
    input.name=name;
    input.value="Annuler";
    return input
}
//Créer la DIV pour afficher le RDV

function createDiv(img,ul,button){
    let div=document.createElement('div');
    div.classList.add("appointment");
    div.appendChild(img);
    div.appendChild(ul);
    div.appendChild(button);
    return div;
}



//Requête AJAX pour récupérer les RDV en BDD
if(typeof xhr2!=='undefined'){
    delete xhr2,json3,btnCancel;
}
var xhr2=new XMLHttpRequest();
var json3;

function recuperationBDDrdvPatient(){
    
    xhr2.onreadystatechange=()=>{

        if(xhr2.readyState==4 && xhr2.status==200){
            
            json3=JSON.parse(xhr2.responseText);
            
        }
    }
    xhr2.open("GET","http://localhost:8888/MEDICA/back/affichageRdv.php",false)
    xhr2.send();
}
//Affiche les rdv sur la page vos_rdv.html
function affichageRdvPatient(){
    for(let i=0;i<json3.length;i++){
        console.log("test//")
        let img=addImage("../pictures/doctor-avatar-1.jpeg");
        let li=addListUl(json3[i].nom,json3[i].date,json3[i].heure);
        let button=addCancelButton(json3[i].id_rdv);
        let div=createDiv(img,li,button);
        document.getElementById('contain').appendChild(div);
    }
}





//Annule rdv Patient
//Variable

//Fonction
function annulationRDV(id_rdv){
    console.log("Annulation RDV");
    xhr2.onreadystatechange=()=>{
        if(xhr2.readyState==4 && xhr2.status==200){
            console.log(xhr2.responseText);
        }
    }
    xhr2.open("POST","http://localhost:8888/MEDICA/back/annuleRDV.php",false);
    xhr2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr2.send("id_rdv="+id_rdv);
};
//Evènement pour gérer chaque bouton crée

recuperationBDDrdvPatient();
affichageRdvPatient();

var btnCancel=Array.from(document.querySelectorAll('.button-cancel'));
btnCancel.forEach(b=>{
    b.addEventListener('click',()=>{
        annulationRDV(parseInt(b.name));
        alert("Rendez-vous annulé");
        window.location.reload();
    })
    
})