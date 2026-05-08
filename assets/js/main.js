/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Nov 04 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  // For each code-snippet-wrapper, wire up zoom buttons + code block
  document.querySelectorAll(".code-snippet-wrapper").forEach(wrapper => {
    const code = wrapper.querySelector(".pre-container pre");
    const zoomInBtns = wrapper.querySelectorAll(".zoom-in");
    const zoomOutBtns = wrapper.querySelectorAll(".zoom-out");

    let fontSize = 16;
    let zoomInterval = null;

    function changeFontSize(delta) {
      fontSize = Math.max(8, fontSize + delta);
      code.style.fontSize = fontSize + "px";
    }

    // Zoom in
    zoomInBtns.forEach(btn => {
      btn.addEventListener("mousedown", () => {
        zoomInterval = setInterval(() => changeFontSize(1), 50);
      });
      btn.addEventListener("mouseup", () => clearInterval(zoomInterval));
      btn.addEventListener("mouseleave", () => clearInterval(zoomInterval));
    });

    // Zoom out
    zoomOutBtns.forEach(btn => {
      btn.addEventListener("mousedown", () => {
        zoomInterval = setInterval(() => changeFontSize(-1), 50);
      });
      btn.addEventListener("mouseup", () => clearInterval(zoomInterval));
      btn.addEventListener("mouseleave", () => clearInterval(zoomInterval));
    });
  });

  /**
   * Enhanced Interactive Features
   */

  // Parallax effect on scroll for enhanced depth
  function paralaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    parallaxElements.forEach(el => {
      const scrollPosition = window.scrollY;
      const elementOffset = el.getBoundingClientRect().top;
      const distance = scrollPosition + elementOffset;
      const yPos = distance * 0.5;
      el.style.backgroundPosition = `center ${yPos}px`;
    });
  }

  window.addEventListener('scroll', paralaxEffect);

  // Add ripple effect to buttons and interactive elements
  function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn, [role="button"], .details-link, .preview-link');
    
    buttons.forEach(btn => {
      if (btn.classList.contains('ripple-added')) return;
      btn.classList.add('ripple-added');
      
      btn.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // Add observer for smooth animations when elements come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Trigger ripple effects
        if (entry.target.querySelector('button, .btn, [role="button"]')) {
          addRippleEffect();
        }
      }
    });
  }, observerOptions);

  // Observe all sections and portfolio items
  document.querySelectorAll('section, .portfolio-item, .service-item, .resume-item, .testimonial-item, .features-item').forEach(el => {
    observer.observe(el);
  });

  // Enhanced scroll interactions for stats/counters
  let hasCountedUp = false;
  const statsSection = document.querySelector('.stats');
  
  if (statsSection) {
    const statObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasCountedUp) {
        hasCountedUp = true;
        const statsItems = document.querySelectorAll('.stats-item span');
        
        statsItems.forEach(item => {
          const finalValue = parseInt(item.getAttribute('data-purecounter'));
          if (!isNaN(finalValue)) {
            let currentValue = 0;
            const increment = finalValue / 50;
            const interval = setInterval(() => {
              currentValue += increment;
              if (currentValue >= finalValue) {
                item.textContent = finalValue;
                clearInterval(interval);
              } else {
                item.textContent = Math.floor(currentValue);
              }
            }, 30);
          }
        });
      }
    }, { threshold: 0.5 });
    
    statObserver.observe(statsSection);
  }

  // Smooth page transitions
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // ESC key closes mobile nav
    if (e.key === 'Escape' && document.querySelector('body.mobile-nav-active')) {
      mobileNavToogle();
    }
    
    // Tab key for accessibility
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
  });

  // Resize observer for responsive adjustments
  const resizeObserver = new ResizeObserver(() => {
    // Recalculate layouts on resize
    const isotopeContainers = document.querySelectorAll('.isotope-container');
    if (isotopeContainers.length > 0 && window.Isotope) {
      isotopeContainers.forEach(container => {
        if (container.Isotope) {
          container.Isotope.layout();
        }
      });
    }
  });

  // Observe for responsive changes
  if (document.body) {
    resizeObserver.observe(document.body);
  }

  // Add loading state for slower networks
  document.addEventListener('ajaxStart', () => {
    document.body.classList.add('loading');
  });

  document.addEventListener('ajaxStop', () => {
    document.body.classList.remove('loading');
  });

  // Enhance form interactions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement?.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement?.classList.remove('focused');
        }
      });
      
      input.addEventListener('change', function() {
        this.parentElement?.classList.add('has-value');
      });
    });
  });

  // Responsive table adjustments
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    if (window.innerWidth < 768) {
      table.classList.add('table-responsive');
    }
  });

  window.addEventListener('resize', () => {
    tables.forEach(table => {
      if (window.innerWidth < 768) {
        table.classList.add('table-responsive');
      } else {
        table.classList.remove('table-responsive');
      }
    });
  });

  // Performance: Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }
})();