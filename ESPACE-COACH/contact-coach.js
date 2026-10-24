(() => {
 "use strict";
 const configuration = {
  "id": "formulaire-contact-coach",
  "ariaLabel": "Demande d’inscription coach",
  "titre": "Coach",
  "sousTitre": "Rejoignez le réseau",
  "sousTitreClasse": "lcdp-box-formulaire__subtitle--accent",
  "validationNative": true,
  "champs": [
    {
      "type": "text",
      "id": "nomcoach",
      "name": "nomcoach",
      "label": "NOM",
      "required": true,
      "validationNative": true,
      "maxlength": 120,
      "autocomplete": "family-name"
    },
    {
      "type": "text",
      "id": "prenomcoach",
      "name": "prenomcoach",
      "label": "Prénom",
      "required": true,
      "validationNative": true,
      "maxlength": 120,
      "autocomplete": "given-name"
    },
    {
      "type": "email",
      "id": "emailcoach",
      "name": "emailcoach",
      "label": "Adresse mail",
      "required": true,
      "validationNative": true,
      "maxlength": 254,
      "autocomplete": "email"
    },
    {
      "type": "tel",
      "id": "telcoach",
      "name": "telcoach",
      "label": "Ligne directe",
      "required": true,
      "validationNative": true,
      "maxlength": 120,
      "autocomplete": "tel"
    },
    {
      "type": "text",
      "id": "metiercoach",
      "name": "metiercoach",
      "label": "Activité(s)",
      "required": true,
      "validationNative": true,
      "maxlength": 240
    },
    {
      "type": "text",
      "id": "dptmtcoach",
      "name": "dptmtcoach",
      "label": "Département de référence",
      "required": true,
      "validationNative": true,
      "maxlength": 3,
      "inputmode": "text",
      "placeholder": "Exemple 41, 2A ou 971"
    }
  ],
  "bouton": {
    "type": "submit",
    "label": "Envoyer ma demande",
    "style": "lcdp-button-secondary"
  },
  "noteHtml": "Cette demande ne crée pas d’accès à l’espace privé. Notre équipe vous recontacte pour étudier votre inscription."
};
 window.LCDP_initialiserContactCoach = async function() {
  const form=await window.LCDP_creerFormulaire("formulaire-coach-slot",configuration);
  const endpoint=window.SITE_CONFIG?.workerContactCoachUrl || "https://lacleduparc.fr/api/contact-coach";
  await window.LCDP_brancherFormulaireProtege(form,{type:"coach",endpoint,champs:configuration.champs});
 };
})();
