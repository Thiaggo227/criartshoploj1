// Carrossel do Banner Principal (Intro)
const images = document.querySelectorAll('.carrosselIntro img');
let currentIndex = 0;

function nextImage() {
    if (images.length === 0) return;
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

if (images.length > 0) {
    setInterval(nextImage, 5000);
}

// Seleciona todos os carrosséis de banner da página
const carrosselContainers = document.querySelectorAll('.carrosselIntroS, .carrosselSecundario');

carrosselContainers.forEach(container => {
    const images = container.querySelectorAll('img');
    let currentIndex = 0;

    if (images.length > 1) {
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 4000); // Alterna a cada 4 segundos
    }
});

// Menu Hambúrguer Deslizante com Overlay Escuro no Fundo
const menuToggle = document.getElementById('menuToggle');
const navElements = document.getElementById('navElements');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu a');

if (menuToggle && navElements) {
    function toggleMenu() {
        navElements.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (navElements.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    // Abre/fecha ao clicar no botão do menu
    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link de navegação interno
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navElements.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Fecha o menu ao clicar na área escura (overlay)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }
}

// Carrossel de Troféus Profissional, Suave e Funcional com Loop Infinito
const carrosselTrofeus = document.querySelectorAll('.carrosselTrofeu');

carrosselTrofeus.forEach(carrosselTrofeu => {
    const wrapper = carrosselTrofeu.closest('.carrosselTrofeu-wrapper');
    if (!wrapper) return;
    
    const btnPrevTrofeu = wrapper.querySelector('.btn-prev');
    const btnNextTrofeu = wrapper.querySelector('.btn-next');

    if (carrosselTrofeu && btnPrevTrofeu && btnNextTrofeu) {
        const cardTrofeu = carrosselTrofeu.querySelector('.cardTrofeu');

        function getScrollAmount() {
            if (!cardTrofeu) return 300;
            const style = window.getComputedStyle(carrosselTrofeu);
            const gap = parseInt(style.gap) || 15;
            return cardTrofeu.offsetWidth + gap;
        }

        btnNextTrofeu.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            if (carrosselTrofeu.scrollLeft + carrosselTrofeu.clientWidth >= carrosselTrofeu.scrollWidth - 10) {
                carrosselTrofeu.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carrosselTrofeu.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        btnPrevTrofeu.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            if (carrosselTrofeu.scrollLeft <= 10) {
                carrosselTrofeu.scrollTo({ left: carrosselTrofeu.scrollWidth, behavior: 'smooth' });
            } else {
                carrosselTrofeu.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    }
});

// --- Funcionalidade de Busca Dinâmica para Todas as Medalhas ---
const inputBusca = document.querySelector('.inputBusca');
const cardsMedalhas = document.querySelectorAll('.containerMedalha .cardMedalha, .containerMedal .cardMedalha');

if (inputBusca && cardsMedalhas.length > 0) {
    inputBusca.addEventListener('input', (e) => {
        const termoBusca = e.target.value.toLowerCase().trim();

        cardsMedalhas.forEach(card => {
            const tituloCard = card.querySelector('h3').textContent.toLowerCase();

            // Verifica se o título do card contém o que foi digitado (ex: número, código ou nome)
            if (tituloCard.includes(termoBusca)) {
                card.style.display = ''; // Exibe o card mantendo o layout em Grid
            } else {
                card.style.display = 'none'; // Oculta o card que não corresponde
            }
        });
    });
}