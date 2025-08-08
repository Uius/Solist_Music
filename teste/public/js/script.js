let currentSlide = 4;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const visibleSlides = 4; // Número de slides visíveis ao mesmo tempo

function moveSlide(n) {
    currentSlide += n;

    // Se avançar além do último slide, voltar ao primeiro
    if (currentSlide > totalSlides - visibleSlides) {
        currentSlide = 0; // Volta para o início
    }

    // Se retroceder antes do primeiro slide, ir para o último conjunto de slides visíveis
    if (currentSlide < 0) {
        currentSlide = totalSlides - visibleSlides; // Volta para o final
    }

    // Calcula o deslocamento em pixels com base na largura dos slides
    const offset = -currentSlide * (150 + 10); // Largura de cada slide + espaçamento (ajuste conforme seu layout)
    document.querySelector('.carousel').style.transform = `translateX(${offset}px)`;
}

function sairConta(){
    window.location.href ="login.html"
  }