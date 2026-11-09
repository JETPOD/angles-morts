/* Les biais qui transmettent : contenu pédagogique.
   Scénarios fictifs. Chaque débriefing renvoie à des sources publiques vérifiables. */

const SOURCES = {
  sf2h_ps: { name: "SF2H, Actualisation des précautions standard, 2017", url: "https://www.sf2h.net/publications/actualisation-des-precautions-standard.html" },
  sf2h_ps_pdf: { name: "SF2H, Précautions standard, texte des 32 recommandations", url: "https://www.santepubliquefrance.fr/sites/default/files/rdd/document/HY_XXV_PS_versionSF2H.pdf" },
  who_gloves: { name: "OMS, Fiche d'information sur l'usage des gants", url: "https://cdn.who.int/media/docs/default-source/integrated-health-services-(ihs)/infection-prevention-and-control/hand-hygiene/tools/glove-use-information-leaflet.pdf?sfvrsn=13670aa_10" },
  gloves_nt: { name: "Nursing Times, Does glove use increase the risk of infection? (2014)", url: "https://cdn.ps.emap.com/wp-content/uploads/sites/3/2014/09/240914-Does-glove-use-increase-the-risk-of-infection.pdf" },
  who_5m: { name: "OMS, Ressources clés sur l'hygiène des mains (5 indications)", url: "https://www.who.int/campaigns/world-hand-hygiene-day/key-resources-on-hand-hygiene" },
  banja: { name: "Banja J., The normalization of deviance in healthcare delivery, Bus Horiz 2010", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2821100/" },
  selfreport: { name: "Hygiène des mains observée et déclarée chez les IDE et médecins, 2026", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13051545/" },
  sf2h_cath: { name: "SF2H, Prévention des infections liées aux cathéters périphériques, 2019", url: "https://www.sf2h.net/publications/prevention-des-infections-liees-aux-catheters-peripheriques-vasculaires-et-sous-cutanes-mai-2019.html" },
  sf2h_cath_pdf: { name: "SF2H 2019, texte des recommandations cathéters périphériques", url: "https://www.sf2h.net/k-stock/data/uploads/2019/05/HY_XXVII_SF2H_CATHETERS-2019.pdf" },
  idle: { name: "Facteurs associés aux cathéters périphériques inutilisés, BMC Res Notes 2026", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13262077/" },
  hcsp_bhre: { name: "HCSP, Actualisation des recommandations BHRe, 2019", url: "https://www.hcsp.fr/explore.cgi/avisrapportsdomaine?clefr=758" },
  schwappach: { name: "Schwappach et Gehring, Silence that can be dangerous, PLoS One 2014", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0104720" },
  speakup: { name: "Programme Speaking Up for Safety et hygiène des mains, 2018", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6132482/" },
  croskerry: { name: "Croskerry P., Cognitive errors in diagnosis, Acad Med 2003", url: "https://pubmed.ncbi.nlm.nih.gov/12915363/" },
  has_diag: { name: "HAS, Erreurs diagnostiques en médecine, rapport 2024", url: "https://www.has-sante.fr/upload/docs/application/pdf/2024-11/rapport_erreurs_diagnostiques_medecine.pdf" },
  has_tunnel: { name: "HAS, L'effet tunnel en santé, 2023", url: "https://www.has-sante.fr/upload/docs/application/pdf/2023-06/l-effet-tunnel-en-sante-comment-en-venir-a-bout.pdf" },
  idsa_asb: { name: "IDSA, Bactériurie asymptomatique, recommandations 2019", url: "https://www.idsociety.org/news--publications-new/articles/2019/BACTERIA-IN-URINE-DOESNT-ALWAYS-INDICATE-INFECTION/" },
  has_atb: { name: "HAS, Choix et durées d'antibiothérapies préconisées", url: "https://has-sante.fr/jcms/p_3278764/fr/choix-et-durees-d-antibiotherapies-preconisees-dans-les-infections-bacteriennes-courantes" },
  saposnik: { name: "Saposnik et al., Cognitive biases and medical decisions, BMC 2016", url: "https://link.springer.com/article/10.1186/s12911-016-0377-1" },
  srigley: { name: "Srigley et al., Effet Hawthorne et hygiène des mains, BMJ Qual Saf 2014", url: "https://qualitysafety.bmj.com/content/23/12/974" },
  has_m5: { name: "HAS/OMS, Apprendre à partir des erreurs (biais rétrospectif)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2015-12/cours_module_5.pdf" },
  has_fh: { name: "HAS, Référentiel de compétences en facteurs humains, 2026", url: "https://www.has-sante.fr/upload/docs/application/pdf/2026-04/dir1/referentiel_de_competences_en_facteurs_humains_au_service_de_la_qualite_et_la_securite_des_soins_competences_non_techniques.pdf" },
  has_saed: { name: "HAS, Saed : communication entre professionnels", url: "https://www.has-sante.fr/jcms/c_1776178/fr/saed-un-guide-pour-faciliter-la-communication-entre-professionnels-de-sante" },
  has_secu: { name: "HAS, Comprendre la sécurité du patient", url: "https://www.has-sante.fr/jcms/c_2582468/fr/comprendre-la-securite-du-patient" }
};

/* Le deck des 15 biais. */
const BIASES = {
  licence: { name: "Effet de licence", tag: "Fausse protection", def: "Après un geste « vertueux », on s'autorise inconsciemment un relâchement ailleurs. En hygiène, l'équipement de protection crée un sentiment de sécurité qui fait sauter d'autres barrières.", ipc: "Gants portés en continu, friction oubliée au retrait." },
  deviance: { name: "Normalisation de la déviance", tag: "Dérive collective", def: "Un écart répété sans conséquence visible finit par devenir la norme du groupe. Plus personne ne le perçoit comme un écart.", ipc: "Alliance, montre, manches longues tolérées « depuis toujours »." },
  optimisme: { name: "Biais d'optimisme", tag: "Illusion de supériorité", def: "Chacun s'estime meilleur que la moyenne et moins exposé au risque que les autres. L'auto-évaluation surestime systématiquement la performance réelle.", ipc: "« Moi, je fais la friction à chaque fois. »" },
  sunk: { name: "Coût irrécupérable", tag: "Ce qui a coûté", def: "On maintient une décision parce qu'on y a déjà investi du temps ou des efforts, même quand elle n'est plus utile.", ipc: "Cathéter gardé « parce qu'il a été difficile à poser »." },
  conformisme: { name: "Conformisme social", tag: "Preuve sociale", def: "Face à l'incertitude, on copie ce que fait le groupe, surtout quand on est nouveau. Le comportement majoritaire devient la référence implicite.", ipc: "Personne ne met de tablier dans cette chambre, donc moi non plus." },
  autorite: { name: "Gradient d'autorité", tag: "Hiérarchie", def: "Plus l'écart hiérarchique est grand, moins on ose signaler un écart, et plus on suppose que la personne la plus gradée sait ce qu'elle fait.", ipc: "Silence devant le senior qui enchaîne les patients sans friction." },
  ancrage: { name: "Ancrage", tag: "Première impression", def: "On s'accroche à la première hypothèse et on ajuste insuffisamment quand de nouvelles informations arrivent. Souvent associé à la clôture prématurée.", ipc: "« Fièvre, donc pneumopathie », sans examiner le point de ponction." },
  action: { name: "Biais d'action", tag: "Faire quelque chose", def: "Préférence pour l'intervention plutôt que l'abstention, même quand ne rien faire est la meilleure option. Agir rassure le soignant.", ipc: "ECBU puis antibiotique pour une bactériurie asymptomatique." },
  dispo: { name: "Biais de disponibilité", tag: "Ce qui vient à l'esprit", def: "On juge la probabilité d'un risque à la facilité avec laquelle des exemples viennent à l'esprit. Le spectaculaire et le récent occupent toute la place.", ipc: "Obsédé par le pathogène de l'actualité, on oublie la BHRe." },
  resultat: { name: "Biais de résultat", tag: "Ça s'est bien passé", def: "On juge la qualité d'une pratique par son résultat plutôt que par sa justesse. L'absence d'incident visible renforce une mauvaise habitude.", ipc: "« Je fais comme ça depuis trois ans, jamais de problème. »" },
  hawthorne: { name: "Effet Hawthorne", tag: "Être observé", def: "Les comportements s'améliorent quand on se sait observé. Un audit annoncé mesure surtout ce que l'équipe fait devant l'auditeur.", ipc: "92 % de conformité le jour de l'audit annoncé." },
  retro: { name: "Biais rétrospectif", tag: "C'était évident", def: "Une fois le résultat connu, l'événement paraît prévisible. On surestime ce que les acteurs pouvaient savoir sur le moment.", ipc: "« L'IDE aurait dû voir que c'était une épidémie. »" },
  confirmation: { name: "Biais de confirmation", tag: "Chercher ce qu'on croit", def: "On recherche, retient et interprète les informations qui confirment son hypothèse, et on néglige celles qui la contredisent.", ipc: "Enquêter seulement sur la piste qu'on soupçonne déjà." },
  statuquo: { name: "Biais de statu quo", tag: "On a toujours fait comme ça", def: "Préférence pour la situation existante. Le changement est perçu comme une perte et un risque, le maintien comme neutre.", ipc: "Garder la douchette de rinçage des bassins malgré les recommandations." },
  dilution: { name: "Dilution de responsabilité", tag: "Quelqu'un d'autre le fera", def: "Plus il y a d'intervenants, plus chacun suppose qu'un autre a agi. Une tâche partagée par tous n'appartient à personne.", ipc: "Transfert d'un porteur de BHRe sans information de l'établissement d'aval." }
};

const MODULES = [
  {
    id: 1, code: "M1", title: "Au plus près du soin", audience: "IDE et aides-soignants", time: "10 min",
    intro: "Une journée en médecine polyvalente. Cinq situations ordinaires, cinq biais à démasquer. À vous de les repérer avant qu'ils ne transmettent.",
    scenes: [
      {
        place: "Médecine polyvalente, chambre 12", hour: "07 h 40",
        title: "La paire de gants",
        story: "Sophie, aide-soignante expérimentée, réalise le change de M. D., incontinent. Sans retirer ses gants, elle refait le lit, remonte l'adaptable, puis aide le voisin de chambre à attraper son verre d'eau. Elle retire ses gants dans le couloir et prend directement le chariot suivant.",
        clues: [
          { k: "Ce qu'elle pense", v: "« J'ai mes gants, je suis protégée, et lui aussi. »" },
          { k: "Ce qu'on observe", v: "Les mêmes gants touchent la zone souillée, le linge propre, puis l'environnement d'un autre patient." },
          { k: "Ce qui manque", v: "Aucune friction au retrait des gants, ni avant le patient suivant." }
        ],
        answer: "licence", choices: ["licence", "conformisme", "dispo", "sunk"],
        wrong: {
          conformisme: "Rien n'indique ici qu'elle copie un collègue. Le moteur est individuel : le sentiment de protection donné par les gants.",
          dispo: "Il n'y a pas de cas marquant ou récent qui oriente son jugement. Cherchez du côté de ce que les gants lui font croire.",
          sunk: "Elle n'a rien investi qu'elle chercherait à rentabiliser. Le gant lui donne surtout une impression de sécurité."
        },
        parades: [
          { t: "Afficher au chariot la règle « un soin, une paire, une friction » et faire des points flash de 5 minutes sur les indications réelles des gants.", s: 2, fb: "C'est la parade la plus solide : elle rappelle la règle au moment du geste et corrige la croyance (le gant protège le soignant d'un liquide biologique, il ne remplace jamais la friction)." },
          { t: "Rappeler à Sophie, en entretien individuel, qu'elle doit être plus rigoureuse.", s: 1, fb: "Utile mais insuffisant : le biais est partagé par beaucoup de soignants et revient dès que la pression monte. Il faut une aide au moment du geste." },
          { t: "Mettre des gants à disposition dans chaque chambre pour qu'on en porte davantage.", s: 0, fb: "Contre-productif : multiplier les gants renforce l'illusion de protection. Les précautions standard limitent le port de gants au risque d'exposition à un liquide biologique." }
        ],
        debrief: {
          facts: "Dans une étude citée par le Nursing Times, l'usage des gants était inutile dans 58 % des épisodes observés, et un risque de contamination croisée apparaissait dans 37 % des épisodes avec gants.",
          rule: "Les précautions standard 2017 limitent le port de gants au risque d'exposition aux liquides biologiques, et demandent de les mettre juste avant le geste et de les retirer juste après. Pour l'OMS, le port de gants ne modifie ni ne remplace jamais les indications de friction.",
          take: "Le gant protège la main du soignant, pas le patient suivant.",
          src: ["gloves_nt", "sf2h_ps_pdf", "who_gloves"]
        }
      },
      {
        place: "Médecine polyvalente, poste de soins", hour: "09 h 15",
        title: "L'alliance de Karim",
        story: "Pendant les transmissions, la nouvelle cadre remarque que la moitié de l'équipe porte une alliance et une montre au poignet. Karim, IDE depuis douze ans, sourit : « Ici tout le monde la garde, on n'a jamais eu de souci. Même les anciennes cadres ne disaient rien. »",
        clues: [
          { k: "Ce qu'on entend", v: "« On n'a jamais eu de souci. »" },
          { k: "Depuis quand", v: "Des années, avec l'accord tacite des encadrements successifs." },
          { k: "Ce qui a changé", v: "Rien. Seul le regard extérieur de la nouvelle cadre rend l'écart visible." }
        ],
        answer: "deviance", choices: ["deviance", "autorite", "action", "optimisme"],
        wrong: {
          autorite: "Il n'y a pas ici de senior qu'on n'ose pas contredire. L'écart est porté par tout le groupe, dans la durée.",
          action: "Personne ne cherche à « faire quelque chose ». Au contraire, c'est une habitude installée qui n'est plus questionnée.",
          optimisme: "Il y a un peu d'optimisme dans « jamais eu de souci », mais le mécanisme central est collectif : l'écart est devenu la norme du service."
        },
        parades: [
          { t: "Expliquer le pourquoi (les bijoux empêchent une friction efficace), fixer une date de mise en conformité avec l'équipe et suivre l'observance des prérequis en audit.", s: 2, fb: "La normalisation se défait en rendant l'écart à nouveau visible, en expliquant la raison de la règle et en installant un suivi collectif, sans stigmatiser une personne." },
          { t: "Afficher l'affiche « zéro bijou » de la SF2H au poste de soins.", s: 1, fb: "Bon point de départ, mais une affiche seule s'intègre vite au décor. Sans échange ni suivi, la norme du groupe reste plus forte que l'affiche." },
          { t: "Laisser faire : si personne n'a eu d'infection, c'est que le risque est faible.", s: 0, fb: "C'est exactement le raisonnement qui nourrit la normalisation de la déviance : l'absence d'incident visible n'est pas une preuve de sécurité." }
        ],
        debrief: {
          facts: "Banja décrit comment des écarts répétés sans conséquence immédiate deviennent des pratiques « normales », rationalisées et transmises aux nouveaux arrivants. Ne pas se laver les mains suffisamment ou ne pas changer de gants font partie des exemples d'écarts courants qu'il cite.",
          rule: "Les précautions standard 2017 posent des prérequis à l'hygiène des mains : avant-bras dégagés, ongles courts sans vernis, aucun bijou, y compris l'alliance.",
          take: "« On a toujours fait comme ça » ne prouve rien, à part la durée de l'écart.",
          src: ["banja", "sf2h_ps"]
        }
      },
      {
        place: "Salle de pause", hour: "12 h 30",
        title: "Le questionnaire",
        story: "L'EOH a diffusé un questionnaire anonyme. À la question « Dans quel pourcentage des indications réalisez-vous une friction ? », la moyenne de l'équipe est de 95 %. Un audit par observation directe, réalisé le mois précédent, retrouvait 48 %. En salle de pause, on s'étonne : « L'audit devait tomber un mauvais jour. »",
        clues: [
          { k: "Déclaré", v: "95 % en moyenne, beaucoup répondent 100 %." },
          { k: "Observé", v: "48 % lors de l'audit du mois précédent." },
          { k: "Ce qu'on entend", v: "« L'audit devait tomber un mauvais jour. »" }
        ],
        answer: "optimisme", choices: ["optimisme", "hawthorne", "retro", "statuquo"],
        wrong: {
          hawthorne: "L'effet Hawthorne gonflerait plutôt le score observé. Ici, c'est le score déclaré qui est beaucoup plus haut que la réalité.",
          retro: "Personne ne réécrit un événement passé à la lumière de son issue. Le problème est la perception de sa propre performance.",
          statuquo: "Il n'est pas question ici d'un changement refusé. C'est l'écart entre ce qu'on croit faire et ce qu'on fait."
        },
        parades: [
          { t: "Présenter côte à côte les chiffres déclarés et observés en réunion d'équipe, sans jugement, puis faire choisir à l'équipe une indication prioritaire à améliorer.", s: 2, fb: "Confronter la perception aux données, de façon bienveillante et collective, est le meilleur antidote à l'illusion de supériorité. Le choix d'une cible par l'équipe renforce l'appropriation." },
          { t: "Remplacer les audits par l'auto-évaluation, plus rapide et mieux acceptée.", s: 0, fb: "L'auto-évaluation surestime fortement l'observance : elle ne peut pas servir de mesure principale." },
          { t: "Refaire un audit pour vérifier que le premier n'était pas un mauvais jour.", s: 1, fb: "Répéter la mesure est légitime, mais si l'objectif est de prouver que l'audit avait tort, on entretient le biais. Mieux vaut l'utiliser pour discuter de l'écart." }
        ],
        debrief: {
          facts: "Dans deux hôpitaux américains, les infirmiers déclaraient une friction dans 95,1 % des situations recommandées, contre 46,2 % observés. Les médecins déclaraient 91,0 % pour 82,8 % observés.",
          rule: "L'auto-évaluation ne doit pas être la méthode principale de mesure de l'observance. Elle sert surtout à ouvrir la discussion sur l'écart entre perception et réalité.",
          take: "Nous sommes tous convaincus d'être dans la bonne moitié. Les données servent à le vérifier.",
          src: ["selfreport", "who_5m"]
        }
      },
      {
        place: "Médecine polyvalente, chambre 7", hour: "14 h 10",
        title: "Le cathéter si difficile",
        story: "Mme L., 84 ans, capital veineux très pauvre. Il a fallu quatre tentatives aux urgences pour poser son cathéter veineux périphérique. Ses traitements sont passés per os depuis 48 heures. Au tour de 14 h, sa collègue propose de le retirer. Lucie, IDE, hésite : « Il a été tellement dur à poser… on le garde au cas où. »",
        clues: [
          { k: "Usage", v: "Aucune perfusion ni injection depuis 48 heures." },
          { k: "Ce qu'on entend", v: "« Il a été tellement dur à poser. »" },
          { k: "Dossier", v: "Pas d'indication écrite au maintien, pas de date de retrait prévue." }
        ],
        answer: "sunk", choices: ["sunk", "licence", "ancrage", "dilution"],
        wrong: {
          licence: "Il n'y a pas de geste protecteur qui autoriserait un relâchement. La justification porte sur l'effort déjà fourni.",
          ancrage: "On pourrait parler de « au cas où », mais le cœur de l'argument est l'investissement passé : quatre tentatives qu'on ne veut pas « perdre ».",
          dilution: "Une collègue propose justement d'agir. Le frein vient du coût déjà investi dans la pose."
        },
        parades: [
          { t: "Réévaluer chaque jour l'indication de chaque cathéter avec une question simple dans les transmissions : « Ce cathéter sert-il aujourd'hui ? » et le retirer si la réponse est non.", s: 2, fb: "La réévaluation quotidienne et tracée transforme la décision en critère objectif. Elle neutralise l'argument de l'effort passé, qui ne dit rien de l'utilité future." },
          { t: "Le garder, mais refaire le pansement pour diminuer le risque.", s: 1, fb: "Un pansement propre est utile, mais le risque infectieux reste lié à la présence même du cathéter. Un dispositif inutile reste un risque inutile." },
          { t: "Le garder jusqu'à la sortie au cas où il faudrait une voie en urgence.", s: 0, fb: "C'est le cathéter « au cas où », fortement associé aux cathéters inutilisés. Si une voie devient nécessaire, une nouvelle indication sera posée." }
        ],
        debrief: {
          facts: "Dans une enquête de prévalence publiée en 2026, 29,7 % des cathéters périphériques étaient inutilisés. La pose « au cas où » était fortement associée à ce statut (OR ajusté 7,76).",
          rule: "La SF2H recommande fortement de retirer le cathéter veineux périphérique dès qu'il n'est plus utile.",
          take: "L'effort de la pose est derrière nous. Le risque, lui, est devant.",
          src: ["idle", "sf2h_cath", "sf2h_cath_pdf"]
        }
      },
      {
        place: "Chambre 3, précautions complémentaires contact", hour: "16 h 45",
        title: "La nouvelle et le tablier",
        story: "Inès, IDE arrivée lundi, prend en charge un patient porteur d'une entérobactérie productrice de carbapénémase. Elle s'apprête à mettre un tablier pour la toilette au lit. Deux collègues entrent devant elle, sans tablier : « On fait vite, c'est juste une toilette. » Inès repose le tablier et les suit.",
        clues: [
          { k: "Ce qu'elle sait", v: "Elle a appris que la toilette est un soin mouillant et souillant." },
          { k: "Ce qu'elle voit", v: "Deux collègues plus expérimentées entrent sans tablier." },
          { k: "Ce qu'elle ressent", v: "La peur de paraître trop scolaire dès sa première semaine." }
        ],
        answer: "conformisme", choices: ["conformisme", "autorite", "deviance", "optimisme"],
        wrong: {
          autorite: "Les collègues ne sont pas des supérieures hiérarchiques. Inès copie le groupe pour s'y intégrer : c'est la preuve sociale.",
          deviance: "La normalisation de la déviance explique le comportement des collègues. Mais la question porte sur Inès, qui abandonne sa bonne pratique pour suivre le groupe.",
          optimisme: "Inès ne se croit pas moins exposée. Elle connaît la règle et y renonce pour se conformer."
        },
        parades: [
          { t: "Mettre son tablier et le dire simplement : « Je le mets pour la toilette, c'est la règle pour les BHRe. » Puis signaler l'écart au référent hygiène du service.", s: 2, fb: "Appliquer la règle soi-même crée un contre-modèle visible, et le signalement permet d'agir sur la norme du groupe, ce que personne ne peut faire seul." },
          { t: "Suivre ses collègues aujourd'hui et en parler plus tard à la cadre.", s: 1, fb: "En parler est utile, mais le soin d'aujourd'hui s'est fait sans protection. Le conformisme gagne encore une fois." },
          { t: "Ne rien dire pour s'intégrer : les collègues savent ce qu'elles font.", s: 0, fb: "C'est le mécanisme qui fait entrer chaque nouvel arrivant dans la déviance du groupe. Banja décrit précisément cette socialisation." }
        ],
        debrief: {
          facts: "Banja décrit l'exposition des nouveaux arrivants à des écarts présentés comme normaux, puis leur socialisation : on intègre le groupe en adoptant ses pratiques.",
          rule: "Le HCSP recommande d'appliquer les précautions standard lors des soins directs d'un porteur de BHRe, notamment le tablier pour les soins souillants et mouillants, l'hygiène des mains et la gestion des excreta.",
          take: "Le premier qui applique la règle donne aux autres la permission de la suivre.",
          src: ["hcsp_bhre", "banja"]
        }
      }
    ]
  },
  {
    id: 2, code: "M2", title: "Décider vite, décider juste", audience: "Médecins et internes", time: "10 min",
    intro: "Visite, urgences, prescriptions. Les biais du raisonnement clinique pèsent aussi sur le risque infectieux. Cinq dossiers pour les débusquer.",
    scenes: [
      {
        place: "Chirurgie viscérale, visite du matin", hour: "08 h 30",
        title: "La visite du professeur",
        story: "La visite enchaîne huit patients. Le chef de service ausculte, palpe un abdomen, passe au lit voisin sans friction. Derrière lui, l'interne et l'externe se regardent. Le flacon de produit hydroalcoolique est sur le chariot. Personne ne dit rien. À la sortie, l'externe confie : « Il sait sûrement ce qu'il fait. »",
        clues: [
          { k: "Ce qu'on voit", v: "Aucune friction entre les patients, sur toute la visite." },
          { k: "Ce qu'on entend", v: "« Il sait sûrement ce qu'il fait. »" },
          { k: "Le contexte", v: "Visite en groupe, patient éveillé, tension de la hiérarchie." }
        ],
        answer: "autorite", choices: ["autorite", "conformisme", "resultat", "dilution"],
        wrong: {
          conformisme: "L'interne et l'externe ne copient pas forcément le geste. Ils se taisent devant un supérieur : c'est la hiérarchie qui bloque la parole.",
          resultat: "Personne n'invoque ici l'absence d'incident. Le silence vient de la position du chef.",
          dilution: "Il y a plusieurs témoins, mais le frein dominant est la hiérarchie, qui rend la parole coûteuse."
        },
        parades: [
          { t: "Convenir en début de visite d'une règle commune et d'une phrase neutre : « On fait une friction ? », que n'importe qui peut prononcer, y compris envers le chef.", s: 2, fb: "Une phrase convenue à l'avance, soutenue par l'encadrement, rend la parole légitime et moins coûteuse. C'est le principe des programmes de speak-up." },
          { t: "Attendre la fin de la visite pour en parler à l'EOH.", s: 1, fb: "Le signalement est utile pour agir sur la culture du service, mais les huit patients de la visite ne sont pas protégés." },
          { t: "Ne rien dire : contredire le chef devant un patient nuirait à la relation de soin.", s: 0, fb: "C'est l'arbitrage décrit par les soignants interrogés par Schwappach : le risque relationnel est surévalué, le risque infectieux sous-évalué." }
        ],
        debrief: {
          facts: "Dans une étude par vignettes auprès de 1 013 soignants, 45 à 81 % seulement signaleraient une friction oubliée, contre 74 à 96 % pour une erreur de prescription. Les scénarios les moins susceptibles de déclencher une parole étaient ceux d'un médecin senior oubliant la friction.",
          rule: "Après un programme structuré de speak-up, un hôpital américain a maintenu l'observance de l'hygiène des mains au-dessus de 95 % pendant 20 mois.",
          take: "Une friction proposée n'est pas une remise en cause, c'est une sécurité partagée.",
          src: ["schwappach", "speakup"]
        }
      },
      {
        place: "Chirurgie viscérale, J5 post-opératoire", hour: "11 h 00",
        title: "Fièvre à J5",
        story: "M. R., 67 ans, colectomie, fébrile à 38,9 °C à J5. Il tousse un peu. L'interne de garde de la nuit a noté « probable pneumopathie d'inhalation ». Le matin, l'interne du service relit la note, prescrit une radiographie et une antibiothérapie probabiliste. La voie centrale posée au bloc n'est pas examinée. Le pansement date de six jours.",
        clues: [
          { k: "Note de la nuit", v: "« Probable pneumopathie d'inhalation. »" },
          { k: "Ce qui n'est pas fait", v: "Pas d'examen du point d'insertion, pas d'hémocultures appariées." },
          { k: "Indice négligé", v: "Pansement de voie centrale daté de J-6, légèrement décollé." }
        ],
        answer: "ancrage", choices: ["ancrage", "action", "dispo", "confirmation"],
        wrong: {
          action: "Prescrire vite relève du biais d'action, mais le cœur du problème est ailleurs : on part de l'hypothèse de la nuit sans l'interroger.",
          dispo: "Aucun cas marquant ou récent n'oriente le choix. L'hypothèse vient de la première note écrite.",
          confirmation: "Le biais de confirmation est souvent associé, mais ici l'erreur initiale est de se fixer sur la première hypothèse transmise. C'est l'ancrage."
        },
        parades: [
          { t: "Faire une pause diagnostique devant toute fièvre chez un patient porteur de dispositif : lister systématiquement les portes d'entrée possibles (poumon, urine, site opératoire, cathéters) et examiner chacune.", s: 2, fb: "La liste forcée des hypothèses concurrentes est une stratégie de forçage cognitif décrite par Croskerry et la HAS : elle oblige à sortir de la première idée." },
          { t: "Demander un avis infectiologique pour toute fièvre post-opératoire.", s: 1, fb: "Un second regard aide, mais il n'est pas toujours disponible et ne remplace pas le réflexe d'examiner soi-même toutes les portes d'entrée." },
          { t: "Élargir le spectre de l'antibiothérapie pour couvrir toutes les causes possibles.", s: 0, fb: "Élargir le spectre ne remplace pas le diagnostic. Le cathéter resterait en place et la source ne serait pas contrôlée." }
        ],
        debrief: {
          facts: "Dans les événements indésirables avec effet tunnel analysés par la HAS, l'ancrage était présent dans 87 % des cas, la clôture prématurée dans 80 % et le biais de confirmation dans 58 %.",
          rule: "Croskerry propose la métacognition comme parade principale : prendre du recul sur son propre raisonnement et envisager les alternatives avant de conclure.",
          take: "Quand le diagnostic est posé, la réflexion s'arrête. Sauf si on l'oblige à continuer.",
          src: ["has_tunnel", "croskerry", "has_diag"]
        }
      },
      {
        place: "Gériatrie aiguë", hour: "15 h 20",
        title: "La confusion de Mme P.",
        story: "Mme P., 88 ans, sonde urinaire depuis cinq jours, est plus confuse ce matin. Apyrétique, pas de douleur. La bandelette urinaire est positive. La famille s'inquiète. L'interne demande un ECBU, qui revient à E. coli 10⁵. « On ne peut pas la laisser comme ça » : il prescrit une antibiothérapie de sept jours.",
        clues: [
          { k: "Clinique", v: "Confusion isolée, sans fièvre ni signe urinaire ou lombaire." },
          { k: "Ce qu'on entend", v: "« On ne peut pas la laisser comme ça. »" },
          { k: "Non recherché", v: "Déshydratation, fécalome, rétention, médicaments, douleur." }
        ],
        answer: "action", choices: ["action", "ancrage", "sunk", "resultat"],
        wrong: {
          ancrage: "Il y a un raccourci vers l'urine, mais la phrase clé est « on ne peut pas la laisser comme ça » : agir pour soulager l'inquiétude.",
          sunk: "Rien n'a été investi qu'on chercherait à rentabiliser. C'est la pression à agir qui domine.",
          resultat: "Aucun résultat passé n'est invoqué. Le moteur est le besoin immédiat de faire quelque chose."
        },
        parades: [
          { t: "Ne pas faire d'ECBU sans signe clinique d'infection urinaire, rechercher d'abord les autres causes de confusion, et expliquer à la famille pourquoi on ne traite pas une bactériurie asymptomatique.", s: 2, fb: "C'est la démarche recommandée : la confusion isolée du sujet âgé relève le plus souvent d'autres causes. L'abstention argumentée est une décision active, pas une inaction." },
          { t: "Traiter, mais réduire la durée à trois jours.", s: 1, fb: "Réduire la durée limite l'exposition aux antibiotiques, mais la bactériurie asymptomatique n'a pas d'indication de traitement chez ce patient." },
          { t: "Traiter systématiquement toute bandelette positive chez le patient sondé, par précaution.", s: 0, fb: "C'est l'exact inverse des recommandations : chez le patient sondé, la bactériurie est fréquente et son traitement favorise l'antibiorésistance et les infections à Clostridioides difficile." }
        ],
        debrief: {
          facts: "Les recommandations IDSA 2019 déconseillent de dépister ou de traiter la bactériurie asymptomatique, notamment chez la personne âgée et chez le patient sondé. La confusion et l'odeur des urines sont le plus souvent liées à d'autres causes.",
          rule: "Le traitement inutile de la bactériurie asymptomatique est reconnu comme un contributeur majeur du mésusage des antibiotiques et de l'émergence de résistances.",
          take: "Ne pas prescrire est aussi une décision. Elle mérite d'être expliquée.",
          src: ["idsa_asb", "has_atb"]
        }
      },
      {
        place: "Service d'accueil des urgences", hour: "19 h 05",
        title: "La une des journaux",
        story: "Depuis une semaine, les médias parlent d'un pathogène émergent spectaculaire dans un pays lointain. Aux urgences, chacun demande « voyage en zone tropicale ? ». M. T., 72 ans, admis pour une chute, répond non. L'interne note « pas de voyage à risque ». Dans le courrier, on lit pourtant qu'il a été hospitalisé cinq jours en Grèce il y a quatre mois pour une fracture. Aucun dépistage n'est prévu.",
        clues: [
          { k: "Question posée", v: "« Voyage en zone tropicale ? »" },
          { k: "Dans le courrier", v: "Hospitalisation de cinq jours à l'étranger il y a quatre mois." },
          { k: "Le contexte", v: "Une semaine de couverture médiatique intense sur un pathogène rare." }
        ],
        answer: "dispo", choices: ["dispo", "ancrage", "confirmation", "optimisme"],
        wrong: {
          ancrage: "Ce n'est pas une première impression sur ce patient qui est en cause. C'est l'actualité qui oriente la question posée à tous.",
          confirmation: "On ne cherche pas à confirmer une hypothèse sur M. T. La question elle-même est façonnée par ce qui vient facilement à l'esprit.",
          optimisme: "L'interne ne se croit pas moins exposé. Le risque saillant de l'actualité éclipse un risque fréquent mais discret."
        },
        parades: [
          { t: "Intégrer au dossier d'admission une question standardisée « hospitalisation de plus de 24 heures à l'étranger dans l'année ? », avec alerte vers le dépistage BHRe et l'EOH.", s: 2, fb: "Une question structurée et systématique ne dépend plus de ce qui vient à l'esprit ce jour-là. Le HCSP insiste sur le repérage des patients ayant un lien avec l'étranger dès l'admission." },
          { t: "Former les internes sur la BHRe lors du prochain séminaire.", s: 1, fb: "La formation est utile, mais quand l'actualité occupe l'esprit, seul un outil systématique résiste au biais." },
          { t: "Renforcer encore le questionnaire sur le pathogène de l'actualité.", s: 0, fb: "C'est nourrir le biais : on concentre l'attention sur le risque spectaculaire au détriment du risque fréquent." }
        ],
        debrief: {
          facts: "La HAS définit le biais de disponibilité comme le fait de lier à tort la probabilité d'un diagnostic à la facilité avec laquelle des exemples viennent à l'esprit. La revue de Saposnik associe ce biais à des erreurs diagnostiques.",
          rule: "Le HCSP recommande d'identifier dès l'admission les patients à risque de portage de BHRe, dont ceux ayant été hospitalisés à l'étranger, avec dépistage et précautions adaptées.",
          take: "Ce qui fait la une n'est pas ce qui remplit les chambres.",
          src: ["has_diag", "saposnik", "hcsp_bhre"]
        }
      },
      {
        place: "Urgences, box 4", hour: "23 h 50",
        title: "Les hémocultures de Julien",
        story: "Julien, interne, pose un cathéter périphérique et prélève des hémocultures sur la même ponction. Après l'antiseptique alcoolique, il repalpe la veine du doigt, gant non stérile, et pique sans attendre le séchage. Son co-interne s'étonne. « Je fais comme ça depuis trois ans, je n'ai jamais eu de problème. »",
        clues: [
          { k: "Ce qu'on voit", v: "Palpation après antisepsie, ponction avant séchage." },
          { k: "Ce qu'on entend", v: "« Jamais eu de problème. »" },
          { k: "Ce qu'il ne voit pas", v: "Il ne reçoit jamais de retour sur les flacons contaminés de ses prélèvements." }
        ],
        answer: "resultat", choices: ["resultat", "deviance", "licence", "autorite"],
        wrong: {
          deviance: "C'est une habitude installée, mais l'argument avancé est individuel : il juge sa pratique à l'absence d'incident qu'il perçoit.",
          licence: "L'antiseptique pourrait donner un sentiment de sécurité, mais sa justification porte sur l'issue perçue de ses prélèvements passés.",
          autorite: "Il n'y a pas d'enjeu hiérarchique ici. Julien évalue sa pratique par ses résultats apparents."
        },
        parades: [
          { t: "Organiser un retour d'information régulier du laboratoire sur les taux de contamination des hémocultures du service et l'associer à une check-list courte : antisepsie, séchage, pas de palpation sans gant stérile.", s: 2, fb: "Le biais de résultat prospère sans retour d'information. Rendre visible la contamination et standardiser le geste permet de juger la pratique sur sa justesse." },
          { t: "Lui demander de faire plus attention la prochaine fois.", s: 1, fb: "C'est un premier pas, mais sans données, il continuera à penser que sa pratique « marche »." },
          { t: "Lui faire confiance : trois ans sans problème, c'est une preuve d'efficacité.", s: 0, fb: "C'est le cœur du biais : l'absence d'incident perçu n'est pas une preuve, surtout quand les contaminations ne lui sont jamais rapportées." }
        ],
        debrief: {
          facts: "Un flacon contaminé expose à une antibiothérapie inutile, des examens supplémentaires et une hospitalisation prolongée. Le préleveur n'en a généralement aucun retour, ce qui entretient l'illusion d'une bonne pratique.",
          rule: "La SF2H recommande d'attendre le séchage spontané complet de l'antiseptique avant l'acte invasif, et de porter des gants stériles si le site doit être palpé après l'antisepsie.",
          take: "« Ça s'est bien passé » n'est pas la même chose que « c'était bien fait ».",
          src: ["sf2h_cath_pdf", "croskerry"]
        }
      }
    ]
  },
  {
    id: 3, code: "M3", title: "Piloter le risque", audience: "Cadres, EOH et CLIN", time: "10 min",
    intro: "Audits, investigations, retours d'expérience, organisation. Les biais ne s'arrêtent pas au lit du patient : ils influencent aussi ceux qui pilotent le risque.",
    scenes: [
      {
        place: "Bureau de la cadre de pôle", hour: "10 h 00",
        title: "92 % de conformité",
        story: "L'audit d'hygiène des mains a été annoncé trois semaines à l'avance. Résultat : 92 % de conformité, le meilleur score de l'établissement. La cadre propose de présenter l'unité comme exemplaire au CLIN. Pourtant, la consommation de produits hydroalcooliques de l'unité est l'une des plus basses du pôle.",
        clues: [
          { k: "Méthode", v: "Audit annoncé, auditeur visible, une seule journée." },
          { k: "Score", v: "92 % de conformité observée." },
          { k: "Donnée discordante", v: "Consommation de produits hydroalcooliques parmi les plus basses du pôle." }
        ],
        answer: "hawthorne", choices: ["hawthorne", "optimisme", "confirmation", "statuquo"],
        wrong: {
          optimisme: "Ce n'est pas une auto-évaluation : le score vient d'une observation. Mais une observation visible change les comportements observés.",
          confirmation: "On retient bien le bon chiffre, mais le phénomène principal tient à la méthode : être observé améliore la pratique le temps de l'audit.",
          statuquo: "Il n'est pas question de refuser un changement. Le problème est la validité de la mesure."
        },
        parades: [
          { t: "Croiser plusieurs indicateurs : observation sur des périodes variées et non annoncées, consommation de produits hydroalcooliques, retours des patients. Présenter le score avec ses limites.", s: 2, fb: "Aucune mesure n'est parfaite. La triangulation permet de détecter l'effet d'observation et d'interpréter le score avec prudence." },
          { t: "Abandonner les audits, puisqu'ils sont biaisés.", s: 0, fb: "L'observation directe reste la méthode de référence pour évaluer les indications. Il s'agit de corriger ses biais, pas de renoncer à mesurer." },
          { t: "Présenter le 92 % au CLIN, en précisant que l'audit était annoncé.", s: 1, fb: "Mentionner la limite est honnête, mais sans donnée complémentaire, le CLIN risque de surestimer la situation de l'unité." }
        ],
        debrief: {
          facts: "Avec un système de localisation en temps réel, Srigley et al. ont mesuré un taux de friction environ trois fois plus élevé aux distributeurs visibles par l'auditeur (3,75 par heure) qu'aux mêmes distributeurs la semaine précédente (1,07).",
          rule: "Un score d'audit mesure ce que fait l'équipe sous observation. Il doit être interprété avec d'autres indicateurs.",
          take: "Quand on regarde, on change ce qu'on regarde.",
          src: ["srigley", "who_5m"]
        }
      },
      {
        place: "Salle de réunion, enquête EOH", hour: "14 h 00",
        title: "La piste de l'intérimaire",
        story: "Trois infections à Clostridioides difficile en dix jours dans le même secteur. Lors de la première réunion, le cadre lance : « C'est depuis l'arrivée de l'agent intérimaire au bionettoyage. » L'enquête se concentre sur ses fiches de traçabilité. On ne regarde ni la consommation d'antibiotiques du secteur, qui a augmenté, ni la chaise percée partagée entre deux chambres.",
        clues: [
          { k: "Hypothèse de départ", v: "« C'est depuis l'arrivée de l'intérimaire. »" },
          { k: "Ce qu'on étudie", v: "Uniquement les fiches de bionettoyage de cet agent." },
          { k: "Ce qu'on ignore", v: "Hausse des antibiotiques, matériel partagé entre deux chambres." }
        ],
        answer: "confirmation", choices: ["confirmation", "retro", "ancrage", "dilution"],
        wrong: {
          retro: "L'enquête est en cours, l'issue n'est pas connue. Le problème est la façon de chercher les informations.",
          ancrage: "L'hypothèse initiale joue un rôle, mais le cœur de l'erreur est de ne chercher que ce qui la confirme et d'ignorer les données contraires.",
          dilution: "L'enquête a un pilote. Le problème est l'orientation de la recherche."
        },
        parades: [
          { t: "Lister dès la première réunion toutes les hypothèses (transmission croisée, environnement, matériel partagé, pression antibiotique), construire la courbe épidémique et chercher activement ce qui infirmerait chaque piste, avec l'appui du CPias si besoin.", s: 2, fb: "Une méthode d'investigation structurée protège contre la recherche sélective. Chercher ce qui infirme une hypothèse est la parade directe au biais de confirmation." },
          { t: "Remplacer l'intérimaire pour être sûr, puis surveiller les nouveaux cas.", s: 0, fb: "On agit sur une hypothèse non vérifiée, on stigmatise un agent et on laisse en place les vraies causes possibles, comme la chaise percée partagée." },
          { t: "Poursuivre l'enquête sur le bionettoyage, puis élargir si de nouveaux cas apparaissent.", s: 1, fb: "Le bionettoyage est une piste légitime, mais attendre de nouveaux cas pour élargir revient à laisser l'épidémie confirmer ou infirmer l'hypothèse à la place de l'enquête." }
        ],
        debrief: {
          facts: "Le biais de confirmation accompagnait 58 % des événements indésirables avec effet tunnel analysés par la HAS. Croskerry le décrit comme la tendance à chercher des éléments qui confirment plutôt que ceux qui réfutent.",
          rule: "La HAS recommande, contre l'effet tunnel, de savoir remettre en cause une hypothèse, de travailler en équipe et d'utiliser des outils structurés.",
          take: "Une bonne enquête cherche d'abord ce qui pourrait lui donner tort.",
          src: ["has_tunnel", "croskerry"]
        }
      },
      {
        place: "Comité de retour d'expérience", hour: "16 h 30",
        title: "C'était évident",
        story: "Retour d'expérience sur une épidémie d'EPC : six cas secondaires. La chronologie est projetée à l'écran, avec les dates de chaque prélèvement positif. Un membre du comité tranche : « C'était évident dès le deuxième cas. L'IDE de nuit aurait dû alerter. » L'IDE concernée, présente, ne dit plus rien.",
        clues: [
          { k: "Ce qu'on voit", v: "Une chronologie complète, connue après coup." },
          { k: "Ce qu'avait l'IDE", v: "Deux résultats isolés, à des jours différents, sans lien affiché par le logiciel." },
          { k: "Effet immédiat", v: "L'IDE se tait, la parole se ferme." }
        ],
        answer: "retro", choices: ["retro", "confirmation", "autorite", "resultat"],
        wrong: {
          confirmation: "Personne ne trie ici des informations pour confirmer une idée. On juge le passé avec une connaissance qu'on n'avait pas.",
          autorite: "La hiérarchie pèse sur le silence de l'IDE, mais le jugement porté repose sur la connaissance de l'issue.",
          resultat: "Le biais de résultat juge une pratique à son issue. Ici, c'est la prévisibilité de l'événement qui est surestimée après coup : c'est le biais rétrospectif."
        },
        parades: [
          { t: "Reconstituer ce que chaque acteur savait à chaque moment, avec une méthode d'analyse systémique (de type ALARM ou ORION), et chercher les défenses absentes : alerte informatique, lien entre résultats, circuit de signalement.", s: 2, fb: "Se replacer dans la situation réelle des acteurs et rechercher les causes organisationnelles est la parade au biais rétrospectif. Cela protège aussi la culture de déclaration." },
          { t: "Rappeler à l'IDE de nuit la procédure d'alerte.", s: 0, fb: "On individualise une défaillance du système et on renforce la peur de déclarer. Les prochains signaux risquent d'être tus." },
          { t: "Noter dans le compte rendu que l'épidémie aurait pu être détectée plus tôt.", s: 1, fb: "C'est vrai en partie, mais sans analyser pourquoi elle ne l'a pas été, on ne corrige rien." }
        ],
        debrief: {
          facts: "Le guide pédagogique OMS diffusé par la HAS décrit le biais rétrospectif : la connaissance du résultat oriente, généralement négativement, l'idée que l'on se fait de la prise en charge qui aurait dû être suivie.",
          rule: "Le HCSP souligne l'importance d'une détection informatisée et automatisée des porteurs de BHRe et de leurs contacts : une défense système plutôt qu'un rappel individuel.",
          take: "Après coup, tout est évident. Sur le moment, presque rien ne l'est.",
          src: ["has_m5", "hcsp_bhre", "has_secu"]
        }
      },
      {
        place: "Unité de soins, local de vidoir", hour: "09 h 30",
        title: "La douchette",
        story: "L'EOH propose d'installer un lave-bassin et de supprimer la douchette utilisée pour rincer bassins et urinaux. En réunion, l'équipe résiste : « On a toujours fait comme ça. Le lave-bassin, ça va tomber en panne, et on perdra du temps. » Le projet est reporté à l'année suivante.",
        clues: [
          { k: "Pratique actuelle", v: "Rinçage manuel des bassins à la douchette." },
          { k: "Ce qu'on entend", v: "« On a toujours fait comme ça. »" },
          { k: "Les arguments", v: "Craintes sur le changement, aucun sur le risque de la pratique actuelle." }
        ],
        answer: "statuquo", choices: ["statuquo", "deviance", "sunk", "conformisme"],
        wrong: {
          deviance: "La pratique est ancienne, mais l'argument porte sur le refus du changement : les pertes possibles du nouveau sont surévaluées, les risques de l'existant ignorés.",
          sunk: "Il n'y a pas d'investissement passé qu'on chercherait à rentabiliser. C'est la préférence pour l'existant.",
          conformisme: "L'équipe ne copie pas un modèle extérieur. Elle préfère ce qu'elle connaît."
        },
        parades: [
          { t: "Mettre en regard les risques des deux options (aérosolisation par la douchette contre pannes possibles), tester le lave-bassin sur une période courte avec l'équipe et prévoir la maintenance.", s: 2, fb: "Le biais de statu quo traite l'existant comme sans risque. Le rendre explicite et réduire l'incertitude du changement par un essai encadré lève la résistance." },
          { t: "Reporter le projet pour préserver la cohésion de l'équipe.", s: 0, fb: "Le report entérine le biais : le risque infectieux de l'existant continue, sans être discuté." },
          { t: "Imposer le changement par note de service.", s: 1, fb: "Le changement aura lieu, mais sans adhésion, les contournements sont probables." }
        ],
        debrief: {
          facts: "Le statu quo paraît neutre parce que ses risques sont familiers. Les inconvénients du changement, eux, sont concrets et immédiats, ce qui fausse la comparaison.",
          rule: "Les précautions standard 2017 demandent d'éviter les procédures manuelles de vidange et d'entretien des contenants d'excreta, et de proscrire leur rinçage (ni douche, ni douchette) en raison du risque d'aérosolisation.",
          take: "Ne rien changer est aussi un choix, avec ses propres risques.",
          src: ["sf2h_ps_pdf", "sf2h_ps"]
        }
      },
      {
        place: "Médecine, sortie vers un SMR", hour: "17 h 15",
        title: "Le transfert de vendredi",
        story: "M. B., porteur connu d'une EPC, est transféré vendredi en fin d'après-midi vers un SMR. L'interne pense que l'IDE a appelé. L'IDE pense que c'est noté dans le courrier. Le secrétariat pense que l'EOH a prévenu. Le courrier ne mentionne pas le portage. Le SMR l'installe en chambre double.",
        clues: [
          { k: "Les acteurs", v: "Interne, IDE, secrétariat, EOH : chacun pense qu'un autre a prévenu." },
          { k: "Le courrier", v: "Aucune mention du portage de BHRe." },
          { k: "Conséquence", v: "Installation en chambre double dans l'établissement d'aval." }
        ],
        answer: "dilution", choices: ["dilution", "optimisme", "dispo", "autorite"],
        wrong: {
          optimisme: "Chacun suppose que tout va bien, mais le mécanisme est collectif : la responsabilité est partagée entre tant d'acteurs qu'elle n'appartient à personne.",
          dispo: "Aucun exemple marquant n'oriente le jugement. C'est l'organisation diffuse de la tâche qui crée l'oubli.",
          autorite: "Personne ne se tait devant un supérieur. Chacun croit simplement qu'un autre s'en est chargé."
        },
        parades: [
          { t: "Attribuer nommément la tâche (par exemple l'IDE qui prépare la sortie), l'intégrer à une check-list de transfert avec un champ « statut BHRe transmis à : nom, heure » et une transmission structurée de type Saed.", s: 2, fb: "Une tâche nommée et tracée n'est plus diluée. La check-list et le Saed rendent la transmission vérifiable." },
          { t: "Envoyer une note à tout le service rappelant d'informer les établissements d'aval.", s: 1, fb: "Le rappel est utile, mais adressé à tous, il ne désigne toujours personne." },
          { t: "Laisser l'établissement d'aval dépister lui-même tous ses entrants.", s: 0, fb: "Le dépistage d'aval ne remplace pas l'information : en attendant le résultat, le patient est déjà en chambre double, sans précautions adaptées." }
        ],
        debrief: {
          facts: "Plus le nombre d'intervenants augmente, plus chacun suppose qu'un autre a agi. Les transferts du vendredi soir, avec relèves et courriers rédigés vite, cumulent les conditions de cette dilution.",
          rule: "Le HCSP recommande d'informer l'établissement qui admet un patient porteur de BHRe de son statut au moment du transfert. La HAS propose l'outil Saed pour structurer les transmissions entre professionnels.",
          take: "Une tâche confiée à tout le monde n'est confiée à personne.",
          src: ["hcsp_bhre", "has_saed"]
        }
      }
    ]
  }
];
