// Speaker Modal Functionality with Enhanced Animations
class SpeakerModal {
    constructor() {
        this.modal = document.getElementById('speakerModal');
        this.isAnimating = false;
        this.init();
    }

    init() {
        console.log('Initializing SpeakerModal...'); // Debug log
        // Wait for DOM to load or bind immediately if already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
            });
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        console.log('Binding events...'); // Debug log
        
        // Add click events to speaker avatars
        const avatars = document.querySelectorAll('.events-speaker-avatar-mini');
        console.log('Found avatars:', avatars.length); // Debug log
        
        avatars.forEach(item => {
            item.addEventListener('click', (event) => {
                console.log('Avatar clicked'); // Debug log
                if (this.isAnimating) return;
                
                const speakerId = event.currentTarget.getAttribute('data-speaker');
                console.log('Speaker ID:', speakerId); // Debug log
                console.log('Speakers data available:', !!window.speakersData); // Debug log
                
                if (window.speakersData && window.speakersData[speakerId]) {
                    console.log('Opening modal for:', speakerId); // Debug log
                    this.openModal(speakerId);
                } else {
                    console.error('Speaker data not found for:', speakerId);
                }
            });
        });

        // Close modal events
        const closeBtn = document.querySelector('.speaker-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });
        }
        
        const overlay = document.querySelector('.speaker-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Prevent modal content clicks from closing modal
        const modalContent = document.querySelector('.speaker-modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(speakerId) {
        console.log('Opening modal for speaker:', speakerId); // Debug log
        
        if (this.isAnimating) return;
        
        const speaker = window.speakersData[speakerId];
        if (!speaker || !this.modal) {
            console.error('Speaker data or modal not found');
            return;
        }
        
        this.isAnimating = true;
        
        // Populate modal content first
        this.populateModalContent(speaker);
        
        // Start opening animation
        this.modal.classList.add('opening');
        this.modal.style.display = 'flex';
        
        // Trigger reflow to ensure display change is applied
        this.modal.offsetHeight;
        
        // Add active class for animation
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Remove opening class after animation
            setTimeout(() => {
                this.modal.classList.remove('opening');
                this.isAnimating = false;
            }, 600);
        });
    }

    populateModalContent(speaker) {
        console.log('Populating modal content for:', speaker.name); // Debug log
        
        // Basic info
        const speakerName = document.getElementById('speakerName');
        const speakerTitle = document.getElementById('speakerTitle');
        const speakerBio = document.getElementById('speakerBio');
        const speakerImage = document.getElementById('speakerImage');
        
        if (speakerName) {
            speakerName.textContent = speaker.name;
            console.log('Set name:', speaker.name);
        }
        if (speakerTitle) {
            speakerTitle.textContent = speaker.title;
            console.log('Set title:', speaker.title);
        }
        if (speakerBio) {
            speakerBio.textContent = speaker.bio;
            console.log('Set bio length:', speaker.bio.length);
        }
        if (speakerImage) {
            speakerImage.src = speaker.image || 'images/speakers/default-speaker.jpg';
            speakerImage.alt = speaker.name;
            console.log('Set image:', speaker.image);
        }

        // YouTube Video - handle missing videoId
        const speakerVideo = document.getElementById('speakerVideo');
        const videoContainer = document.querySelector('.speaker-video-container');
        
        if (speakerVideo && videoContainer) {
            if (speaker.videoId && speaker.videoId !== 'dQw4w9WgXcQ') {
                speakerVideo.src = `https://www.youtube.com/embed/${speaker.videoId}`;
                videoContainer.style.display = 'block';
                console.log('Set video ID:', speaker.videoId);
            } else {
                // Hide video container if no real video ID
                videoContainer.style.display = 'none';
                console.log('No video ID available');
            }
        }

        // Social links
        const linkedInLink = document.getElementById('speakerLinkedIn');
        const instagramLink = document.getElementById('speakerInstagram');
        const socialContainer = document.querySelector('.speaker-social');
        
        // Handle LinkedIn
        if (linkedInLink) {
            if (speaker.social?.linkedin) {
                linkedInLink.href = speaker.social.linkedin;
                linkedInLink.style.display = 'flex';
            } else {
                linkedInLink.style.display = 'none';
            }
        }
        
        // Handle Instagram
        if (instagramLink) {
            if (speaker.social?.instagram) {
                instagramLink.href = speaker.social.instagram;
                instagramLink.style.display = 'flex';
            } else {
                instagramLink.style.display = 'none';
            }
        }

        // Hide entire social container if no social links exist
        const hasLinkedIn = speaker.social?.linkedin;
        const hasInstagram = speaker.social?.instagram;
        
        if (socialContainer) {
            if (!hasLinkedIn && !hasInstagram) {
                socialContainer.style.display = 'none';
            } else {
                socialContainer.style.display = 'flex';
            }
        }

        // Achievements
        const achievementsList = document.getElementById('speakerAchievements');
        if (achievementsList) {
            achievementsList.innerHTML = '';
            if (speaker.achievements && speaker.achievements.length > 0) {
                speaker.achievements.forEach(achievement => {
                    const li = document.createElement('li');
                    li.textContent = achievement;
                    achievementsList.appendChild(li);
                });
                console.log('Added achievements:', speaker.achievements.length);
            }
        }
        
        console.log('Modal content populated successfully');
    }

    closeModal() {
        if (this.isAnimating || !this.modal?.classList.contains('active')) return;
        
        this.isAnimating = true;
        
        // Stop video playback
        const speakerVideo = document.getElementById('speakerVideo');
        if (speakerVideo) {
            speakerVideo.src = '';
        }
        
        // Add closing class for animation
        this.modal.classList.add('closing');
        
        // Remove active class
        this.modal.classList.remove('active');
        
        // Wait for animation to complete
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modal.classList.remove('closing');
            document.body.style.overflow = '';
            this.isAnimating = false;
        }, 500);
    }
}

// Initialize speaker modal when script loads
console.log('Creating SpeakerModal instance...');
new SpeakerModal();