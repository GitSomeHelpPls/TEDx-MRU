// Photo Carousel JavaScript
class PhotoCarousel {
    constructor() {
        this.init();
    }

    init() {
        this.currentSlide = 0;
        this.totalSlides = 12; // Total number of photos
        
        // Get DOM elements (modal already exists in HTML)
        this.modal = document.getElementById('photoCarouselModal');
        if (!this.modal) {
            console.error('Photo carousel modal not found');
            return;
        }
        
        this.overlay = this.modal.querySelector('.photo-carousel-overlay');
        this.closeBtn = this.modal.querySelector('.photo-carousel-close');
        this.prevBtn = this.modal.querySelector('.photo-carousel-prev');
        this.nextBtn = this.modal.querySelector('.photo-carousel-next');
        this.track = this.modal.querySelector('.photo-carousel-track');
        this.counter = this.modal.querySelector('.photo-carousel-counter');
        
        // Create thumbnails track if it doesn't exist
        const thumbnailsContainer = this.modal.querySelector('.photo-carousel-thumbnails');
        let thumbnailTrack = this.modal.querySelector('.photo-carousel-thumbnails-track');
        if (!thumbnailTrack && thumbnailsContainer) {
            thumbnailTrack = document.createElement('div');
            thumbnailTrack.className = 'photo-carousel-thumbnails-track';
            thumbnailsContainer.appendChild(thumbnailTrack);
        }
        this.thumbnailTrack = thumbnailTrack;
        
        // Initialize slides and thumbnails
        this.initializeSlides();
        
        // Bind events
        this.bindEvents();
        
        this.updateCounter();
    }

    initializeSlides() {
        // Photo data - using actual available images
        const photos = [
            { src: 'images/speakers/event1/AB.JPG', alt: 'Event Photo 1', title: 'TEDxMRU 2024 - Speaker Presentation' },
            { src: 'images/speakers/event1/AP.JPG', alt: 'Event Photo 2', title: 'Inspiring Innovation Talk' },
            { src: 'images/speakers/event1/AT.JPG', alt: 'Event Photo 3', title: 'Technology & Future' },
            { src: 'images/speakers/event1/GS.JPG', alt: 'Event Photo 4', title: 'Leadership & Vision' },
            { src: 'images/speakers/event1/HS.JPG', alt: 'Event Photo 5', title: 'Breakthrough Ideas' },
            { src: 'images/speakers/event1/KK.JPG', alt: 'Event Photo 6', title: 'Innovation Workshop' },
            { src: 'images/speakers/event1/MB.JPG', alt: 'Event Photo 7', title: 'Thought Leadership' },
            { src: 'images/speakers/event1/SM.JPG', alt: 'Event Photo 8', title: 'Panel Discussion' },
            { src: 'images/EventSpeaker1.jpg', alt: 'Event Photo 9', title: 'Opening Ceremony' },
            { src: 'images/EventSpeaker2.jpg', alt: 'Event Photo 10', title: 'Keynote Address' },
            { src: 'images/EventSpeaker3.jpg', alt: 'Event Photo 11', title: 'Networking Session' },
            { src: 'images/EventSpeaker4.jpg', alt: 'Event Photo 12', title: 'Closing Remarks' }
        ];

        // Create slides
        let slidesHTML = '';
        let thumbnailsHTML = '';

        photos.forEach((photo, index) => {
            // Main slides
            slidesHTML += `
                <div class="photo-carousel-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
                    <img src="${photo.src}" alt="${photo.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" 
                         onload="this.parentElement.classList.remove('loading')" 
                         onerror="this.src='images/placeholder.jpg'">
                    <div class="photo-carousel-caption">${photo.title}</div>
                </div>`;

            // Thumbnails
            thumbnailsHTML += `
                <div class="photo-carousel-thumbnail ${index === 0 ? 'active' : ''}" data-slide="${index}">
                    <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                </div>`;
        });

        // Replace existing content
        this.track.innerHTML = slidesHTML;
        if (this.thumbnailTrack) {
            this.thumbnailTrack.innerHTML = thumbnailsHTML;
        }
        
        this.totalSlides = photos.length;
    }

    bindEvents() {
        // Gallery button click
        const galleryBtn = document.querySelector('.events-btn-gallery');
        if (galleryBtn) {
            galleryBtn.addEventListener('click', () => this.openModal());
        }

        // Close modal events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeModal());
        }

        // Navigation events
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
            }
        });

        // Thumbnail clicks (will be bound after slides are created)
        this.bindThumbnailEvents();

        // Touch/swipe support
        this.bindTouchEvents();
    }

    bindThumbnailEvents() {
        const thumbnails = this.modal.querySelectorAll('.photo-carousel-thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => this.goToSlide(index));
        });
    }

    bindTouchEvents() {
        let startX = 0;
        let endX = 0;
        const threshold = 50; // Minimum swipe distance

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        }, { passive: true });
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.classList.add('carousel-open');
        
        // Focus trap
        if (this.closeBtn) {
            this.closeBtn.focus();
        }
        
        // Reset to first slide
        this.goToSlide(0);
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('carousel-open');
        
        // Restore background scrolling
        document.body.style.overflow = '';
        
        // Return focus to gallery button
        const galleryBtn = document.querySelector('.events-btn-gallery');
        if (galleryBtn) {
            galleryBtn.focus();
        }
    }

    goToSlide(index) {
        // Normalize index
        if (index >= this.totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = this.totalSlides - 1;
        }

        this.currentSlide = index;

        // Update slides with smooth transition
        const slides = this.modal.querySelectorAll('.photo-carousel-slide');
        const thumbnails = this.modal.querySelectorAll('.photo-carousel-thumbnail');

        // Remove active class from all slides
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        // Add active class to current slide with a small delay for smooth transition
        setTimeout(() => {
            slides[index].classList.add('active');
        }, 50);

        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === index);
        });

        // Update counter
        this.updateCounter();

        // Center thumbnail in view
        this.centerThumbnail(index);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    updateCounter() {
        const currentElement = this.modal.querySelector('.photo-current');
        const totalElement = this.modal.querySelector('.photo-total');
        if (currentElement) {
            currentElement.textContent = this.currentSlide + 1;
        }
        if (totalElement) {
            totalElement.textContent = this.totalSlides;
        }
    }

    centerThumbnail(index) {
        const thumbnail = this.thumbnailTrack.children[index];
        if (thumbnail) {
            thumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
}

// Initialize the carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotoCarousel();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PhotoCarousel();
    });
} else {
    new PhotoCarousel();
}
