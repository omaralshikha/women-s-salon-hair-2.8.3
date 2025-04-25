document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body;
    const mainHeader = document.querySelector('.main-header');
    
    // Get all navigation links (used for both mobile menu and smooth scrolling)
    const navLinks = document.querySelectorAll('.main-nav a, a[href^="#"]');

    // Toggle mobile navigation when hamburger is clicked
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.toggle('mobile-nav-active');
    });

    // Close mobile menu when clicking on a nav link (for better UX)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active');
            }
        });
    });
    
    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(e) {
        if (body.classList.contains('mobile-nav-active') && 
            !mainHeader.contains(e.target) && 
            e.target !== hamburgerMenu && 
            !hamburgerMenu.contains(e.target)) {
            body.classList.remove('mobile-nav-active');
        }
    });
    
    // Prevent clicks on the menu from closing it
    mainHeader.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Initialize the first slide to be visible
    if (slides.length > 0) {
        slides[0].style.opacity = 1;
        // Hide all other slides
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.opacity = 0;
        }
    }
    
    function nextSlide() {
        slides[currentSlide].style.opacity = 0;
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = 1;
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    function showTestimonial(index) {
        // Hide current testimonial
        testimonials[currentTestimonial].style.display = 'none';
        dots[currentTestimonial].classList.remove('active');
        
        // Show selected testimonial
        testimonials[index].style.display = 'flex';
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Auto change testimonial every 8 seconds
    setInterval(() => {
        let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextTestimonial);
    }, 8000);
    
    // Booking Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your appointment for ${service} on ${date} at ${time} has been requested. We will contact you shortly to confirm.`);
            
            // Reset form
            appointmentForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
});