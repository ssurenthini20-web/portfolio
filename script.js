document.addEventListener("DOMContentLoaded", () => {
    // Animation fade-in au scroll
    const faders = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    faders.forEach(el => observer.observe(el));

    // Cartes extensibles (expandable)
    const expandableCards = document.querySelectorAll(".expandable");

    expandableCards.forEach(card => {
        const header = card.querySelector(".info-header");
        const content = card.querySelector(".info-content");
        const icon = card.querySelector(".toggle-icon");

        if (header && content) {
            // par défaut : fermé
            content.style.maxHeight = "0px";
            content.style.overflow = "hidden";

            header.addEventListener("click", () => {
                const isOpen = card.classList.contains("open");

                if (isOpen) {
                    // fermer
                    card.classList.remove("open");
                    content.style.maxHeight = "0px";
                    if (icon) icon.classList.remove("rotated");
                } else {
                    // ouvrir
                    card.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px";
                    if (icon) icon.classList.add("rotated");
                }
            });
        }
    });
});
