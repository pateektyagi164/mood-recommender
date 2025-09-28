//   https://g.co/gemini/share/d3d9e791f6a7
document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling & Intersection Observer (No Changes Here) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('show'));
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- NEW: Simulated Data for Recommendations ---
    const recommendations = {
        Happy: {
            movies: [
                { title: 'Paddington 2', desc: 'A heartwarming and funny adventure.' },
                { title: 'School of Rock', desc: 'An energetic and feel-good comedy.' },
            ],
            music: [
                { title: 'Happy', desc: 'by Pharrell Williams' },
                { title: 'Don\'t Stop Me Now', desc: 'by Queen' },
            ],
            books: [
                { title: 'Good Omens', desc: 'by Terry Pratchett & Neil Gaiman' },
                { title: 'The Hitchhiker\'s Guide to the Galaxy', desc: 'by Douglas Adams' },
            ]
        },
        Calm: {
            movies: [
                { title: 'Her', desc: 'A gentle and thought-provoking sci-fi romance.' },
                { title: 'My Neighbor Totoro', desc: 'A charming and peaceful animated classic.' },
            ],
            music: [
                { title: 'Weightless', desc: 'by Marconi Union' },
                { title: 'Clair de Lune', desc: 'by Claude Debussy' },
            ],
            books: [
                { title: 'The Alchemist', desc: 'by Paulo Coelho' },
                { title: 'Siddhartha', desc: 'by Hermann Hesse' },
            ]
        },
        // Add more moods here...
    };

    // --- UPDATED: Mood Button Interaction Logic ---
    const moodButtons = document.querySelectorAll('.mood-btn');
    const movieResults = document.querySelector('#movie-results .card-content');
    const musicResults = document.querySelector('#music-results .card-content');
    const bookResults = document.querySelector('#book-results .card-content');

    // Function to render recommendations to a specific card
    const renderRecommendations = (element, items) => {
        if (!items || items.length === 0) {
            element.innerHTML = `<p class="placeholder-text">No recommendations found.</p>`;
            return;
        }
        element.innerHTML = items.map(item => `
            <div class="recommendation-item">
                <div class="item-title">${item.title}</div>
                <div class="item-desc">${item.desc}</div>
            </div>
        `).join('');
    };

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Activate the clicked button
            document.querySelector('.mood-btn.active')?.classList.remove('active');
            button.classList.add('active');
            
            const selectedMood = button.dataset.mood;
            
            // Show loading state
            const loadingHTML = `<p class="loading-text">Finding recommendations...</p>`;
            movieResults.innerHTML = loadingHTML;
            musicResults.innerHTML = loadingHTML;
            bookResults.innerHTML = loadingHTML;
            
            // Simulate API fetch delay
            setTimeout(() => {
                const data = recommendations[selectedMood] || {};
                renderRecommendations(movieResults, data.movies);
                renderRecommendations(musicResults, data.music);
                renderRecommendations(bookResults, data.books);
            }, 1000); // 0.5 second delay
        });
    });
});