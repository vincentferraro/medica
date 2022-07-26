/*Le script vérifie si chaque champ est bien rempli puis envoyer
les informations par une requête AJAX au serveur. Le serveur répondra
si oui ou non l'identifiant est enregistré dans ce cas renvoyé vers
page index.html sinon affichage d'une erreur de champ
*/

//variable

let nom=document.getElementById('nom');
let prenom=document.getElementById('prenom');
let mail=document.getElementById('mail');
let telephone=document.getElementById('telephone');
let login=document.getElementById('login');
let pass=document.getElementById('pass');
let btnSubmit=document.getElementById('btn-submit');
let warningDiv=document.getElementById('warning-message');
let field=Array.from(document.getElementsByClassName('field'));
let form=document.getElementById('form-signup');
let xhr=new XMLHttpRequest();
let json;

//Fonction lors du 'click' btn-submit//



function verificationRemplissage(){
    let bool=false;
    if(nom.value==''){
        nom.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ(s) vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        nom.classList.remove('warning');
    }
    if(prenom.value==''){
        prenom.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        prenom.classList.remove('warning');
    }
    if(mail.value==''){
        mail.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ(s) vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        mail.classList.remove('warning');
    }
    if(telephone.value==''){
        telephone.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ(s) vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        telephone.classList.remove('warning');
    }
    if(login.value==''){
        login.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ(s) vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        login.classList.remove('warning');
    }
    if(pass.value==''){
        pass.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ(s) vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        pass.classList.remove('warning');
    }
    return bool
};

/*
function verifRemplissage(){
    for(let f in field){
        console.log(f.classList.add('warning'));
    }
};*/

function connexionAjax(){
    
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
           console.log(xhr.responseText)
           json=JSON.parse(xhr.responseText);
           traitementJsonAjax(json);
        }
    }
    xhr.open("POST","../../back/signupBDD.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("nom="+nom.value+"&prenom="+prenom.value+"&mail="+mail.value+"&telephone="+telephone.value+"&login="+login.value+"&pass="+pass.value);
};

function traitementJsonAjax(json){
    if(json.bool==true){
        console.log(json);
        warningDiv.style.visibility='visible';
        warningDiv.classList.remove('warning');
        warningDiv.classList.add('valid');
        warningDiv.innerHTML=json.motif;
        setTimeout(window.location.href="../html/first.html",50000);
    }else{
        console.log(json);
        warningDiv.style.visibility='visible';
        warningDiv.innerHTML=json.motif;
    }

}


btnSubmit.addEventListener('click',(event)=>{
    let bool=verificationRemplissage();
    if(bool==true){
        event.preventDefault()
    }else{
        connexionAjax();
    }
});