document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a:not(.dropdown a)");
  const dropdownLinks = document.querySelectorAll(".dropdown a");
  const pages = document.querySelectorAll(".content");
  const viewAsInvestorBtn = document.getElementById("viewAsInvestor");
  const actionButtons = document.querySelectorAll(".action-buttons button");
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (!menuToggle || !sidebar) {
    console.error("Menu toggle or sidebar not found!");
  } else {
    console.log("Menu toggle and sidebar initialized.");
  }

  if (!viewAsInvestorBtn) {
    console.error("View As Investor button not found!");
  } else {
    console.log("View As Investor button found.");
  }

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    sidebar.classList.toggle("active");
  });

  function showPage(pageId) {
    const currentPage = document.querySelector(".content.active");
    if (currentPage) {
      currentPage.style.opacity = "0";
      currentPage.classList.remove("active");
    }

    const targetPage = document.getElementById(pageId);
    setTimeout(() => {
      targetPage.classList.add("active");
      targetPage.style.opacity = "1";
    }, 300);

    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add("active");

    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");

      if (pageId === "account" && window.innerWidth <= 768) {
        const dropdown = link.nextElementSibling;
        dropdown.classList.toggle("active");
      } else if (pageId !== "account" && !link.classList.contains("active")) {
        showPage(pageId);
      }
    });

    link.addEventListener("mouseover", () => {
      if (window.innerWidth > 768) {
        link.style.transition = "all 0.3s ease";
      }
    });
    link.addEventListener("mouseout", () => {
      if (window.innerWidth > 768) {
        link.style.transition = "all 0.3s ease";
      }
    });
  });

  dropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = link.getAttribute("data-action");
      switch (action) {
        case "settings":
          alert("Opening Settings - Configure your account preferences.");
          break;
        case "update-profile":
          alert("Update Profile - Edit your farm details here.");
          break;
        case "metrics":
          alert("Metrics - View detailed farm performance stats.");
          break;
        case "logout":
          if (confirm("Are you sure you want to log out?")) {
            alert("Logging out - Redirecting to login page.");
            window.location.href = "../../index.html";
          }
          break;
      }
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        menuToggle.classList.remove("active");
        const dropdown = link.closest(".dropdown");
        if (dropdown) dropdown.classList.remove("active");
      }
    });
  });

  if (viewAsInvestorBtn) {
    viewAsInvestorBtn.addEventListener("click", () => {
      console.log("View As Investor button clicked.");
      if (confirm("Switch to Investor POV? This will reload the page.")) {
        console.log("Redirecting to investor.html");
        window.location.href = "../investor-side/index.html";
      }
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  }

  actionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const buttonText = button.textContent.trim();
      switch (buttonText) {
        case "Update Farm Profile":
          alert("Updating farm profile - Add new details or photos.");
          break;
        case "Post Funding Request":
          alert("Posting funding request - Seeking $10K for irrigation.");
          break;
        case "Check Messages":
          alert("Checking messages - 2 new investor inquiries.");
          break;
        case "Contact Selected":
          alert("Contacting selected investor - Sending message...");
          break;
        case "Save Search":
          alert("Search saved - Filters preserved for later.");
          break;
        case "Apply Filters":
          alert("Applying filters - Showing matching investors.");
          break;
        case "Save Favorites":
          alert("Favorites saved - Modules added to your list.");
          break;
        case "Track Progress":
          alert("Progress tracked - View your learning stats.");
          break;
        case "Continue":
        case "Start":
          alert(`${buttonText}ing module - Loading content...`);
          break;
        case "Buy":
          alert("Adding to cart - Proceeding to purchase...");
          break;
        case "Rent":
          alert("Adding to cart - Setting up rental agreement...");
          break;
        case "Add to Cart":
          alert("Items added to cart - Ready to checkout.");
          break;
        case "Save to Wishlist":
          alert("Items saved to wishlist - View anytime.");
          break;
        default:
          alert(`Action: ${buttonText} - Functionality not implemented.`);
      }
    });
  });

  const initialPage = document.getElementById("dashboard");
  initialPage.classList.add("active");
  setTimeout(() => {
    initialPage.style.opacity = "1";
  }, 0);

  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .content {
      transition: opacity 0.3s ease;
      opacity: 0;
      display: none;
    }
    .content.active {
      opacity: 1;
      display: flex;
    }
  `;
  document.head.appendChild(styleSheet);
});