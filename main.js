document.addEventListener('DOMContentLoaded', () => {
    console.log('The Makeover Guys Refined Custom Code Loaded');

    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu--btn');
    const nav = document.querySelector('header nav');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                // Inline styles for basic toggle - class based toggle is better but keeping simple
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = '#fff';
                nav.style.padding = '20px';
                nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // Adjusted for taller header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    // Add '.fade-in-section' to major sections for the effect
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Auto-assign animation class to major sections if they don't have it (excluding storyline slides which handle their own)
    const sectionsToAnimate = document.querySelectorAll('section:not(.story-slide), .promo-grid, footer');
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Observe story slides separately for is-visible trigger without adding fade-in-section
    const storySlides = document.querySelectorAll('.story-slide');
    storySlides.forEach(slide => {
        observer.observe(slide);
    });

    // 4. Parallax / Scroll Listener for Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.height = '70px'; // Shrink header
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.height = '90px'; // Original height
            header.style.boxShadow = 'none';
        }

        // Hero Parallax
        const hero = document.querySelector('.property-banner');
        if (hero) {
            const speed = 0.5;
            hero.style.backgroundPosition = `center ${window.scrollY * speed}px`;
        }
    });


    // 5. Parallax Effect for Story Slides
    const storySlidesSection = document.querySelector('.scrolling-wrapper');
    if (storySlidesSection) {
        storySlidesSection.addEventListener('scroll', () => {
            const slides = document.querySelectorAll('.story-slide');
            slides.forEach(slide => {
                const rect = slide.getBoundingClientRect();
                const speed = 0.5;
                // If slide is visible
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const bg = slide.querySelector('.slide-bg');
                    if (bg) {
                        const yPos = (rect.top * speed);
                        bg.style.transform = `translateY(${yPos}px) scale(1.1)`;
                    }
                }
            });
        });
    }

    // =========================================
    // 6. Design Detail Page Logic
    // =========================================
    const detailPage = document.querySelector('.detail--page');
    if (detailPage) {
        initDetailPage();
    }

    function initDetailPage() {
        // Mock Data for the project
        const projectData = {
            title: "The Urban Sanctuary",
            desc: "A modern minimalist approach to urban living, focusing on clean lines, warm woods, and functional spaces.",
            stats: {
                size: "1,250 sqft",
                duration: "8 weeks",
                style: "Modern Minimalist",
                cost: "RM 45,000"
            },
            images: [
                { src: "assets/images/detail_living.png", category: "living", title: "Living Room View 1" },
                { src: "assets/images/detail_bedroom.png", category: "bedroom", title: "Master Bedroom" },
                { src: "assets/images/detail_kitchen.png", category: "kitchen", title: "Kitchen Area" },
                // Reusing generic assets for demo variety
                { src: "assets/images/project1.png", category: "living", title: "Living Area Detail" },
                { src: "assets/images/project2.png", category: "bedroom", title: "Guest Bedroom" },
                { src: "assets/images/project3.png", category: "kitchen", title: "Dining Space" },
            ]
        };

        // Populate Hero & Stats
        document.getElementById('project-title').textContent = projectData.title;
        document.getElementById('project-desc').textContent = projectData.desc;
        document.getElementById('project-size').textContent = projectData.stats.size;
        document.getElementById('project-duration').textContent = projectData.stats.duration;
        document.getElementById('project-style').textContent = projectData.stats.style;
        document.getElementById('project-cost').textContent = projectData.stats.cost;

        // Populate Gallery
        const galleryGrid = document.getElementById('gallery-grid');
        const galleryTitle = document.getElementById('gallery-title');

        function renderGallery(filter = 'all') {
            galleryGrid.innerHTML = ''; // Clear current

            const filteredImages = filter === 'all'
                ? projectData.images
                : projectData.images.filter(img => img.category === filter);

            if (filteredImages.length === 0) {
                galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#999;">No images found for this area.</p>';
                return;
            }

            filteredImages.forEach((img, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item fade-in-up';
                item.style.animationDelay = `${index * 0.1}s`;
                item.innerHTML = `
                    <img src="${img.src}" alt="${img.title}" loading="lazy">
                `;
                galleryGrid.appendChild(item);
            });

            // Update title
            const categoryNames = {
                'all': 'All Areas',
                'living': 'Living Room',
                'bedroom': 'Bedroom',
                'kitchen': 'Kitchen'
            };
            galleryTitle.textContent = `Gallery: ${categoryNames[filter] || 'Selected Area'}`;
        }

        // Initial Render
        renderGallery('all');

        // Handle Hotspots & View All Button
        const hotspots = document.querySelectorAll('.hotspot, .view-all-btn');
        hotspots.forEach(btn => {
            btn.addEventListener('click', () => {
                const room = btn.dataset.room;
                renderGallery(room);

                // Scroll to gallery on mobile or generally for better UX
                const gallerySection = document.querySelector('.gallery-wrapper');
                gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Set Hero Background (using one of the images)
        const heroSection = document.getElementById('detail-hero');
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${projectData.images[0].src}')`;
        }
    }
});
