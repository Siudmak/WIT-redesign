document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector('.navbar-custom');
  const mainNavbarCollapse = document.getElementById('mainNavbar');
  const backdrop = document.getElementById('navBackdrop');

  // Funkcja precyzyjnie zarządzająca kolorami i stanem paska
  function updateNavbarState() {
    // Sprawdzamy, czy jesteśmy na mobile (ekran poniżej 992px)
    const isMobile = window.innerWidth < 992;

    if (isMobile) {
      // W wersji MOBILNEJ interesuje nas wyłącznie to, czy główne menu hamburgera jest otwarte lub się otwiera
      const isMobileMenuOpen = mainNavbarCollapse && (
        mainNavbarCollapse.classList.contains('show') || mainNavbarCollapse.classList.contains('collapsing')
      );

      if (isMobileMenuOpen) {
        document.body.classList.add('menu-open', 'overflow-hidden');
        navbar.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open', 'overflow-hidden');
        navbar.classList.remove('menu-open');

        // DODATEK UX: Gdy zamykamy hamburgera, automatycznie zwijamy ukryte podkategorie,
        // aby przy ponownym otwarciu menu startowało czyste i uporządkowane
        document.querySelectorAll('.level-1, .level-2').forEach(function(subPanel) {
          subPanel.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-header-accordion, .main-accordion-toggle').forEach(function(btn) {
          btn.classList.add('collapsed');
        });
      }
    } else {
      // W wersji DESKTOPOWEJ sprawdzamy tradycyjnie czy otwarty jest któryś panel poziomu 1
      const activeLevel1 = Array.from(document.querySelectorAll('.level-1')).some(panel => {
        return panel.classList.contains('show') || panel.classList.contains('collapsing');
      });

      if (activeLevel1) {
        document.body.classList.add('menu-open', 'overflow-hidden');
        navbar.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open', 'overflow-hidden');
        navbar.classList.remove('menu-open');
      }
    }
  }

  // --- OBSŁUGA POZIOMU 1 ---
  document.querySelectorAll('.level-1').forEach(function (panel) {
    panel.addEventListener('show.bs.collapse', function () {
      document.body.classList.add('menu-open', 'overflow-hidden');
      navbar.classList.add('menu-open');
    });

    panel.addEventListener('hide.bs.collapse', function () {
      setTimeout(updateNavbarState, 50);
    });

    panel.addEventListener('hidden.bs.collapse', function () {
      updateNavbarState();
    });
  });

  // --- OBSŁUGA MENU HAMBURGERA (Mobile) ---
  if (mainNavbarCollapse) {
    mainNavbarCollapse.addEventListener('show.bs.collapse', function () {
      document.body.classList.add('menu-open', 'overflow-hidden');
      navbar.classList.add('menu-open');
    });

    mainNavbarCollapse.addEventListener('hide.bs.collapse', function () {
      setTimeout(updateNavbarState, 50);
    });

    mainNavbarCollapse.addEventListener('hidden.bs.collapse', function () {
      updateNavbarState();
    });
  }

  // --- KLIKNIĘCIE W TŁO ZAMYKA MENU ---
  if (backdrop) {
    backdrop.addEventListener('click', function () {
      const activePanel = document.querySelector('.level-1.show');
      if (activePanel) {
        bootstrap.Collapse.getOrCreateInstance(activePanel).hide();
      }
      if (mainNavbarCollapse && mainNavbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(mainNavbarCollapse).hide();
      }
    });
  }

  // --- OBSŁUGA POZIOMU 2 (Nagłówki na Mobile) ---
  document.querySelectorAll('.dropdown-header-accordion').forEach(function (element) {
    element.addEventListener('click', function (e) {
      e.stopPropagation(); 
      
      if (window.innerWidth >= 992) {
        return;
      }
      
      const targetSelector = element.getAttribute('data-bs-target');
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        bootstrap.Collapse.getOrCreateInstance(targetElement, {
          toggle: true
        });
      }
    });
  });

  // Reagujemy na zmianę rozmiaru okna, by zresetować stany i dopasować tło
  window.addEventListener('resize', updateNavbarState);
  
	// --- dodawanie klasy ---
	function toggleMobileClass() {
	  const element = document.querySelector('#mainNavbar');
	  if (window.innerWidth >= 992) {
		element.classList.add('desktop');
	  } else {
		element.classList.remove('desktop');
	  }
	}

	// Uruchom przy załadowaniu strony i każdej zmianie rozmiaru okna
	window.addEventListener('DOMContentLoaded', toggleMobileClass);
	window.addEventListener('resize', toggleMobileClass);

});