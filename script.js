document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // Dark Mode Toggle
  // ============================================
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const html = document.documentElement;

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      html.classList.toggle("dark");
      const isDark = html.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // جلب الأيقونات
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  function toggleIcons(isOpen) {
    if (isOpen) {
      // حالة فتح المنيو (تظهر الـ X الحمراء)
      hamburgerIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");

      mobileMenuBtn.classList.add("hover:bg-red-50");
      mobileMenuBtn.classList.remove("hover:bg-gray-100");
    } else {
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");

      mobileMenuBtn.classList.remove("hover:bg-red-50");
      mobileMenuBtn.classList.add("hover:bg-gray-100");
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("hidden");

      const isMenuOpen = !mobileMenu.classList.contains("hidden");

      toggleIcons(isMenuOpen);
      mobileMenuBtn.setAttribute("aria-expanded", isMenuOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        toggleIcons(false);
      });
    });
  }

  // ============================================
  // Smooth Scrolling for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // Header Scroll Effect (add shadow on scroll)
  // ============================================
  const header = document.querySelector("header");

  const handleScroll = () => {
    if (window.scrollY > 10) {
      header?.classList.add("shadow-md");
    } else {
      header?.classList.remove("shadow-md");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ============================================
  // Feature Cards - Enhanced Hover
  // ============================================
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 25px 50px -12px #000000";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
    });
  });

  // ============================================
  // Portfolio Cards - Image Zoom on Hover
  // ============================================
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  portfolioCards.forEach((card) => {
    const img = card.querySelector("img");
    if (!img) return;

    card.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05)";
      card.style.boxShadow = "0 25px 50px -12px #000000";
    });

    card.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
      card.style.boxShadow = "";
    });
  });

  // ============================================
  // CTA Buttons - Ripple Effect (optional)
  // ============================================
  const ctaButtons = document.querySelectorAll(".cta-btn");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: #ffffff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================
  // Projects Page - Filtering & Empty State
  // ============================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const noProjectsMessage = document.getElementById("no-projects-message");

  if (filterButtons.length && projectCards.length) {
    const activateFilterButton = (activeButton) => {
      filterButtons.forEach((btn) => {
        btn.classList.remove(
          "bg-blue-600",
          "text-white",
          "border-blue-600",
          "shadow-md"
        );
        btn.classList.add("bg-white", "text-gray-700", "border-gray-200");
      });

      activeButton.classList.add(
        "bg-blue-600",
        "text-white",
        "border-blue-600",
        "shadow-md"
      );
      activeButton.classList.remove(
        "bg-white",
        "text-gray-700",
        "border-gray-200"
      );
    };

    const showCard = (card) => {
      card.classList.remove("hidden", "opacity-0", "scale-95");
      card.classList.add("opacity-100", "scale-100");
    };

    const hideCard = (card) => {
      card.classList.remove("opacity-100", "scale-100");
      card.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        if (card.classList.contains("opacity-0")) {
          card.classList.add("hidden");
        }
      }, 200);
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");

        activateFilterButton(button);

        let anyMatch = false;

        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category");

          if (filterValue === "all" || category === filterValue) {
            anyMatch = true;
            showCard(card);
          } else {
            hideCard(card);
          }
        });

        if (noProjectsMessage) {
          if (anyMatch) {
            noProjectsMessage.classList.add("hidden");
          } else {
            noProjectsMessage.classList.remove("hidden");
          }
        }
      });
    });
  }
});
