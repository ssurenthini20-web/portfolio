// script.js

document.addEventListener("DOMContentLoaded", () => {
    /*
     * 1) Animation des sections .fade-in avec IntersectionObserver
     *    -> ajoute la classe .visible une seule fois
     */
    const faders = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // On arrête d'observer cette section (l'animation ne se rejoue pas)
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    faders.forEach(el => observer.observe(el));

    /*
     * 2) Cartes extensibles (accordéon) pour .expandable
     *    -> clic sur .info-header ouvre / ferme le contenu
     */
    const expandableCards = document.querySelectorAll(".expandable");

    expandableCards.forEach(card => {
        const header = card.querySelector(".info-header");
        const content = card.querySelector(".info-content");
        const icon = card.querySelector(".toggle-icon");

        // Sécurité : on vérifie que les éléments existent bien
        if (!header || !content) return;

        // Initialisation : fermé au départ
        content.style.maxHeight = "0px";
        content.style.overflow = "hidden";

        header.addEventListener("click", () => {
            const isOpen = card.classList.contains("open");

            if (isOpen) {
                // Fermer la carte
                card.classList.remove("open");
                content.style.maxHeight = "0px";
                if (icon) icon.classList.remove("rotated");
            } else {
                // Ouvrir la carte
                card.classList.add("open");
                // On adapte la hauteur au contenu
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.classList.add("rotated");
            }
        });
    });
});
