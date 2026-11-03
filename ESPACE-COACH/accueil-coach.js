(() => {
  "use strict";
  const role="coach", c=window.SITE_CONFIG||{};
  const base=(kind,path)=>{const fn=c[kind+"Url"];if(typeof fn==="function")return fn(path);const root=String(c[kind+"BaseUrl"]||c[kind.toUpperCase()+"_BASE"]||"").replace(/\/+$/,"");return root+"/"+String(path).replace(/^\/+/,"");};
  const urlEspace=p=>base(role,p),urlPublic=p=>base("public",p),urlObjet=p=>base("objet",p);
  const endpoint=String(c["workerConnexion"+role.charAt(0).toUpperCase()+role.slice(1)+"Url"]||c["WORKER_CONNEXION_COACH_URL"]||(typeof c.apiUrl==="function"?c.apiUrl("connexion-coach-api"):"")).replace(/\/+$/,"");
  const attendre=document.getElementById("lcdp-accueil-attente"), contenu=document.getElementById("lcdp-accueil-contenu"),erreur=document.getElementById("lcdp-accueil-erreur");
  const redirection=()=>window.location.replace(urlPublic("/ESPACE-PUBLIC/connexion-coach.html?source=accueil-coach&session=inactive"));
  function arreterAttente(){attendre.hidden=true;attendre.style.display="none";}
  async function getFragment(url){const r=await fetch(url,{cache:"no-cache",credentials:"omit"});if(!r.ok)throw Error("Composant indisponible : "+url);const template=document.createElement("template");template.innerHTML=(await r.text()).trim();return template.content.cloneNode(true);}
  async function chargerScript(url){if(document.querySelector(`script[data-lcdp-src="${url}"]`))return;await new Promise((resolve,reject)=>{const script=document.createElement("script");script.src=url;script.dataset.lcdpSrc=url;script.onload=resolve;script.onerror=()=>reject(Error("Script introuvable"));document.body.appendChild(script);});}
  function appliquerRoutes(root){root.querySelectorAll("[data-site-href]").forEach(x=>{const p=x.dataset.siteHref;x.href=x.dataset.space===role?urlEspace(p):urlPublic(p);});root.querySelectorAll("[data-site-src]").forEach(x=>{const p=x.dataset.siteSrc;x.src=urlObjet(p.replace(/^\/?OBJET\//,"/"));});}
  async function ouvrirAlerte(message){const slot=document.getElementById("lcdp-lightbox-slot");try{slot.replaceChildren(await getFragment(urlObjet("/BOX/02-box-alerte.html")));const texte=slot.querySelector("[data-lcdp-alerte-message]"), ok=slot.querySelector("[data-lcdp-alerte-ok]"), ferme=slot.querySelector("[data-lcdp-alerte-close]");if(!texte||!ok||!ferme)throw Error();texte.textContent=message;await new Promise(resolve=>{let done=false;const fin=()=>{if(done)return;done=true;slot.replaceChildren();resolve();};ok.addEventListener("click",fin,{once:true});ferme.addEventListener("click",fin,{once:true});slot.querySelector("[data-lcdp-box-alerte]")?.addEventListener("click",e=>{if(e.target===e.currentTarget)fin();});});}catch{slot?.replaceChildren();window.alert(message);}}
  async function chargerBandeau(){const slot=document.getElementById("lcdp-bandeau-slot");slot.replaceChildren(await getFragment(urlEspace("/ESPACE-COACH/box-bandeau-nav-coach.html")));appliquerRoutes(slot);await chargerScript(urlEspace("/ESPACE-COACH/box-menu-burger-coach.js"));await window["LCDP_initialiserMenuBurger"+role.charAt(0).toUpperCase()+role.slice(1)]?.({endpoint,urlEspace,urlPublic,urlObjet,ouvrirAlerte,redirection});}
  async function chargerFooter(){const slot=document.getElementById("lcdp-footer-slot");slot.replaceChildren(await getFragment(urlObjet("/BOX/02-box-footer.html")));appliquerRoutes(slot);}
  const PICTOGRAMMES_ACCUEIL = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="7" y="7" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="10.85" y="7" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="14.7" y="7" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="7" y="10.85" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="10.85" y="10.85" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="14.7" y="10.85" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="7" y="14.7" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="10.85" y="14.7" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
  <rect x="14.7" y="14.7" width="2.3" height="2.3" rx="0.4" fill="currentColor"/>
</svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 8.5h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 15.5h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    '<img src="data:image/webp;base64,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" alt="" aria-hidden="true">'
  ];
  let actionAccueilEnCours = false;
  function afficherAttenteNavigation() {
    const indicateur = document.getElementById("lcdp-navigation-attente");
    const slot = document.getElementById("lcdp-menu-central-slot");
    if (indicateur) {
      if (indicateur.parentElement !== document.body) document.body.appendChild(indicateur);
      const styles = {
        position: "fixed", inset: "0", width: "100%", height: "100dvh",
        minHeight: "100vh", zIndex: "2147483647", boxSizing: "border-box",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", background: "var(--lcdp-color-surface, #fff)",
        padding: "16px"
      };
      for (const [propriete, valeur] of Object.entries(styles)) {
        indicateur.style.setProperty(propriete.replace(/[A-Z]/g, lettre => "-" + lettre.toLowerCase()), valeur, "important");
      }
      indicateur.hidden = false;
    }
    slot?.setAttribute("aria-busy", "true");
    slot?.querySelectorAll(".lcdp-accueil-actions > button").forEach(b => { b.disabled = true; });
  }
  function masquerAttenteNavigation() {
    actionAccueilEnCours = false;
    const indicateur = document.getElementById("lcdp-navigation-attente");
    const slot = document.getElementById("lcdp-menu-central-slot");
    if (indicateur) { indicateur.hidden = true; indicateur.style.removeProperty("display"); }
    slot?.setAttribute("aria-busy", "false");
    slot?.querySelectorAll(".lcdp-accueil-actions > button").forEach(b => { b.disabled = false; });
  }
  window.addEventListener("pageshow", event => { if (event.persisted) masquerAttenteNavigation(); });
  function afficherMessageAccueil(prenom) {
    const element = document.getElementById("message-accueil-coach");
    if (!element) return;
    const premiereLigne = document.createTextNode("Votre compte La Clé du Parc");
    const sautLigne = document.createElement("br");
    const deuxiemeLigne = document.createElement("span");
    deuxiemeLigne.textContent = prenom ? "Bonjour " + String(prenom).trim().slice(0,60) : "Bonjour";
    deuxiemeLigne.style.fontWeight = "400";
    element.replaceChildren(premiereLigne,sautLigne,deuxiemeLigne);
    const mention = document.getElementById("mention-statut-coach");
    if (mention) mention.textContent = "ESPACE COACH";
  }
  async function monterCoach() {
    const slot = document.getElementById("lcdp-menu-central-slot");
    slot.classList.add("lcdp-stack");
    slot.replaceChildren(await getFragment(urlObjet("/BOX/02-box-menu-bouton.html")));
    const liste = slot.querySelector("[data-lcdp-menu-bouton-list]");
    if (!liste) throw Error("Menu central indisponible.");
    liste.classList.add("lcdp-accueil-actions");
    const boutons = [
      {label:"Planifier",classe:"orange"},
      {label:"Mes accès",classe:"green"},
      {label:"Ma Clé",classe:"blue"}
    ];
    boutons.forEach((item,index) => {
      const b=document.createElement("button");
      b.type="button";
      b.className="lcdp-button lcdp-button-accueil lcdp-button-accueil-"+item.classe+" lcdp-accueil-picto";
      b.innerHTML=PICTOGRAMMES_ACCUEIL[index];
      const t=document.createElement("span");
      t.textContent=item.label;
      b.appendChild(t);
      b.addEventListener("click",async()=>{
        if(actionAccueilEnCours)return;
        actionAccueilEnCours=true;
        // Cette action COACH est encore informative : aucune navigation à attendre.
        try { await ouvrirAlerte("La fonction « "+item.label+" » sera raccordée lors du développement de l’espace COACH."); }
        catch(error) { console.error(error); }
        finally { masquerAttenteNavigation(); }
      });
      liste.appendChild(b);
    });
  }
  async function monterParc(){const slot=document.getElementById("lcdp-menu-central-slot");slot.replaceChildren(await getFragment(urlObjet("/BOX/04-box-liste-card.html")));const root=slot.querySelector("[data-lcdp-box-liste-card]");const liste=slot.querySelector("[data-lcdp-liste-card-list]");if(!liste)throw Error("Liste des parcs indisponible.");root.classList.add("lcdp-box-liste-card--encadree");slot.querySelector("[data-lcdp-liste-card-title]").textContent="Mes parcs";
   const r=await fetch(endpoint+"/parcs",{method:"GET",credentials:"include",cache:"no-store",headers:{Accept:"application/json"}});if(r.status===401){redirection();return;}const d=await r.json().catch(()=>null);if(!r.ok||d?.success!==true||!Array.isArray(d.parcs))throw Error("Impossible de charger les parcs associés à votre compte.");
   if(d.parcs.length===0){const msg=slot.querySelector("[data-lcdp-liste-card-message]");msg.hidden=false;msg.textContent="Aucun parc associé à ce compte à ce jour.";return;}
   for(const parc of d.parcs){const card=document.createElement("button");card.type="button";card.className="lcdp-parc-card";const visuel=document.createElement("span");visuel.className="lcdp-parc-card__visuel";visuel.textContent="Visuel recto à connecter";const titre=document.createElement("span");titre.className="lcdp-parc-card__nom";titre.textContent=parc.nomparccontact||"Parc associé";card.append(visuel,titre);card.addEventListener("click",()=>ouvrirAlerte("La page de gestion de ce parc sera créée après raccordement des fiches parcs."));liste.append(card);}
  }
  async function demarrer() {
    if (!endpoint) { arreterAttente(); erreur.hidden=false; return; }
    try {
      // Keep the COACH-specific session validation; never copy the member endpoint.
      const r=await fetch(endpoint+"/session",{credentials:"include",cache:"no-store"});
      if(r.status===401){redirection();return;}
      const d=await r.json().catch(()=>null);
      if(!r.ok||d?.success!==true||!d.id)throw Error("Session de votre espace indisponible.");
      afficherMessageAccueil(d.prenomcoach || d.prenom || "");
      // Header and footer must not prevent main content from opening.
      chargerBandeau().catch(e=>console.warn("Bandeau coach indisponible",e));
      chargerFooter().catch(e=>console.warn("Footer indisponible",e));
      await monterCoach();
      contenu.hidden=false;
      contenu.setAttribute("aria-busy","false");
      arreterAttente();
    }catch(e){console.error("Erreur accueil coach",e);arreterAttente();erreur.hidden=false;}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",demarrer,{once:true});else demarrer();
})();