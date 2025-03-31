// ========================== CONTROLE DO MENU MOBILE ==========================
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    // Bloquear scroll quando menu aberto
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
})

// Fechar menu ao clicar em links
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// Fechar menu ao rolar
window.addEventListener('scroll', () => {
    if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// ========================== NAVEGAÇÃO ATIVA ==========================
const navLinks = document.querySelectorAll('.navlist a');

function activeLink() {
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

navLinks.forEach(item => item.addEventListener('click', activeLink));

// ========================== ALTERNAR MODO CLARO/ESCURO ==========================
function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
    updateTextColor();
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');
}

// ========================== ANIMAÇÃO DO TÍTULO ==========================
const titleElement = document.querySelector('#name');
const text = "THALITA";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

function animateText() {
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1);
            index++;
        } else {
            isTyping = false;
        }
    } else {
        if (index > 1) {
            titleElement.textContent = text.slice(0, index - 1);
            index--;
        } else {
            isTyping = true;
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#1f6189' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 300);
}

function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();

// ========================== ANIMAÇÃO DAS SEÇÕES ==========================
const sections = document.querySelectorAll('section');
sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(100px)';
    section.style.transition = 'opacity 1s, transform 1s';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});


sections.forEach((section) => observer.observe(section));

// ========================== CARROSSEL ==========================
// ========================== CARROSSEL ==========================
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active'); // Remove a classe active de todos os slides
        if (i === index) {
            slide.classList.add('active'); // Adiciona a classe active no slide atual
        }
    });
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

// Exibir o primeiro slide ao carregar a página
showSlide(currentIndex);

// Função para avançar automaticamente a cada 5 segundos
function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Configurar o intervalo para passar os slides a cada 5 segundos
setInterval(autoSlide, 5000); // 5000 milissegundos = 5 segundos
