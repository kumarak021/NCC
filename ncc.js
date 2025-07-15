document.addEventListener("DOMContentLoaded", () => {
    // ---- Card Toggle Logic ----
    const cardsContainer = document.getElementById("cards-container");

    if (cardsContainer) {
        cardsContainer.addEventListener("click", (event) => {
            const clickedCard = event.target.closest(".card");
            if (clickedCard) {
                toggleCard(clickedCard);
            }
        });
    }

    // ---- Hero Slideshow Logic ----
    const heroForeground = document.querySelector('.hero-foreground');

    const heroImages = [
        '/static/images/1.jpg',
        '/static/images/2.jpg',
        '/static/images/1000054463.jpg'
        // Add more paths as needed
    ];

    let currentImageIndex = 0;

    function changeHeroImage() {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;

        // Fade out
        heroForeground.style.opacity = 0;

        setTimeout(() => {
            heroForeground.src = heroImages[currentImageIndex];
            heroForeground.style.opacity = 1;
        }, 500);
    }

    if (heroForeground) {
        heroForeground.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(changeHeroImage, 7000);
    }
});

// ---- Toggle Card Function ----
function toggleCard(card) {
    card.classList.toggle("expanded");
    const content = card.querySelector(".card-content");
    if (content) {
        content.style.display = content.style.display === "block" ? "none" : "block";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Contact button functionality
    const contactBtn = document.getElementById('contact-btn');
    const contactCard = document.getElementById('contact-card');
    const contactContent = document.querySelector('.contact-content');
    const closeBtn = document.querySelector('.close-btn');

    // Open contact card
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        contactCard.style.display = 'flex';
    });

    // Close contact card
    function closeContactCard() {
        contactCard.style.display = 'none';
    }

    // Close when clicking X button
    closeBtn.addEventListener('click', closeContactCard);

    // Close when clicking outside content
    contactCard.addEventListener('click', function(e) {
        if (!contactContent.contains(e.target)) {
            closeContactCard();
        }
    });

    // Smooth scrolling for nav links (except contact)
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});