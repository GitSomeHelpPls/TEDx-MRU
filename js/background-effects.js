// Neural Network Background Effects
document.addEventListener('DOMContentLoaded', function() {
    // Additional Background Effects
    class BackgroundEffects {
        constructor() {
            this.init();
        }
        
        init() {
            this.addScrollEffects();
            this.addHoverEffects();
        }
        
        addHoverEffects() {
            const interactiveElements = document.querySelectorAll('.events-card, .event-counter-item, .events-speaker-avatar-mini');
            
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 20px 40px rgba(230, 43, 30, 0.4), 0 0 20px rgba(255, 107, 107, 0.3)';
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '';
                });
            });
        }
    }

    // Initialize background effects
    new BackgroundEffects();
});

// Add only essential CSS for hover effects
const style = document.createElement('style');
style.textContent = `
    /* Enhanced hover effects for interactive elements */
    .events-card:hover,
    .event-counter-item:hover,
    .events-speaker-avatar-mini:hover {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
