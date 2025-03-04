document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.content-header').prepend(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 1024 && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
            
            // Close other accordion items
            const siblingItems = Array.from(accordionItem.parentElement.children)
                .filter(item => item !== accordionItem);
            
            siblingItems.forEach(item => {
                item.classList.remove('active');
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') return;
        
        const sections = document.querySelectorAll('.doc-section');
        let foundResults = false;
        
        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            const sectionTitle = section.querySelector('h1, h2').textContent.toLowerCase();
            
            if (sectionText.includes(searchTerm) || sectionTitle.includes(searchTerm)) {
                section.scrollIntoView({ behavior: 'smooth' });
                foundResults = true;
                
                // Highlight the section briefly
                section.classList.add('search-highlight');
                setTimeout(() => {
                    section.classList.remove('search-highlight');
                }, 2000);
                
                // Only scroll to the first match
                return;
            }
        });
        
        if (!foundResults) {
            alert('No search results found.');
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Copy code functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-clipboard-target');
            const codeElement = document.querySelector(targetId);
            
            if (codeElement) {
                const textToCopy = codeElement.textContent;
                
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        // Show success feedback
                        const originalIcon = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        
                        setTimeout(() => {
                            this.innerHTML = originalIcon;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Copy failed:', err);
                    });
            }
        });
    });
    
    // Active link highlighting
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.doc-section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 1024) {
                    document.querySelector('.sidebar').classList.remove('active');
                }
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Add CSS for search highlight
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            animation: highlight 2s ease-out;
        }
        
        @keyframes highlight {
            0% { background-color: rgba(59, 130, 246, 0.2); }
            100% { background-color: transparent; }
        }
        
        .menu-toggle {
            display: none;
            font-size: 1.5rem;
            color: var(--text-light);
        }
        
        @media (max-width: 1024px) {
            .menu-toggle {
                display: block;
                margin-right: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize - set active link based on hash or first section
    if (window.location.hash) {
        const initialLink = document.querySelector(`.sidebar-nav a[href="${window.location.hash}"]`);
        if (initialLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            initialLink.classList.add('active');
            
            // Scroll to the section after a short delay
            setTimeout(() => {
                document.querySelector(window.location.hash).scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else {
        // Set first link as active by default
        const firstLink = document.querySelector('.sidebar-nav a');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
}); 