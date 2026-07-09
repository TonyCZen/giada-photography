document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navContainer = document.querySelector('#navbar .container');
    const logo = document.getElementById('nav-logo');

    // --- 1. NAVBAR SCROLL LOGIC ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav', 'py-2');
            navbar.classList.remove('py-4');
            
            // Il logo diventa più piccolo
            if(logo) logo.style.height = '120px'; 
        } else {
            navbar.classList.remove('glass-nav', 'py-2');
            navbar.classList.add('py-4');
            
            // Il logo torna grande (come impostato nell'HTML)
            if(logo) logo.style.height = '160px'; 
        }
    });

    // --- 2. SCROLL REVEAL ANIMATION (Nuova Funzione) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando l'elemento entra nella visuale, aggiunge la classe
                entry.target.classList.add('active');
            } else {
                // Quando l'elemento ESCE dalla visuale (sopra o sotto), toglie la classe
                // In questo modo l'animazione si resetta e può ripartire
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15 // Regola questo per decidere quanto "presto" deve apparire
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. LIGHTBOX LOGIC CON ZOOM EXTRA ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');

    // Funzione dedicata SOLO alla chiusura
    const closeFullImage = (e) => {
        // Se l'evento esiste, evitiamo che si propaghi ad altri elementi
        if(e) e.stopPropagation(); 
        
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Riattiva lo scroll
        lightboxImg.style.transform = "scale(1)"; // Reset dello zoom per la prossima apertura
    };

    document.querySelectorAll('main img').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImg.src = image.src;
            lightboxImg.style.transform = "scale(1)";
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        });
    });

    // GESTIONE CLIC SULL'IMMAGINE (Solo Zoom)
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation(); // FONDAMENTALE: Impedisce al clic di "passare" allo sfondo e chiudere
        
        // Gestione Zoom: funziona sia su Desktop che su Mobile al clic/tap
        if (lightboxImg.style.transform === "scale(1.5)") {
            lightboxImg.style.transform = "scale(1)";
            lightboxImg.style.cursor = "zoom-in";
        } else {
            lightboxImg.style.transform = "scale(1.5)";
            lightboxImg.style.cursor = "zoom-out";
        }
    });

    // CHIUSURA: Solo tramite tasto X
    closeBtn.addEventListener('click', closeFullImage);

    // CHIUSURA: Cliccando sullo sfondo (area fuori dall'immagine)
    lightbox.addEventListener('click', closeFullImage);
});