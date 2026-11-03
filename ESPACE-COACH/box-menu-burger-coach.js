(() => {"use strict";
  window.LCDP_initialiserMenuBurgerCoach=async function(ctx){
    const slot=document.querySelector("[data-lcdp-burger-slot]");if(!slot)return;
    const r=await fetch(ctx.urlObjet("/BOX/02-box-menu-burger.html"),{credentials:"omit",cache:"no-cache"});if(!r.ok)throw Error("Menu burger indisponible.");
    const t=document.createElement("template");t.innerHTML=(await r.text()).trim();slot.replaceChildren(t.content.cloneNode(true));
    const bouton=slot.querySelector("[data-lcdp-burger-button]"),nav=slot.querySelector("[data-lcdp-burger-nav]"),liste=slot.querySelector("[data-lcdp-burger-list]");
    if(!bouton||!nav||!liste)throw Error("Menu burger incomplet.");nav.hidden=true;const fermer=()=>{nav.hidden=true;bouton.setAttribute("aria-expanded","false");};
    // Même ordre et mêmes libellés que le burger PARC ; accueil propre à COACH.
    const choix=[
      ["Accueil",ctx.urlEspace("/ESPACE-COACH/accueil-coach.html")],
      ["Déconnexion",null],
      ["Mon compte",null],
      ["Actualité La Clé du Parc",ctx.urlPublic("/ESPACE-PUBLIC/actualite.html")],
      ["Changer d’espace connecté",null]
    ];

    async function changerEspace(){
      const options=[
        {compte:"membre",label:"Espace MEMBRE",connexion:"/ESPACE-PUBLIC/connexion-membre.html?source=menu-mon-compte"},
        {compte:"parc",label:"Espace PARC",connexion:"/ESPACE-PUBLIC/connexion-parc.html?source=menu-mon-compte"},
        {compte:"coach",label:"Espace COACH",connexion:"/ESPACE-PUBLIC/connexion-coach.html?source=menu-mon-compte"}
      ];
      const fragment=await fetch(ctx.urlObjet("/BOX/02-box-dialogue-bouton.html"),{credentials:"omit",cache:"no-cache"});
      if(!fragment.ok)throw Error("Dialogue de changement de compte indisponible.");
      const slot=document.getElementById("lcdp-lightbox-slot");
      if(!slot)throw Error("Conteneur de dialogue indisponible.");
      const t=document.createElement("template");t.innerHTML=(await fragment.text()).trim();slot.replaceChildren(t.content.cloneNode(true));
      const dialogue=slot.querySelector("[data-lcdp-box-dialogue-bouton]");
      const titre=slot.querySelector("[data-lcdp-dialogue-title]");
      const texte=slot.querySelector("[data-lcdp-dialogue-text]");
      const actions=slot.querySelector("[data-lcdp-dialogue-actions]");
      const fermer=slot.querySelector("[data-lcdp-dialogue-close]");
      if(!dialogue||!titre||!texte||!actions||!fermer){slot.replaceChildren();throw Error("Dialogue de changement de compte incomplet.");}
      titre.textContent="Espace connecté";texte.textContent="Choisissez votre espace";actions.replaceChildren();
      let termine=false;
      function clore(){if(termine)return false;termine=true;slot.replaceChildren();return true;}
      fermer.addEventListener("click",clore,{once:true});
      dialogue.addEventListener("click",e=>{if(e.target===dialogue)clore();});
      const clavier=e=>{if(e.key==="Escape"){clore();document.removeEventListener("keydown",clavier);}};
      document.addEventListener("keydown",clavier);
      for(const option of options){
        const b=document.createElement("button");b.type="button";
        b.className="lcdp-button lcdp-button-compte lcdp-button-compte--"+option.compte;
        b.textContent=option.label;
        b.addEventListener("click",async()=>{
          if(!clore())return;document.removeEventListener("keydown",clavier);
          const config=window.SITE_CONFIG||{};
          const worker=String(config.workerUserRouteurUrl||config.WORKER_USER_ROUTEUR_URL||(typeof config.apiUrl==="function"?config.apiUrl("user-routeur-api"):"")).replace(/\/+$/,"");
          if(worker){
            try{
              const r=await fetch(worker,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({compte:option.compte})});
              if(r.ok){const d=await r.json().catch(()=>null);if(d?.redirectUrl){window.location.href=d.redirectUrl;return;}}
            }catch(e){console.error("Routeur utilisateur indisponible",e);}
          }
          window.location.href=ctx.urlPublic(option.connexion);
        },{once:true});
        actions.append(b);
      }
    }
    for(const [libelle,lien]of choix){const el=document.createElement(lien?"a":"button");el.className=lien?"lcdp-box-menu-burger__link":"lcdp-box-menu-burger__button-link";el.textContent=libelle;if(lien)el.href=lien;else{el.type="button";el.addEventListener("click",async()=>{fermer();if(libelle==="Mon compte"){await ctx.ouvrirAlerte("La page Mon compte de l’espace COACH sera créée prochainement.");return;}if(libelle==="Changer d’espace connecté"){await changerEspace();return;}if(libelle==="Déconnexion"){try{const r=await fetch(ctx.endpoint+"/logout",{method:"POST",credentials:"include",cache:"no-store"});const d=await r.json().catch(()=>null);if(!r.ok||d?.success!==true)throw Error();window.location.href=ctx.urlPublic("/ESPACE-PUBLIC/accueil-public.html");}catch{await ctx.ouvrirAlerte("La déconnexion n’a pas pu être confirmée.");}}});}liste.append(el);}
    bouton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();nav.hidden=!nav.hidden;bouton.setAttribute("aria-expanded",String(!nav.hidden));});
    nav.addEventListener("click",e=>e.stopPropagation());document.addEventListener("click",e=>{if(!slot.contains(e.target))fermer();});document.addEventListener("keydown",e=>{if(e.key==="Escape")fermer();});
  };
})();