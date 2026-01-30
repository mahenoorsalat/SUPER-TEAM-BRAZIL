// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

/**
 * INDEX PAGE LOGIC
 */

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-list .card');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close others (optional, maybe keep them open for comparison)
            // faqItems.forEach(other => {
            //     if (other !== item) other.classList.remove('active');
            // });

            // Toggle current
            const content = item.querySelector('div:last-child');
            const icon = item.querySelector('.icon-chevron-down');

            // Simple toggle implementation
            if (content.style.display === 'none' || !content.style.display) {
                content.style.display = 'block';
                content.style.marginTop = '15px';
                // icon.style.transform = 'rotate(180deg)'; // If we had the icon element directly
            } else {
                content.style.display = 'none';
            }
        });
    });
}

// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200; // Speed

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target.toLocaleString() + (target > 100 ? '+' : '');
            }
        });
    };

    // Trigger on intersection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}


/**
 * MEMBERS PAGE LOGIC
 */
const membersGrid = document.getElementById('membersGrid');

if (membersGrid) {
    // Dummy Data
    const members = [
        {
            name: "Ana Silva",
            role: "Core Team",
            company: "Superteam Brazil",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            skills: ["Community", "Growth"],
            twitter: "https://twitter.com"
        },
        {
            name: "Lucas Oliveira",
            role: "Protocol Eng",
            company: "Solana Labs",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            skills: ["Dev", "Rust"],
            twitter: "https://twitter.com"
        },
        {
            name: "Mariana Costa",
            role: "Product Designer",
            company: "Freelance",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
            skills: ["Design", "UI/UX"],
            twitter: "https://twitter.com"
        },
        {
            name: "Pedro Santos",
            role: "Frontend Dev",
            company: "Jupiter",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
            skills: ["Dev", "React"],
            twitter: "https://twitter.com"
        },
        {
            name: "Juliana Lima",
            role: "Content Lead",
            company: "Superteam",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
            skills: ["Content", "Marketing"],
            twitter: "https://twitter.com"
        },
        {
            name: "Rafael Souza",
            role: "Rust Developer",
            company: "Helius",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
            skills: ["Dev", "Rust"],
            twitter: "https://twitter.com"
        },
        {
            name: "Camila Rocha",
            role: "Growth Manager",
            company: "Drift",
            image: "https://images.unsplash.com/photo-1534751516042-4c54c1898907?auto=format&fit=crop&q=80&w=200",
            skills: ["Growth", "BizDev"],
            twitter: "https://twitter.com"
        },
        {
            name: "Gabriel Ferreira",
            role: "Fullstack Dev",
            company: "Squads",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
            skills: ["Dev", "Typescript"],
            twitter: "https://twitter.com"
        },
        {
            name: "Isabela Martins",
            role: "Graphic Designer",
            company: "Metaplex",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
            skills: ["Design", "NFTs"],
            twitter: "https://twitter.com"
        },
        {
            name: "Thiago Alves",
            role: "Relations",
            company: "Superteam Brazil",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
            skills: ["Core Team", "BizDev"],
            twitter: "https://twitter.com"
        },
        {
            name: "Beatriz Nogueira",
            role: "Smart Contracts",
            company: "Anchor",
            image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200",
            skills: ["Dev", "Rust"],
            twitter: "https://twitter.com"
        },
        {
            name: "Felipe Mendes",
            role: "Video Editor",
            company: "Freelance",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
            skills: ["Content", "Video"],
            twitter: "https://twitter.com"
        }
    ];

    function renderMembers(data) {
        membersGrid.innerHTML = '';

        if (data.length === 0) {
            document.getElementById('noResults').style.display = 'block';
            return;
        } else {
            document.getElementById('noResults').style.display = 'none';
        }

        data.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card member-card animate-fade-in';
            // Subtle random delay for natural feel
            card.style.animationDuration = '0.5s';

            const skillsHtml = member.skills.map(skill =>
                `<span class="skill-badge">${skill}</span>`
            ).join('');

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="member-avatar">
                <div class="member-role">${member.role}</div>
                <h3 style="font-size: 1.2rem; margin-bottom: 2px;">${member.name}</h3>
                <div class="member-company">${member.company}</div>
                <div class="member-skills">
                    ${skillsHtml}
                </div>
                <a href="${member.twitter}" target="_blank" class="social-link" aria-label="Twitter Profile">
                    <i data-lucide="twitter" width="20"></i>
                </a>
            `;
            membersGrid.appendChild(card);
        });

        // Re-init icons for new content
        lucide.createIcons();
    }

    // Initial Render
    renderMembers(members);

    // Filter Logic
    const searchInput = document.getElementById('memberSearch');
    const filterButtons = document.querySelectorAll('.filter-tag');
    let currentCategory = 'all';
    let searchQuery = '';

    function filterMembers() {
        const filtered = members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery) ||
                member.role.toLowerCase().includes(searchQuery) ||
                member.company.toLowerCase().includes(searchQuery);

            const matchesCategory = currentCategory === 'all' ||
                member.skills.includes(currentCategory) ||
                (currentCategory === 'Core Team' && member.skills.includes('Core Team'));

            return matchesSearch && matchesCategory;
        });
        renderMembers(filtered);
    }

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterMembers();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter
            currentCategory = btn.getAttribute('data-filter');
            filterMembers();
        });
    });
}
