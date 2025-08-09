// Smooth scrolling para âncoras
function scrollToCheckout() {
    document.getElementById('checkout').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Redirecionamento para Hotmart (placeholder)
function redirectToHotmart() {
    // Aqui você colocaria o link real do Hotmart
    alert('Redirecionando para o portal de pagamento seguro...\n\nEm produção, este botão redirecionaria para o link do Hotmart.');
    // window.location.href = 'https://pay.hotmart.com/seu-link-aqui';
}

// Animações ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.pain-point, .seal, .payment-logo');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Efeito de parallax suave no hero
function parallaxEffect() {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Contador de urgência (opcional)
function startUrgencyTimer() {
    const timerElement = document.getElementById('urgency-timer');
    if (!timerElement) return;
    
    let timeLeft = 15 * 60; // 15 minutos em segundos
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = "00:00";
        }
        
        timeLeft--;
    }, 1000);
}

// Efeito de typing no título principal
function typewriterEffect() {
    const titleElement = document.querySelector('.main-title');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

// Lazy loading para imagens
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Efeito de hover nos botões
function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-final');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
}

// Animação de entrada dos elementos
function initializeAnimations() {
    // Configurar elementos para animação
    const animatedElements = document.querySelectorAll('.pain-point, .seal, .payment-logo');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Validação de formulário (se houver)
function validateForm() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e53e3e';
                } else {
                    input.style.borderColor = '#cbd5e0';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    });
}

// Tracking de eventos (Google Analytics, Facebook Pixel, etc.)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    // Console log para debug
    console.log('Event tracked:', eventName, eventData);
}

// Event listeners para tracking
function setupTracking() {
    // Track cliques nos botões CTA
    document.querySelectorAll('.btn-primary, .btn-final').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_click', {
                button_text: button.textContent.trim(),
                button_position: button.closest('section').className
            });
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestones
            if (maxScroll >= 25 && maxScroll < 50) {
                trackEvent('scroll_depth', { depth: '25%' });
            } else if (maxScroll >= 50 && maxScroll < 75) {
                trackEvent('scroll_depth', { depth: '50%' });
            } else if (maxScroll >= 75 && maxScroll < 90) {
                trackEvent('scroll_depth', { depth: '75%' });
            } else if (maxScroll >= 90) {
                trackEvent('scroll_depth', { depth: '90%' });
            }
        }
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initializeAnimations();
    enhanceButtons();
    lazyLoadImages();
    validateForm();
    setupTracking();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        animateOnScroll();
        parallaxEffect();
    });
    
    // Trigger inicial da animação
    animateOnScroll();
    
    // Opcional: iniciar timer de urgência
    // startUrgencyTimer();
    
    console.log('Elan Vital Landing Page initialized successfully!');
});

// Prevenção de clique direito (opcional, para proteção de conteúdo)
document.addEventListener('contextmenu', function(e) {
    // e.preventDefault(); // Descomente para ativar
});

// Detecção de AdBlock (opcional)
function detectAdBlock() {
    const adBlockDetected = typeof window.google_ad_client === 'undefined';
    
    if (adBlockDetected) {
        console.log('AdBlock detectado');
        // Implementar ação se necessário
    }
}

// Otimização de performance
function optimizePerformance() {
    // Lazy loading para iframes
    const iframes = document.querySelectorAll('iframe[data-src]');
    
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframeObserver.unobserve(iframe);
            }
        });
    });
    
    iframes.forEach(iframe => iframeObserver.observe(iframe));
}

// Executar otimizações
window.addEventListener('load', () => {
    optimizePerformance();
    detectAdBlock();
});

