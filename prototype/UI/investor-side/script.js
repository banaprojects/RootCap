document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const navLinks = document.querySelectorAll(".nav-links a:not(.dropdown a)");
  const dropdownLinks = document.querySelectorAll(".dropdown a");
  const pages = document.querySelectorAll(".content");
  const viewAsFarmerBtn = document.getElementById("viewAsFarmer");
  const actionButtons = document.querySelectorAll(".action-buttons button");

  // Debug: Check if button is found
  if (!viewAsFarmerBtn) {
    console.error("View As Farmer button not found!");
  } else {
    console.log("View As Farmer button found.");
  }

  // Function to switch pages with smooth fade transition
  function showPage(pageId) {
    // Fade out the current active page
    const currentPage = document.querySelector(".content.active");
    if (currentPage) {
      currentPage.style.opacity = "0";
      currentPage.classList.remove("active");
    }

    // Fade in the new page after a short delay
    const targetPage = document.getElementById(pageId);
    setTimeout(() => {
      targetPage.classList.add("active");
      // Trigger reflow to ensure opacity transition restarts
      void targetPage.offsetWidth;
      targetPage.style.opacity = "1";
    }, 300); // Match the CSS transition duration (0.3s)

    // Update nav link highlighting
    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  // Navbar link event listeners
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");
      if (pageId !== "account" && !link.classList.contains("active")) {
        showPage(pageId);
      }
    });
    link.addEventListener("mouseover", () => link.style.transition = "all 0.3s ease");
    link.addEventListener("mouseout", () => link.style.transition = "all 0.3s ease");
  });

  // Dropdown link event listeners
  dropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = link.getAttribute("data-action");
      switch (action) {
        case "settings":
          alert("Opening Settings - Adjust your investment preferences.");
          break;
        case "update-profile":
          alert("Update Profile - Edit your investor details here.");
          break;
        case "metrics":
          alert("Metrics - View detailed investment performance stats.");
          break;
        case "logout":
          if (confirm("Are you sure you want to log out?")) {
            alert("Logging out - Redirecting to login page.");
            window.location.href = "../../index.html";
          }
          break;
      }
    });
  });

  // View As Farmer button
  if (viewAsFarmerBtn) {
    viewAsFarmerBtn.addEventListener("click", () => {
      console.log("View As Farmer button clicked.");
      if (confirm("Switch to Farmer POV? This will reload the page.")) {
        console.log("Redirecting to index.html");
        window.location.href = "../farmer-side/index.html";
      }
    });
  }

  // Action buttons with demo feedback
  actionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const buttonText = button.textContent.trim();
      switch (buttonText) {
        case "Find Farms":
          alert("Exploring farms - Browse investment opportunities.");
          showPage("find-farms");
          break;
        case "Check Returns":
          alert("Checking returns - $6K expected in July 2025.");
          break;
        case "Message Farmers":
          alert("Messaging farmers - 3 new replies pending.");
          break;
        case "Apply Filters":
          alert("Applying filters - Showing matching farm opportunities.");
          break;
        case "Invest Now":
          alert("Investing - Committing $25K to selected farm.");
          break;
        case "Save Farm":
          alert("Farm saved - Added to your watchlist.");
          break;
        case "Mark All Read":
          alert("All notifications marked as read.");
          break;
        case "Clear All":
          if (confirm("Clear all notifications?")) {
            alert("Notifications cleared.");
          }
          break;
        case "View Details":
          alert("Viewing farm details - Full report available.");
          break;
        case "View Report":
          alert("Viewing investment report - ROI and updates.");
          break;
        default:
          alert(`Action: ${buttonText} - Functionality not implemented.`);
      }
    });
  });

  // Initialize to dashboard with initial fade-in
  const initialPage = document.getElementById("dashboard");
  initialPage.classList.add("active");
  setTimeout(() => {
    initialPage.style.opacity = "1";
  }, 0);

  // Add CSS for fade transition
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .content {
      transition: opacity 0.3s ease;
      opacity: 0;
      display: none; /* Ensure non-active pages are hidden */
    }
    .content.active {
      opacity: 1;
      display: flex; /* Restore flex layout when active */
    }
  `;
  document.head.appendChild(styleSheet);
});