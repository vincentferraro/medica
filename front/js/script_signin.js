//Permet de vérifier que les champs ne sont pas vides.

let login=document.getElementById('login');
let pass=document.getElementById('pass');
let btnvalid=document.getElementById('btn-valid');
let warningDiv=document.getElementById('warning-message');
let xhr=new XMLHttpRequest();
let json;
function verifRemplissage(){
    let bool=false;
    if(login.value==''){
        login.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        login.classList.remove('warning');
    };
    if(pass.value==''){
        pass.classList.add('warning');
        warningDiv.style.visibility='visible';
        warningDiv.innerText='Champ vide(s), merci de remplir tous les champs';
        bool=true;
    }else{
        pass.classList.remove('warning');
    };
    return bool;
}

function connexionAjax(){
    
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            console.log(xhr.responseText)
           json=JSON.parse(xhr.responseText);
           traitementJsonAjax(json);
        }
    }
    xhr.open("POST","back/signIN.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("login="+login.value+"&pass="+pass.value);
}

function traitementJsonAjax(json){
    if(json.bool==true){
        open("front/html/accueil.html","_self");

    }else{
        warningDiv.style.visibility='visible';
        warningDiv.innerHTML=json.motif;
    }

}

btnvalid.addEventListener('click',()=>{
    let bool=verifRemplissage();
    console.log(bool);
    connexionAjax()
    
})