// Speaker data
const speakersData = {
    'priya-sharma': {
        name: 'Dr. Priya Sharma',
        title: 'AI Researcher & Tech Visionary',
        image: '/images/speakers/priya-sharma.jpg',
        bio: 'Dr. Priya Sharma is a leading AI researcher with over 15 years of experience in machine learning and neural networks. She has pioneered breakthrough research in natural language processing and has been instrumental in developing AI solutions that bridge the gap between technology and human needs.',
        achievements: [
            'Published 50+ research papers in top-tier AI conferences',
            'Founded AI4Good initiative reaching 1M+ students',
            'Recipient of the National Science Excellence Award 2023',
            'Former Principal Scientist at Google DeepMind'
        ],
        linkedin: 'https://linkedin.com/in/priya-sharma-ai',
        twitter: 'https://twitter.com/priyasharma_ai'
    },
    'rajesh-kumar': {
        name: 'Rajesh Kumar',
        title: 'Space Technology Pioneer',
        image: '/images/speakers/rajesh-kumar.jpg',
        bio: 'Rajesh Kumar is a space technology enthusiast who has dedicated his career to making space exploration accessible and sustainable. As the founder of SpaceTech India, he has led multiple satellite missions and is working on revolutionary propulsion systems.',
        achievements: [
            'Successfully launched 12 satellites for various missions',
            'Developed cost-effective satellite manufacturing processes',
            'ISRO Excellence Award recipient',
            'Featured in Forbes 40 Under 40 Space Leaders'
        ],
        linkedin: 'https://linkedin.com/in/rajesh-kumar-space',
        twitter: 'https://twitter.com/rajeshkumar_space'
    },
    'ananya-gupta': {
        name: 'Ananya Gupta',
        title: 'Climate Action Leader',
        image: '/images/speakers/ananya-gupta.jpg',
        bio: 'Ananya Gupta is a passionate environmental advocate who has spent the last decade working on climate solutions. She leads a global initiative focused on renewable energy adoption and has helped reduce carbon emissions across 15+ countries.',
        achievements: [
            'Led renewable energy projects saving 2M tons CO2 annually',
            'UN Young Climate Champion 2022',
            'Founded GreenFuture Foundation',
            'Advisor to multiple governments on climate policy'
        ],
        linkedin: 'https://linkedin.com/in/ananya-gupta-climate',
        twitter: 'https://twitter.com/ananyagupta_green'
    },
    'vikram-singh': {
        name: 'Dr. Vikram Singh',
        title: 'Neuroscientist & Brain-Computer Interface Expert',
        image: '/images/speakers/vikram-singh.jpg',
        bio: 'Dr. Vikram Singh is at the forefront of neuroscience research, specializing in brain-computer interfaces and neural rehabilitation. His work has opened new possibilities for treating neurological disorders and enhancing human cognitive capabilities.',
        achievements: [
            'Developed breakthrough BCI technology for paralyzed patients',
            'Published 40+ papers in Nature and Science journals',
            'Holds 15+ patents in neurotechnology',
            'Director of Neural Engineering Lab at Stanford'
        ],
        linkedin: 'https://linkedin.com/in/vikram-singh-neuro',
        twitter: 'https://twitter.com/vikramsingh_brain'
    },
    'meera-patel': {
        name: 'Meera Patel',
        title: 'Social Entrepreneur & Education Innovator',
        image: '/images/speakers/meera-patel.jpg',
        bio: 'Meera Patel has revolutionized education access for underprivileged communities. Through her innovative programs, she has reached over 500,000 students across rural India, providing quality education through technology and community partnerships.',
        achievements: [
            'Impacted 500,000+ students through education programs',
            'Ashoka Fellow and Social Entrepreneur of the Year',
            'Built 200+ community learning centers',
            'TED Talk viewed over 2M times'
        ],
        linkedin: 'https://linkedin.com/in/meera-patel-edu',
        twitter: 'https://twitter.com/meerapatel_edu'
    },
    'arjun-mehta': {
        name: 'Arjun Mehta',
        title: 'Tech Innovator & Startup Founder',
        image: '/images/speakers/arjun-mehta.jpg',
        bio: 'Arjun Mehta is a serial entrepreneur who has founded three successful tech startups. His latest venture focuses on democratizing artificial intelligence tools for small businesses, making advanced technology accessible to everyone.',
        achievements: [
            'Founded 3 successful startups with combined valuation of $500M',
            'Featured in Fortune 40 Under 40',
            'Mentor to 100+ startups',
            'Angel investor in 50+ companies'
        ],
        linkedin: 'https://linkedin.com/in/arjun-mehta-tech',
        twitter: 'https://twitter.com/arjunmehta_tech'
    },
    'kavya-reddy': {
        name: 'Kavya Reddy',
        title: 'Environmental Scientist & Ocean Conservation Expert',
        image: '/images/speakers/kavya-reddy.jpg',
        bio: 'Kavya Reddy is a marine biologist and environmental scientist dedicated to ocean conservation. Her research on coral reef restoration has gained international recognition and is being implemented across multiple marine protected areas.',
        achievements: [
            'Restored 500+ hectares of coral reefs',
            'Published groundbreaking research on marine ecosystems',
            'National Geographic Explorer',
            'Founded Ocean Guardians Initiative'
        ],
        linkedin: 'https://linkedin.com/in/kavya-reddy-ocean',
        twitter: 'https://twitter.com/kavyareddy_ocean'
    },
    'rohan-shah': {
        name: 'Rohan Shah',
        title: 'Digital Artist & Creative Technologist',
        image: '/images/speakers/rohan-shah.jpg',
        bio: 'Rohan Shah is a pioneering digital artist who combines technology with creativity to create immersive experiences. His work spans virtual reality, augmented reality, and interactive installations that have been showcased globally.',
        achievements: [
            'Exhibited at 50+ international art galleries',
            'Created VR experiences for major brands',
            'Winner of Digital Art Innovation Award 2023',
            'Professor of Digital Arts at NIFT'
        ],
        linkedin: 'https://linkedin.com/in/rohan-shah-art',
        twitter: 'https://twitter.com/rohanshah_art'
    },
    'nisha-agarwal': {
        name: 'Nisha Agarwal',
        title: 'Healthcare Pioneer & Telemedicine Expert',
        image: '/images/speakers/nisha-agarwal.jpg',
        bio: 'Nisha Agarwal has transformed healthcare delivery in rural areas through innovative telemedicine solutions. Her platform has connected over 1 million patients with healthcare professionals, making quality medical care accessible to remote communities.',
        achievements: [
            'Connected 1M+ patients with healthcare through telemedicine',
            'Reduced healthcare access time by 70% in rural areas',
            'Healthcare Innovation Award Winner',
            'Featured in WHO Global Health Leaders list'
        ],
        linkedin: 'https://linkedin.com/in/nisha-agarwal-health',
        twitter: 'https://twitter.com/nishaagarwal_health'
    }
};

