// Speaker Modal Functionality with Enhanced Animations
class SpeakerModal {
    constructor() {
        this.modal = document.getElementById('speakerModal');
        this.isAnimating = false;
        this.init();
    }

    init() {
        // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
        });
    }

    bindEvents() {
        // Add click events to speaker avatars
        document.querySelectorAll('.events-speaker-avatar-mini').forEach(item => {
            item.addEventListener('click', (event) => {
                if (this.isAnimating) return; // Prevent multiple clicks during animation
                
                const speakerId = event.currentTarget.getAttribute('data-speaker');
                if (window.speakersData && window.speakersData[speakerId]) {
                    this.openModal(speakerId);
                }
            });
        });

        // Close modal events
        document.querySelector('.speaker-modal-close')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeModal();
        });
        
        document.querySelector('.speaker-modal-overlay')?.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Prevent modal content clicks from closing modal
        document.querySelector('.speaker-modal-content')?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(speakerId) {
        if (this.isAnimating) return;
        
        const speaker = window.speakersData[speakerId];
        if (!speaker || !this.modal) return;
        
        this.isAnimating = true;
        
        // Populate modal content
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
        // Basic info
        document.getElementById('speakerName').textContent = speaker.name;
        document.getElementById('speakerTitle').textContent = speaker.title;
        document.getElementById('speakerBio').textContent = speaker.bio;
        document.getElementById('speakerImage').src = speaker.image || 'images/speakers/default-speaker.jpg';
        document.getElementById('speakerImage').alt = speaker.name;

        // Social links - LinkedIn and Instagram
        const linkedInLink = document.getElementById('speakerLinkedIn');
        const instagramLink = document.getElementById('speakerInstagram');
        const socialContainer = document.querySelector('.speaker-social');
        
        // Handle LinkedIn
        if (speaker.social?.linkedin) {
            linkedInLink.href = speaker.social.linkedin;
            linkedInLink.style.display = 'flex';
        } else {
            linkedInLink.style.display = 'none';
        }
        
        // Handle Instagram
        if (speaker.social?.instagram) {
            instagramLink.href = speaker.social.instagram;
            instagramLink.style.display = 'flex';
        } else {
            instagramLink.style.display = 'none';
        }

        // Hide entire social container if no social links exist
        const hasLinkedIn = speaker.social?.linkedin;
        const hasInstagram = speaker.social?.instagram;
        
        if (!hasLinkedIn && !hasInstagram) {
            socialContainer.style.display = 'none';
        } else {
            socialContainer.style.display = 'flex';
        }

        // Achievements
        const achievementsList = document.getElementById('speakerAchievements');
        achievementsList.innerHTML = '';
        if (speaker.achievements && speaker.achievements.length > 0) {
            speaker.achievements.forEach(achievement => {
                const li = document.createElement('li');
                li.textContent = achievement;
                achievementsList.appendChild(li);
            });
        }
    }

    closeModal() {
        if (this.isAnimating || !this.modal?.classList.contains('active')) return;
        
        this.isAnimating = true;
        
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
new SpeakerModal();