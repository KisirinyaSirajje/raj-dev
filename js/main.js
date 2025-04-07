document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Portfolio Modal
    const modalTriggers = document.querySelectorAll('.portfolio-modal-trigger');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('href');
                const modal = document.querySelector(modalId);
                
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if (closeModalButtons.length > 0) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.portfolio-modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.portfolio-modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log the data and show a success message
            console.log({
                name,
                email,
                phone,
                subject,
                message
            });
            
            // Show success message (in a real application, this would happen after successful form submission)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a modal trigger
            if (this.classList.contains('portfolio-modal-trigger')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            
            // Skip if the href is just "#"
            if (targetId === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider (Simple Version)
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    if (testimonialItems.length > 1) {
        // Hide all testimonials except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Function to show next testimonial
        function showNextTestimonial() {
            testimonialItems[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            testimonialItems[currentTestimonial].style.display = 'block';
        }
        
        // Function to show previous testimonial
        function showPrevTestimonial() {
            testimonialItems[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            testimonialItems[currentTestimonial].style.display = 'block';
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(showNextTestimonial, 5000);
        
        // Add navigation buttons if they exist
        const nextButton = document.querySelector('.testimonial-next');
        const prevButton = document.querySelector('.testimonial-prev');
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                showNextTestimonial();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                showPrevTestimonial();
            });
        }
    }

    // Project Thumbnails in Portfolio Modal
    const projectThumbnails = document.querySelectorAll('.project-thumbnails img');
    projectThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = this.closest('.project-images').querySelector('img:first-child');
            const thumbnailSrc = this.getAttribute('src');
            const mainSrc = mainImage.getAttribute('src');
            
            // Swap images
            mainImage.setAttribute('src', thumbnailSrc);
            this.setAttribute('src', mainSrc);
        });
    });

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check elements on page load
    checkIfInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop) {
                header.style.top = '-80px'; // Hide header
            } else {
                header.style.top = '0'; // Show header
            }
        } else {
            header.classList.remove('sticky');
            header.style.top = '0';
        }
        
        lastScrollTop = scrollTop;
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add active class when input is focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-active');
        });
        
        // Remove active class when input loses focus, unless it has a value
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('input-active');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('input-active');
        }
    });

    // Initialize counters for stats
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let countersInitialized = false;
    
    function initCounters() {
        if (countersInitialized) return;
        
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            let count = 0;
            const increment = target / 100;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    number.textContent = Math.ceil(count);
                    setTimeout(updateCount, 10);
                } else {
                    number.textContent = target;
                }
            };
            
            updateCount();
        });
        
        countersInitialized = true;
    }
    
    // Initialize counters when stats section is in view
    const statsSection = document.querySelector('.about-stats');
    
    if (statsSection) {
        window.addEventListener('scroll', function() {
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (statsSectionTop < windowHeight - 100) {
                initCounters();
            }
        });
    }
});
