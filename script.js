<<<<<<< HEAD
// Toggle mobile menu
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector("nav ul").classList.toggle("show");
});

// Fade-in sections on scroll
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));
// Simulate hover on touch for .socials a
document.querySelectorAll('.socials a').forEach(el => {
  el.addEventListener('touchstart', () => {
    el.classList.add('hovered');
  });
  el.addEventListener('touchend', () => {
    setTimeout(() => el.classList.remove('hovered'), 300);
  });
});
=======
// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const preloader = document.querySelector('.preloader');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const testimonialContainer = document.querySelector('.testimonials-slider');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelector('.testimonial-dots');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');
const themeToggle = document.createElement('button');
const html = document.documentElement;

// Current testimonial index
let currentTestimonial = 0;

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('fade-out');
    document.body.style.overflow = 'auto';
  }, 1500);
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
  
  // Animate hamburger to X
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => bar.classList.toggle('active'));
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menuToggle.click();
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
  
  // Add scrolled class to header on scroll
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Menu Filtering
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      menuItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          // Add animation class
          item.style.animation = 'fadeIn 0.5s ease-out forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Testimonials Slider
function showTestimonial(index) {
  if (!testimonials || !testimonialDots) return;
  
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
  });
  
  // Update active dot
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Create dots for testimonials
function createDots() {
  if (!testimonialDots) return;
  
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      showTestimonial(currentTestimonial);
    });
    testimonialDots.appendChild(dot);
  });
}

// Initialize testimonials
function initTestimonials() {
  if (!testimonialContainer) return;
  
  createDots();
  showTestimonial(currentTestimonial);
  
  // Auto slide
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

// Theme Toggle Functionality
function initTheme() {
  // Create theme toggle button
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  themeToggle.innerHTML = '🌙';
  document.body.appendChild(themeToggle);

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '☀️';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '☀️';
    }
  });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  // Initialize testimonials if they exist on the page
  initTestimonials();
  
  // Navigation for testimonials
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }
  
  // Form validation patterns
  const patterns = {
    name: /^[a-zA-Z\s']{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s+\-()]{10,20}$/,
    message: /^[\s\S]{10,1000}$/
  };

  // Form validation function
  function validateField(field, pattern) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;
    
    if (!value) {
      showError(field, 'This field is required');
      return false;
    }
    
    if (pattern && !pattern.test(value)) {
      showError(field, `Please enter a valid ${field.name}`);
      return false;
    }
    
    showSuccess(field);
    return true;
  }

  function showError(field, message) {
    field.classList.add('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form-error')) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function showSuccess(field) {
    field.classList.remove('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form-error')) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  // Contact Form Handling
  if (contactForm) {
    const formFields = contactForm.querySelectorAll('.form-group');
    const submitBtn = contactForm.querySelector('.btn-submit');
    const successMessage = contactForm.querySelector('.form-success');
    
    // Add focus/blur events for floating labels
    formFields.forEach(field => {
      const input = field.querySelector('.form-input');
      const label = field.querySelector('.form-label');
      
      // Check if input has value on page load
      if (input.value.trim() !== '') {
        field.classList.add('focused');
      }
      
      // Focus event
      input.addEventListener('focus', () => {
        field.classList.add('focused');
        field.querySelector('.form-underline').style.width = '100%';
        const icon = field.querySelector('.form-icon i');
        icon.style.transform = 'scale(1.2)';
        icon.style.color = 'var(--primary-dark)';
      });
      
      // Blur event
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
          field.classList.remove('focused');
        }
        field.querySelector('.form-underline').style.width = '0%';
        const icon = field.querySelector('.form-icon i');
        icon.style.transform = 'scale(1)';
        icon.style.color = 'var(--primary-color)';
      });
      
      // Input event for real-time validation
      input.addEventListener('input', () => {
        validateField(input);
      });
    });
    
    // Submit button wave effect
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        // Only prevent default if form is not valid
        if (!contactForm.checkValidity()) {
          e.preventDefault();
          // Show validation errors
          formFields.forEach(field => {
            const input = field.querySelector('.form-input');
            validateField(input);
          });
          return;
        }
        
        e.preventDefault();
        
        // Add wave effect
        const wave = submitBtn.querySelector('.btn-wave');
        wave.style.animation = 'wave 1s ease-out';
        
        // Simulate form submission
        setTimeout(() => {
          // Show success message
          successMessage.classList.add('active');
          
          // Reset form after animation
          setTimeout(() => {
            contactForm.reset();
            formFields.forEach(field => {
              field.classList.remove('focused');
            });
          }, 300);
          
          // Hide success message after delay
          setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.visibility = 'hidden';
            successMessage.style.transform = 'translateY(20px)';
            successMessage.classList.remove('active');
          }, 4000);
        }, 1500);
      });
      
      // Reset wave animation
      const wave = submitBtn.querySelector('.btn-wave');
      wave.addEventListener('animationend', () => {
        wave.style.animation = 'none';
        void wave.offsetWidth; // Trigger reflow
      });
    }
    
    // Add input event listeners for real-time validation
    formFields.forEach(fieldGroup => {
      const input = fieldGroup.querySelector('input, textarea, select');
      if (input) {
        input.addEventListener('input', () => {
          const pattern = patterns[input.name];
          if (pattern) validateField(input, pattern);
        });
        
        input.addEventListener('blur', () => {
          const pattern = patterns[input.name];
          if (pattern) validateField(input, pattern);
        });
      }
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      formFields.forEach(fieldGroup => {
        const input = fieldGroup.querySelector('input, textarea, select');
        if (input) {
          const pattern = patterns[input.name];
          if (!validateField(input, pattern)) {
            isValid = false;
          }
        }
      });
      
      if (isValid) {
        try {
          // Show loading state
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
          
          // Simulate form submission (replace with actual fetch/API call)
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Show success message
          showFormMessage(contactForm, 'Thank you for your message! We will get back to you soon.', 'success');
          contactForm.reset();
          
          // Reset button state
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 2000);
          
        } catch (error) {
          showFormMessage(contactForm, 'Something went wrong. Please try again later.', 'error');
        }
      }
    });
  }

  // Newsletter Subscription
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateField(emailInput, patterns.email);
      });
      
      emailInput.addEventListener('blur', () => {
        validateField(emailInput, patterns.email);
      });
    }
    
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (validateField(emailInput, patterns.email)) {
        try {
          // Show loading state
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner"></span> Subscribing...';
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Show success message
          showFormMessage(newsletterForm, `Thank you for subscribing with ${emailInput.value}!`, 'success');
          newsletterForm.reset();
          
          // Reset button state
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 2000);
          
        } catch (error) {
          showFormMessage(newsletterForm, 'Subscription failed. Please try again.', 'error');
        }
      }
    });
  }

  // Helper function to show form messages
  function showFormMessage(form, message, type = 'success') {
    // Remove any existing messages
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create and show new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'alert');
    messageElement.setAttribute('aria-live', 'polite');
    
    // Insert message after the form
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
      messageElement.style.opacity = '0';
      setTimeout(() => messageElement.remove(), 300);
    }, 5000);
  }


  // Newsletter subscription
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      // Add your newsletter subscription logic here
      alert(`Thank you for subscribing with ${email}!`);
      this.reset();
    });
  }
  
  // Add animation on scroll using Intersection Observer
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };
  
  animateOnScroll();
});
>>>>>>> b9715c8 (Initial commit: Coffee website design)