// Initialize speaker popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const speakerAvatars = document.querySelectorAll('.events-speaker-avatar-mini');
    const modal = document.getElementById('speakerModal');
    const modalOverlay = document.querySelector('.speaker-modal-overlay');
    const closeBtn = document.querySelector('.speaker-modal-close');

    // Add click event to each speaker avatar
    speakerAvatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            const speakerId = this.getAttribute('data-speaker');
            if (speakersData[speakerId]) {
                openSpeakerModal(speakersData[speakerId]);
            }
        });
    });

    // Close modal events
    closeBtn.addEventListener('click', closeSpeakerModal);
    modalOverlay.addEventListener('click', closeSpeakerModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeSpeakerModal();
        }
    });

    function openSpeakerModal(speaker) {
        // Populate modal content
        document.getElementById('speakerImage').src = speaker.image;
        document.getElementById('speakerImage').alt = speaker.name;
        document.getElementById('speakerName').textContent = speaker.name;
        document.getElementById('speakerTitle').textContent = speaker.title;
        document.getElementById('speakerBio').textContent = speaker.bio;
        
        // Populate achievements
        const achievementsList = document.getElementById('speakerAchievements');
        achievementsList.innerHTML = '';
        speaker.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
        
        // Set social links
        document.getElementById('speakerLinkedIn').href = speaker.linkedin;
        document.getElementById('speakerTwitter').href = speaker.twitter;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSpeakerModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});