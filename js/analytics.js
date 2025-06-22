// Google Analytics 4 Configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID

// Google Analytics 4 Tracking Code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.googletagmanager.com/gtag/js?id=G-V531WTX9CR');

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
gtag('config', 'G-V531WTX9CR', {
  page_title: document.title,
  page_location: window.location.href,
  send_page_view: true
});

// Track custom events
function trackEvent(eventName, parameters = {}) {
  gtag('event', eventName, parameters);
}

// Track page views for SPA-like navigation
function trackPageView(url) {
  gtag('config', 'G-V531WTX9CR', {
    page_location: url,
    page_title: document.title
  });
}

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
  // Track navigation clicks
  const navLinks = document.querySelectorAll('nav a, .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('navigation_click', {
        link_text: this.textContent.trim(),
        link_url: this.href,
        link_location: 'navigation'
      });
    });
  });

  // Track business card clicks
  const businessCards = document.querySelectorAll('.business-card a');
  businessCards.forEach(card => {
    card.addEventListener('click', function() {
      trackEvent('business_card_click', {
        business_name: this.querySelector('h4')?.textContent || 'Unknown',
        link_url: this.href
      });
    });
  });

  // Track contact button clicks
  const contactButtons = document.querySelectorAll('a[href*="contact"]');
  contactButtons.forEach(button => {
    button.addEventListener('click', function() {
      trackEvent('contact_click', {
        button_text: this.textContent.trim(),
        button_location: this.closest('section')?.className || 'unknown'
      });
    });
  });

  // Track language changes
  const languageSelectors = document.querySelectorAll('select[onchange*="changeLanguage"]');
  languageSelectors.forEach(selector => {
    selector.addEventListener('change', function() {
      trackEvent('language_change', {
        new_language: this.value,
        previous_language: this.getAttribute('data-previous') || 'unknown'
      });
      this.setAttribute('data-previous', this.value);
    });
  });

  // Track carousel interactions
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    carousel.addEventListener('slide.bs.carousel', function(event) {
      trackEvent('carousel_slide', {
        carousel_id: this.id,
        slide_index: event.to,
        slide_direction: event.direction
      });
    });
  });
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
    maxScrollDepth = scrollPercent;
    trackEvent('scroll_depth', {
      scroll_percentage: scrollPercent
    });
  }
});

// Track time on page
let startTime = Date.now();
window.addEventListener('beforeunload', function() {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  trackEvent('page_exit', {
    time_on_page_seconds: timeOnPage,
    page_url: window.location.href
  });
});

// Export functions for use in other scripts
window.analytics = {
  trackEvent,
  trackPageView
}; 