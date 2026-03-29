document.addEventListener('DOMContentLoaded', () => {

    // Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll Progress Bar & Navbar Sticking
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        // Scroll Progress
        const scrolled = document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrolled / maxScroll) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;

        // Sticky Navbar
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter animation if hero section is intersecting
                if(entry.target.classList.contains('hero-content')) {
                    runCounters();
                }

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => sectionObserver.observe(el));

    // Counter Animation Logic
    let countersRun = false;
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    function runCounters() {
        if(countersRun) return;
        countersRun = true;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Modal Interaction
    const modal = document.getElementById('booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const planNameSpan = document.getElementById('plan-name');
    const form = document.getElementById('booking-form');
    const successMsg = document.getElementById('booking-success');

    // Attach click to "Select Plan" buttons
    const selectPlanBtns = document.querySelectorAll('.select-plan');
    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.target.getAttribute('data-plan');
            openModal(plan);
        });
    });

    // Attach click to generic consulting button
    document.getElementById('consult-btn').addEventListener('click', () => {
        openModal('Free Consultation');
    });

    function openModal(planName) {
        planNameSpan.textContent = planName;
        modal.style.display = 'flex';
        form.classList.remove('hidden');
        successMsg.classList.add('hidden');
        form.reset();
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function close() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }

    closeModal.addEventListener('click', close);
    
    // Close modal if clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            close();
        }
    });

    // Booking Form Submission Simulator
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form, show success
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        
        // Auto close after 3 seconds
        setTimeout(() => {
            close();
        }, 3000);
    });

    // Smooth Scroll Active Link Updating
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

});
