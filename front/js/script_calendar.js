
//commentaire
if(typeof date!=='undefined'){
    delete date;
    delete months;
    delete dayFr;
    delete jour,mois,annee,journee;
    delete renderCalender;
    delete containerAppointment;
    delete btnAppointment;
    delete motifRdv;
    delete confirmAppointment;
    delete doctors;
    delete btnConfirmation;
    delete inputText;
    delete jsonDispo;
    delete nomdocteur;

}

var date=new Date();

var jour,mois,annee,journee;

var dayFr=[   "Dimanche",
                        "Lundi",
                        "Mardi",
                        "Mercredi",
                        "Jeudi",
                        "Vendredi",
                        "Samedi",
                    ];

var months=[
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Aout",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ];                    


var containerAppointment=document.querySelector(".container-hour-appointment");
var btnAppointment=Array.from(document.querySelectorAll(".btn-appointment"));
var motifRdv=document.getElementsByClassName(".motif-rdv");
var confirmAppointment=document.getElementsByClassName(".confirm-appointment");
var doctors=Array.from(document.querySelectorAll('.btn-doctor'));
var btnConfirm=document.getElementById("btn-confirm");
var inputText=document.querySelector('.motif-rdv input');
var jsonDispo;
var nomdocteur;



mois=new Date().getMonth();
jour=new Date().getDate();
annee=new Date().getYear();
journee=new Date(2022,mois,jour).getDay();




renderCalender=()=>{
        
        date.setDate(1);
        
        const monthDays=document.querySelector('.days');
        
        const lastDay=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
        
        const prevLastDay=new Date(date.getFullYear(),date.getMonth(),0).getDate();
        
        const firstDayIndex=date.getDay();
        
        const lastDayIndex=new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
        
        
        const nexdays=7-lastDayIndex-1;
        
        
        annee=new Date().getYear()-100;

        document.querySelector(".date h1").innerHTML
        =`${months[date.getMonth()]} ${ new Date().getYear()-100}`;// getYear()-100  car 021 renvoi 121 avec cette fonction
        
        
        
        document.querySelector(".date p").innerHTML
        =`${dayFr[journee]} ${jour} ${months[mois]} 20${annee}`;
        
        let days= "";
        
        for(let x=firstDayIndex;x>0;x--){
            days+=`<div class="prev-date">${prevLastDay-x+1}</div>`;
        }
        
        for( let i=1;i<=lastDay;i++){
            if(i===new Date().getDate() && date.getMonth()===new Date().getMonth()){
                days+=`<div class="date-current-month today">${i}</div>`;
            }else{
                days+=`<div class="date-current-month">${i}</div>`;
            }
        }
        
        for(let j=1; j<=nexdays;j++){
             days+=`<div class="next-date">${j}</div>`;
             
        }
        monthDays.innerHTML=days;
        }

function setdateCurrent(){
            if(typeof dateCurrent !=='undefined'){
                dateCurrent=''
            }else{
                var dateCurrent;
            }
            dateCurrent=[...document.querySelectorAll('.date-current-month')];
            let datep=document.querySelector('.date p');
            dateCurrent.forEach(d => {
                
                d.addEventListener('click',()=>{
                    dateCurrent.forEach(dc=>{
                        dc.classList.remove('activated')
                    })
                    d.classList.add('activated')
                    jour=d.innerText;
                    journee=new Date(2022,mois,jour).getDay();
                    datep.innerText=`${dayFr[journee]} ${jour} ${months[mois]} 20${annee}`;
                    containerAppointment.style.visibility='visible';
                    
                    
                });
                
            });
        }

document.querySelector('.prev').
addEventListener('click',()=>{
    date.setMonth(date.getMonth()-1);
    mois=date.getMonth();
    renderCalender();
    setdateCurrent();
})

document.querySelector('.next').
addEventListener('click',()=>{
    date.setMonth(date.getMonth()+1);
    mois=date.getMonth();
    renderCalender();
    setdateCurrent();
})

renderCalender();
setdateCurrent();

//Gestion des horaires rendez-vous




//Requete pour Afficher les docteurs disponible à la date et l'heure choisis.

function requeteDispoDocteur(jour,mois,annee,heure){
    let date="20"+annee+"-"+(mois+1)+"-"+jour;
    console.log(date);
    xhr.onreadystatechange=()=>{

        if(xhr.status==200 && xhr.readyState==4){
            
            jsonDispo=JSON.parse(xhr.responseText);

        }
    }
    xhr.open("POST","../../back/dispoDocteur.php",false);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("date="+date+"&heure="+heure);
};

//vérifie si la date et heure indiquée pour afficher disponiblité des Docteurs

function verifDateAndHour(){
    if(document.querySelector('.activated') && document.querySelector('.btn-activated')){
        return true;
    }else{
        return false;
    }
}

//Fonction qui affichera selon conditions les Docteurs disponible.
function affichageBtnDocteur(json){
    let doctorAvailable=document.querySelector(".doctor-available");
    console.log(doctorAvailable);
    doctorAvailable.style.visibility='visible';
    
    doctors.forEach(d=>{
        for(let i=0;i<json.length;i++){
            let test=`Dr ${json[i].nom}`;
            if(d.value==test){
                d.style.visibility="hidden";
                break;
            }else{
                d.style.visibility="visible";
            }
        }
        
    });
}

//Fonction qui affichera le input texte
function affichageText(){
    
    inputText.style.visibility="visible";
    btnConfirm.style.visibility="visible";
    
}

//Fonction enregistre RDV
function enregistreRDV(jour,mois,heure,nomdoc){
    console.log("activation");
    let date="20"+annee+"-"+(mois+1)+"-"+jour;
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200){
            console.log(xhr.responseText);
            jsonDispo=JSON.parse(xhr.responseText);
            alert("Rdv enregistré");
            location.reload();
        }
    }
    xhr.open("POST","../../back/insertRdv.php",false);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("date="+date+"&heure="+heure+"&nomdoc="+nomdoc);
}

btnAppointment.forEach(b=>{
    b.addEventListener('click',()=>{
        heure=b.value;
        console.log(b.value);
        btnAppointment.forEach(bt=>{
            bt.classList.remove("btn-activated")
        })
        b.classList.add("btn-activated")
        let bool=verifDateAndHour();
        if(bool){
            requeteDispoDocteur(jour,mois,annee,b.value);
            affichageBtnDocteur(jsonDispo);
        }else{
            alert("Choisir Date et Heure");
        }
        
    })
})

doctors.forEach(d=>{
    d.addEventListener('click',()=>{
        doctors.forEach(dc=>{
            dc.classList.remove("btn-activated")
        })
        d.classList.add("btn-activated")
        nomdocteur=d.value;
        affichageText();
    })
})

btnConfirm.addEventListener('click',()=>{
    if(inputText.value==''){
        alert("Veuillez saisir un motif.");
    }else{
        enregistreRDV(jour,mois,heure,nomdocteur);
    }
});

