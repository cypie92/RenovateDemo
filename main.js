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

    // =========================================
    // 7. Cost Estimation Form Logic
    // =========================================
    const estimationSection = document.getElementById('estimate');
    if (estimationSection) {
        initCostEstimation();
    }

    function initCostEstimation() {
        let currentStep = 1;
        const totalSteps = 5;

        const formSteps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        const progressFill = document.getElementById('progress-fill');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        const restartBtn = document.getElementById('restart-btn');

        // Pricing configuration (in RM)
        const pricing = {
            propertyType: {
                'condo': 1.0,
                'apartment': 0.9,
                'terrace': 1.2,
                'semi-d': 1.4,
                'bungalow': 1.6
            },
            propertySize: {
                'small': { base: 15000, multiplier: 1.0 },
                'medium': { base: 25000, multiplier: 1.3 },
                'large': { base: 35000, multiplier: 1.6 },
                'xlarge': { base: 50000, multiplier: 2.0 },
                'xxlarge': { base: 70000, multiplier: 2.5 }
            },
            areas: {
                'living': 8000,
                'bedroom': 6000,
                'kitchen': 12000,
                'bathroom': 8000,
                'dining': 5000,
                'all': 0 // Handled separately
            },
            renovationType: {
                'furniture': 0.6,
                'partial': 0.85,
                'full': 1.0
            },
            style: {
                'modern': 1.0,
                'minimalist': 0.9,
                'contemporary': 1.1,
                'classic': 1.2,
                'scandinavian': 1.05
            }
        };

        // Labels for display
        const labels = {
            propertyType: {
                'condo': 'Condominium',
                'apartment': 'Apartment',
                'terrace': 'Terrace House',
                'semi-d': 'Semi-Detached',
                'bungalow': 'Bungalow'
            },
            propertySize: {
                'small': 'Below 800 sqft',
                'medium': '800 - 1,200 sqft',
                'large': '1,200 - 1,800 sqft',
                'xlarge': '1,800 - 2,500 sqft',
                'xxlarge': 'Above 2,500 sqft'
            },
            areas: {
                'living': 'Living Room',
                'bedroom': 'Bedroom(s)',
                'kitchen': 'Kitchen',
                'bathroom': 'Bathroom(s)',
                'dining': 'Dining Area',
                'all': 'Whole House'
            },
            renovationType: {
                'furniture': 'Furniture Only',
                'partial': 'Partial Makeover',
                'full': 'Full Makeover'
            },
            style: {
                'modern': 'Modern',
                'minimalist': 'Minimalist',
                'contemporary': 'Contemporary',
                'classic': 'Classic',
                'scandinavian': 'Scandinavian'
            }
        };

        function updateProgress() {
            // Update progress steps
            progressSteps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'completed');
                if (stepNum < currentStep) {
                    step.classList.add('completed');
                } else if (stepNum === currentStep) {
                    step.classList.add('active');
                }
            });

            // Update progress bar fill
            const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            progressFill.style.setProperty('--progress', progressPercentage + '%');
            progressFill.querySelector(':before') || null;
            // Use CSS custom property or direct style
            const beforeStyle = document.createElement('style');
            beforeStyle.id = 'progress-dynamic';
            const existing = document.getElementById('progress-dynamic');
            if (existing) existing.remove();
            beforeStyle.textContent = `.progress-fill::before { width: ${progressPercentage}% !important; }`;
            document.head.appendChild(beforeStyle);
        }

        function showStep(step) {
            formSteps.forEach(s => s.classList.remove('active'));

            if (step === 'results') {
                document.querySelector('.form-step[data-step="results"]').classList.add('active');
                document.querySelector('.form-navigation').style.display = 'none';

                // Mark all steps as completed
                progressSteps.forEach(s => s.classList.add('completed'));
            } else {
                document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
                document.querySelector('.form-navigation').style.display = 'flex';
            }

            // Update buttons
            prevBtn.disabled = step === 1;

            if (step === totalSteps) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }

            updateProgress();
        }

        function getFormData() {
            return {
                propertyType: document.querySelector('input[name="propertyType"]:checked')?.value,
                propertySize: document.querySelector('input[name="propertySize"]:checked')?.value,
                areas: Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(cb => cb.value),
                renovationType: document.querySelector('input[name="renovationType"]:checked')?.value,
                style: document.querySelector('input[name="style"]:checked')?.value
            };
        }

        function validateStep(step) {
            const data = getFormData();

            switch(step) {
                case 1:
                    return !!data.propertyType;
                case 2:
                    return !!data.propertySize;
                case 3:
                    return data.areas.length > 0;
                case 4:
                    return !!data.renovationType;
                case 5:
                    return !!data.style;
                default:
                    return true;
            }
        }

        function calculateCost() {
            const data = getFormData();

            // Base cost from property size
            const sizeConfig = pricing.propertySize[data.propertySize];
            let baseCost = sizeConfig.base;

            // Apply property type multiplier
            baseCost *= pricing.propertyType[data.propertyType];

            // Calculate area costs
            let areaCost = 0;
            if (data.areas.includes('all')) {
                // Whole house - add all areas with a discount
                areaCost = Object.values(pricing.areas).reduce((sum, val) => sum + val, 0) * 0.85;
            } else {
                data.areas.forEach(area => {
                    areaCost += pricing.areas[area] || 0;
                });
            }

            // Apply property size multiplier to area costs
            areaCost *= sizeConfig.multiplier;

            // Apply renovation type multiplier
            const renovationMultiplier = pricing.renovationType[data.renovationType];

            // Apply style multiplier
            const styleMultiplier = pricing.style[data.style];

            // Calculate total
            let totalMin = (baseCost + areaCost) * renovationMultiplier * styleMultiplier;
            let totalMax = totalMin * 1.25; // 25% upper range

            // Round to nearest 1000
            totalMin = Math.round(totalMin / 1000) * 1000;
            totalMax = Math.round(totalMax / 1000) * 1000;

            return {
                min: totalMin,
                max: totalMax,
                data: data
            };
        }

        function displayResults() {
            const result = calculateCost();

            // Animate cost display
            const costAmount = document.getElementById('cost-amount');
            const costMax = document.getElementById('cost-max');

            animateNumber(costAmount, 0, result.min, 1500);
            animateNumber(costMax, 0, result.max, 1500);

            // Build breakdown
            const breakdown = document.getElementById('results-breakdown');
            breakdown.innerHTML = `
                <div class="breakdown-item">
                    <span class="breakdown-label">🏠 Property Type</span>
                    <span class="breakdown-value">${labels.propertyType[result.data.propertyType]}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">📐 Property Size</span>
                    <span class="breakdown-value">${labels.propertySize[result.data.propertySize]}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">🏗️ Areas</span>
                    <span class="breakdown-value">${result.data.areas.map(a => labels.areas[a]).join(', ')}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">🔧 Renovation Type</span>
                    <span class="breakdown-value">${labels.renovationType[result.data.renovationType]}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">🎨 Style</span>
                    <span class="breakdown-value">${labels.style[result.data.style]}</span>
                </div>
            `;

            showStep('results');
        }

        function animateNumber(element, start, end, duration) {
            const range = end - start;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);

                const current = Math.round(start + range * easeOut);
                element.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        }

        function resetForm() {
            // Reset all form inputs
            document.querySelectorAll('.estimation-container input').forEach(input => {
                input.checked = false;
            });

            currentStep = 1;
            showStep(1);
            document.querySelector('.form-navigation').style.display = 'flex';

            // Reset progress
            progressSteps.forEach(step => {
                step.classList.remove('completed', 'active');
            });
            progressSteps[0].classList.add('active');
        }

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            } else {
                // Show validation feedback
                const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
                currentStepEl.classList.add('shake');
                setTimeout(() => currentStepEl.classList.remove('shake'), 500);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });

        submitBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                displayResults();
            }
        });

        restartBtn.addEventListener('click', () => {
            resetForm();
        });

        // Handle "Whole House" selection - deselect others
        document.querySelectorAll('input[name="areas"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.value === 'all' && e.target.checked) {
                    document.querySelectorAll('input[name="areas"]').forEach(cb => {
                        if (cb.value !== 'all') cb.checked = false;
                    });
                } else if (e.target.value !== 'all' && e.target.checked) {
                    document.querySelector('input[name="areas"][value="all"]').checked = false;
                }
            });
        });

        // Initialize
        showStep(1);
    }
});
