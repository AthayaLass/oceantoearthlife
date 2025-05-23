// blog.js - Handles blog post creation, display, and pagination

// Number of posts per page
const POSTS_PER_PAGE = 5;

// Get references to DOM elements for blog
const blogForm = document.getElementById('blogForm');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const blogPosts = document.getElementById('blogPosts');
const pagination = document.getElementById('pagination');

// Load posts from localStorage or initialize empty array
let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
let currentPage = 1;


// Track active filters
let activeFilters = new Set();

/**
 * Toggle tag filter on/off
 * @param {string} tag - The tag to toggle ('ocean', 'earth', or 'life')
 */
function toggleTagFilter(tag) {
  const filterButton = document.querySelector(`.tag-filter.${tag}`);
  
  // Toggle active state
  if (activeFilters.has(tag)) {
    activeFilters.delete(tag);
    filterButton.classList.remove('active');
  } else {
    activeFilters.add(tag);
    filterButton.classList.add('active');
  }
  
  // Filter articles
  filterArticles();
}

/**
 * Filter articles based on active tags
 */
function filterArticles() {
  const articles = document.querySelectorAll('.article-item');
  
  articles.forEach(article => {
    const articleTags = Array.from(article.querySelectorAll('.tag'))
      .map(tag => tag.classList[1]); // Get the tag class (ocean, earth, or life)
    
    if (activeFilters.size === 0) {
      // No filters active, show all articles
      article.classList.remove('hidden');
    } else {
      // Show article if it has any of the active tags
      const hasActiveTag = articleTags.some(tag => activeFilters.has(tag));
      article.classList.toggle('hidden', !hasActiveTag);
    }
  });
}

