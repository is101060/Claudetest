(function () {
    // ── Toggle de tema ────────────────────────────────────────────
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ── Toggle de sidebar ─────────────────────────────────────────
    var sidebarBtn     = document.getElementById('sidebarToggle');
    var sidebar        = document.getElementById('sidebar');
    var overlay        = document.getElementById('sidebarOverlay');
    var html           = document.documentElement;
    var isMobile       = function () { return window.innerWidth < 768; };

    function openMobile() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }

    function closeMobile() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    function toggleDesktop() {
        var collapsed = html.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebar', collapsed ? 'collapsed' : 'open');
    }

    if (sidebarBtn) {
        sidebarBtn.addEventListener('click', function () {
            if (isMobile()) {
                sidebar.classList.contains('open') ? closeMobile() : openMobile();
            } else {
                toggleDesktop();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobile);
    }

    // Cerrar sidebar en móvil al hacer clic en un link
    if (sidebar) {
        sidebar.querySelectorAll('.sidebar-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (isMobile()) closeMobile();
            });
        });
    }

    // Ajuste al redimensionar ventana
    window.addEventListener('resize', function () {
        if (!isMobile()) closeMobile();
    });
})();
