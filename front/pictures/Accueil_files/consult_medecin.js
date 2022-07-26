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


//EvenListener exécutant l'affichage des horaires disponible d'un médecin

var btnDoctor=Array.from(document.querySelectorAll(".btn-doctor"));
var calendar=document.querySelector(".calendar");
var iddoc;

btnDoctor.forEach(bt=>{
    bt.addEventListener('click',()=>{
        calendar.style.visibility='visible';
        console.log(bt.id)
        iddoc=bt.id;
        btnDoctor.forEach(btd=>{
            btd.classList.remove('activated');

        })
        bt.classList.add('activated');
    })
})

//Fonction AJAX pour récupérer les plages horaires disponible du médecin selectionné

var jsonDoc;
var xhr5=new XMLHttpRequest();

function requeteAjaxDispoDoc(jour,mois,annee,iddoc){
    let date="20"+annee+"-"+(mois+1)+"-"+jour;
    xhr5.onreadystatechange=()=>{

        if(xhr5.readyState==4 && xhr5.status==200){
                console.log(xhr5.responseText);
                jsonDoc=Array.from(JSON.parse(xhr5.responseText));
        }
    }
    xhr5.open("POST","http://localhost:8888/MEDICA/back/consultMedBDD.php",true);
    xhr5.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr5.send("date="+date+"&iddoc="+iddoc);
}

//Affichez les horaires disponible après click médecin et choix de date sur calendrier

var horaires=Array.from(document.querySelectorAll(".btn-appointment"));

function affichageHorairesDispoDoc(){
    horaires.forEach(h=>{
        jsonDoc.forEach(j=>{
            if(h.value==j.heure){
                h.style.visibility='hidden';
            }
        })
        
    })
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
                    requeteAjaxDispoDoc(jour,mois,annee,iddoc)
                    affichageHorairesDispoDoc();
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




 