// Function to save posts to localStorage
function savePosts() {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Function to render posts for the current page
function renderPosts() {
  blogPosts.innerHTML = '';
  // Calculate start and end index for current page
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, end);

  // Display each post
  pagePosts.forEach((post, idx) => {
    const postDiv = document.createElement('div');
    postDiv.style.marginBottom = '2rem';
    postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p><small>${post.date}</small>`;
    if (deleteMode) {
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'button ms-2';
      deleteBtn.style.background = '#e74c3c';
      deleteBtn.style.color = '#fff';
      deleteBtn.onclick = function() {
        // Find the correct index in the posts array
        const globalIdx = start + idx;
        if (confirm('Are you sure you want to delete this post?')) {
          posts.splice(globalIdx, 1);
          savePosts();
          renderPosts();
        }
      };
      postDiv.appendChild(deleteBtn);
    }
    blogPosts.appendChild(postDiv);
  });

  renderPagination();
}

// Function to render pagination controls
function renderPagination() {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'button';
    btn.style.margin = '0 0.25rem';
    if (i === currentPage) btn.style.background = '#F4B183';
    btn.onclick = () => {
      currentPage = i;
      renderPosts();
    };
    pagination.appendChild(btn);
  }
}

// Handle form submission to add a new post
if (blogForm) {
  blogForm.onsubmit = function(e) {
    e.preventDefault();
    const title = postTitle.value.trim();
    const content = postContent.value.trim();
    if (!title || !content) return;
    const date = new Date().toLocaleString();
    posts.unshift({ title, content, date }); // Add new post to the top
    savePosts();
    postTitle.value = '';
    postContent.value = '';
    currentPage = 1; // Go to first page
    renderPosts();
  };
}

// Initial render
renderPosts();

/**
 * Toggle article content visibility
 * @param {HTMLElement} header - The article header element that was clicked
 */
function toggleArticle(header) {
  const article = header.parentElement;
  const content = article.querySelector('.article-content');
  const toggleButton = article.querySelector('.toggle-article i');
  
  // Toggle active class on article
  article.classList.toggle('active');
  
  // Toggle content visibility
  content.classList.toggle('active');
  
  // Toggle icon
  if (content.classList.contains('active')) {
    toggleButton.classList.remove('fa-plus');
    toggleButton.classList.add('fa-minus');
  } else {
    toggleButton.classList.remove('fa-minus');
    toggleButton.classList.add('fa-plus');
  }
}

/**
 * Toggle card open/close functionality
 * This function handles the expansion and collapse of cards in the about page
 * It manages the visual effects, button states, and content visibility
 * 
 * @param {string} card - The identifier of the card to toggle ('ocean' or 'earth')
 */
function toggleCard(card) {
  const content = document.getElementById(card + '-content');
  const btn = document.getElementById('toggle-' + card);
  const cardElement = document.getElementById(card + '-card');
  const headerElement = cardElement.querySelector('.card-header');
  
  if (content.style.display === 'none') {
    // Expand card
    content.style.display = 'block';
    btn.innerHTML = '<i class="fas fa-moon"></i>';
    btn.style.color = '#000';
    btn.style.transform = 'scale(1.1)';
    cardElement.style.background = card === 'ocean' ? 'rgba(92, 169, 179, 0.75)' : 'rgba(125, 165, 122, 0.75)';
    headerElement.style.background = card === 'ocean' ? 'rgba(92, 169, 179, 0.75)' : 'rgba(125, 165, 122, 0.75)';
    
    // Apply directional lighting effect based on card position
    if (card === 'ocean') {
      cardElement.style.boxShadow = '25px -25px 50px -5px rgba(244, 177, 131, 0.9)';
      cardElement.style.backgroundImage = 'radial-gradient(circle at 70% 30%, rgba(244, 177, 131, 0.6), transparent 90%)';
    } else {
      cardElement.style.boxShadow = '-25px -25px 50px -5px rgba(244, 177, 131, 0.9)';
      cardElement.style.backgroundImage = 'radial-gradient(circle at 30% 30%, rgba(244, 177, 131, 0.6), transparent 90%)';
    }
  } else {
    // Collapse card
    content.style.display = 'none';
    btn.innerHTML = '<i class="fas fa-sun"></i>';
    btn.style.color = '#000';
    btn.style.transform = 'scale(1)';
    cardElement.style.background = card === 'ocean' ? 'rgba(92, 169, 179, 0.5)' : 'rgba(125, 165, 122, 0.5)';
    headerElement.style.background = card === 'ocean' ? 'rgba(92, 169, 179, 0.5)' : 'rgba(125, 165, 122, 0.5)';
    cardElement.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.25)';
    cardElement.style.backgroundImage = 'none';
  }
}

/**
 * Update social media share links for all articles on the page.
 */
function updateShareLinks() {
  const articles = document.querySelectorAll('.article-item');
  // Assuming the base URL structure from the existing HTML.
  // This might need adjustment if the site structure or domain changes.
  const sitePageBaseUrl = 'https://www.oceantoearth.life/en/blog.html';

  articles.forEach(article => {
    const articleId = article.id;
    if (!articleId) {
      console.warn('Article found without an ID, cannot generate share links for it.', article);
      return;
    }

    const titleElement = article.querySelector('.article-title h2');
    if (!titleElement) {
      console.warn(`Article with ID "${articleId}" is missing an H2 title, cannot generate share links.`, article);
      return;
    }
    const articleTitle = titleElement.textContent.trim();
    const encodedArticleTitle = encodeURIComponent(articleTitle);

    const articleUrl = `${sitePageBaseUrl}#${articleId}`;
    const encodedArticleUrl = encodeURIComponent(articleUrl);

    const shareButtonsContainer = article.querySelector('.social-share-buttons');
    if (!shareButtonsContainer) {
      console.warn(`Article with ID "${articleId}" is missing a .social-share-buttons container.`, article);
      return;
    }

    const twitterLink = shareButtonsContainer.querySelector('a[title="Share on Twitter"]');
    if (twitterLink) {
      twitterLink.href = `https://twitter.com/intent/tweet?url=${encodedArticleUrl}&text=${encodedArticleTitle}`;
    }

    const facebookLink = shareButtonsContainer.querySelector('a[title="Share on Facebook"]');
    if (facebookLink) {
      facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedArticleUrl}&quote=${encodedArticleTitle}`;
    }

    const linkedinLink = shareButtonsContainer.querySelector('a[title="Share on LinkedIn"]');
    if (linkedinLink) {
      // Using the article title as the summary for LinkedIn, as per existing structure.
      const encodedArticleSummary = encodedArticleTitle;
      linkedinLink.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedArticleUrl}&title=${encodedArticleTitle}&summary=${encodedArticleSummary}`;
    }
  });
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('welcomeCarousel');
  if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 7000,
      wrap: true,
      keyboard: true,
      pause: 'hover'
    });

    // Handle window resize for responsive images
    function handleResize() {
      const images = document.querySelectorAll('.carousel-image');
      images.forEach(img => {
        const container = img.closest('.carousel-image-container');
        if (container) {
          const containerWidth = container.offsetWidth;
          img.style.width = containerWidth + 'px';
        }
      });
    }

    // Initial resize
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Handle carousel slide events
    carousel.addEventListener('slid.bs.carousel', function() {
      handleResize();
    });
  }
  // Automatically update share links for all articles on page load.
  updateShareLinks();
}); 