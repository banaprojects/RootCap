document.addEventListener("DOMContentLoaded", function() {
    const path = document.getElementById("myPath");
    const length = path.getTotalLength();
  
    // Set initial stroke properties
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  
    // Update drawing on scroll
    window.addEventListener("scroll", function() {
      const scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / 
                           (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const drawLength = length * scrollPercent;
      path.style.strokeDashoffset = length - drawLength;
    });
  });