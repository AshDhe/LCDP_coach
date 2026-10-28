(() => {
 "use strict";
 const configuration = {
  "id": "formulaire-contact-coach",
  "ariaLabel": "Formulaire de contact",
  "titre": "Formulaire de contact",
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
      "placeholder": "Exemple 08"
    }
  ],
  "bouton": {
    "type": "submit",
    "label": "Envoyer ma demande",
    "style": "lcdp-button-secondary"
  },
  "introHtml": `<div class="lcdp-box-formulaire__note">Cette demande ne crée pas de compte coach. Notre équipe vous recontacte pour étudier votre demande.</div>
    <section class="lcdp-boxtext__content" aria-labelledby="contact-coach-compte-title">
      <h2 id="contact-coach-compte-title" class="lcdp-text-strong-left">Le compte COACH La Clé du Parc</h2>
      <ul>
        <li>Présentez votre activité et votre territoire de référence (département).</li>
        <li>Organisez pour vos clients des moments d'exception dans le réseau des parcs.</li>
      </ul>
    </section>`
};
 window.LCDP_initialiserContactCoach = async function() {
  const form=await window.LCDP_creerFormulaire("formulaire-coach-slot",configuration);
  const endpoint=window.SITE_CONFIG?.workerContactCoachUrl || "https://lacleduparc.fr/api/contact-coach";
  await window.LCDP_brancherFormulaireProtege(form,{type:"coach",endpoint,champs:configuration.champs});
 };
})();
