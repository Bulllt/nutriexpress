/**
 * NutriExpress - Script principal
 * Este archivo contiene todas las funcionalidades JavaScript necesarias para la página web de NutriExpress
 */

document.addEventListener("DOMContentLoaded", function () {
  // ----- Inicialización de componentes -----
  initNavigation();
  initFAQAccordion();
  initScrollAnimations();
  initSmoothScroll();
  initNewsletterForm();
});

/**
 * Función para manejar la navegación responsive
 */
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const ctaNav = document.querySelector(".cta-nav");
  const header = document.querySelector("header");

  // Toggle para el menú móvil
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      ctaNav.classList.toggle("active");
    });
  }

  // Manejo del header al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      ctaNav.classList.remove("active");
    });
  });
}

/**
 * Función para manejar las secciones de FAQ con efecto acordeón
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Toggle el elemento actual
      item.classList.toggle("active");

      // Cerrar los demás elementos
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    });
  });
}

/**
 * Función para inicializar animaciones al hacer scroll
 */
function initScrollAnimations() {
  // Animación de aparición para las tarjetas de beneficios
  const benefitCards = document.querySelectorAll(".benefit-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  benefitCards.forEach((card) => {
    observer.observe(card);
  });

  // Animación para los pasos
  const steps = document.querySelectorAll(".step");
  const stepsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeIn");
          stepsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  steps.forEach((step) => {
    stepsObserver.observe(step);
  });

  // Animación para los testimonios
  const testimonials = document.querySelectorAll(".testimonial");
  const testimonialsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__fadeInLeft"
          );
          testimonialsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  testimonials.forEach((testimonial) => {
    testimonialsObserver.observe(testimonial);
  });

  // Animación para los planes
  const plans = document.querySelectorAll(".plan-card");
  const plansObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate__animated", "animate__zoomIn");
          }, Array.from(plans).indexOf(entry.target) * 150);
          plansObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  plans.forEach((plan) => {
    plansObserver.observe(plan);
  });
}

/**
 * Función para implementar el scroll suave a las secciones
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset para considerar el header fijo
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Función para manejar el envío del formulario de newsletter
 */
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (isValidEmail(email)) {
        // Simulación de envío exitoso
        showToast(
          "¡Gracias por suscribirte! Pronto recibirás nuestras ofertas especiales.",
          "success"
        );
        emailInput.value = "";
      } else {
        showToast("Por favor, ingresa un correo electrónico válido.", "error");
      }
    });
  }
}

/**
 * Función para validar formato de email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Función para mostrar mensajes toast
 */
function showToast(message, type = "info") {
  // Crear elemento toast
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Añadir toast al DOM
  document.body.appendChild(toast);

  // Mostrar y animar
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Auto cerrar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

/**
 * Contador simulado para demo
 */
function initCounters() {
  // Si hay contadores en la página, inicializar
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 segundos de duración
    const step = target / (duration / 20); // Actualizar cada 20ms
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Agregar CSS para los toasts
const style = document.createElement("style");
style.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: #333;
        color: white;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1100;
        max-width: 350px;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .toast-success {
        background-color: #4caf50;
    }
    
    .toast-error {
        background-color: #f44336;
    }
    
    .toast-info {
        background-color: #2196F3;
    }

    /* Animations for benefit cards */
    .benefit-card, .step, .testimonial, .plan-card {
        opacity: 0;
    }
    
    .benefit-card.animate__fadeInUp, 
    .step.animate__fadeIn, 
    .testimonial.animate__fadeInLeft, 
    .plan-card.animate__zoomIn {
        opacity: 1;
    }
`;
document.head.appendChild(style);
