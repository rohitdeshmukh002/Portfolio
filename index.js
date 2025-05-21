// JavaScript functionality will go here
$(document).ready(function() {
    // Mobile menu toggle
    $('.menu-toggle').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('active');
    });
    
    // Smooth scrolling for navigation links
    $('.nav-links a, .cta-btn, .back-to-top').click(function(e) {
        if(this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
            
            // Close mobile menu after clicking a link
            $('.nav-links').removeClass('active');
            $('.menu-toggle').removeClass('active');
        }
    });
    
    // Header scroll effect
    $(window).scroll(function() {
        if($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
            $('.back-to-top').addClass('show');
        } else {
            $('header').removeClass('scrolled');
            $('.back-to-top').removeClass('show');
        }
    });
    
    // Projects filter
    $('.filter-btn').click(function() {
        const value = $(this).attr('data-filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if(value == 'all') {
            $('.project-card').show();
        } else {
            $('.project-card').not('[data-category="'+value+'"]').hide();
            $('.project-card[data-category="'+value+'"]').show();
        }
    });
    
    // Progress bar animation using Intersection Observer
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                progressBar.style.setProperty('--progress', progress + '%');
                progressBar.classList.add('animate');
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Contact form submission with EmailJS
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const templateParams = {
            from_name: $('#name').val(),
            from_email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
            to_name: 'Rohit Deshmukh'
        };

        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalBtnText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        submitBtn.prop('disabled', true);

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your message! I will get back to you soon.');
                $('#contactForm')[0].reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.html(originalBtnText);
                submitBtn.prop('disabled', false);
            });
    });
    
    // Newsletter form submission
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        // Newsletter submission logic would go here
        alert('Thank you for subscribing to my newsletter!');
        this.reset();
    });
});