// Function to get or create user ID
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Function to toggle comments visibility
function toggleComments(articleId) {
    const commentsContainer = document.getElementById(`comments-${articleId}`);
    const button = commentsContainer.previousElementSibling;
    
    if (commentsContainer.style.display === 'none') {
        commentsContainer.style.display = 'block';
        button.innerHTML = '<i class="fas fa-comments"></i> Hide Comments';
        loadComments(articleId);
    } else {
        commentsContainer.style.display = 'none';
        button.innerHTML = '<i class="fas fa-comments"></i> Show Comments';
    }
}

// Function to submit a new comment
function submitComment(event, articleId) {
    event.preventDefault();
    
    const nameInput = document.getElementById(`name-${articleId}`);
    const commentInput = document.getElementById(`comment-${articleId}`);
    
    const comment = {
        id: Date.now(),
        userId: getUserId(), // Add user ID to the comment
        name: nameInput.value,
        text: commentInput.value,
        date: new Date().toISOString()
    };
    
    // Get existing comments
    let comments = JSON.parse(localStorage.getItem(`comments-${articleId}`) || '[]');
    comments.push(comment);
    
    // Save comments
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));
    
    // Clear form
    nameInput.value = '';
    commentInput.value = '';
    
    // Refresh comments display
    loadComments(articleId);
}

// Function to edit a comment
function editComment(articleId, commentId) {
    const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`) || '[]');
    const comment = comments.find(c => c.id === commentId);
    
    if (!comment) return;
    
    // Check if the current user is the author of the comment
    if (comment.userId !== getUserId()) {
        alert('You can only edit your own comments.');
        return;
    }
    
    const newText = prompt('Edit your comment:', comment.text);
    if (newText === null) return; // User cancelled
    
    comment.text = newText;
    comment.editDate = new Date().toISOString();
    
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));
    loadComments(articleId);
}

// Function to delete a comment
function deleteComment(articleId, commentId) {
    const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`) || '[]');
    const comment = comments.find(c => c.id === commentId);
    
    if (!comment) return;
    
    // Check if the current user is the author of the comment
    if (comment.userId !== getUserId()) {
        alert('You can only delete your own comments.');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    const updatedComments = comments.filter(c => c.id !== commentId);
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(updatedComments));
    loadComments(articleId);
}

// Function to load and display comments
function loadComments(articleId) {
    const commentsList = document.getElementById(`comments-list-${articleId}`);
    const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`) || '[]');
    const currentUserId = getUserId();
    
    commentsList.innerHTML = '';
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="text-muted">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment mb-3 p-3 border rounded';
        
        const date = new Date(comment.date).toLocaleDateString();
        const editDate = comment.editDate ? ` (edited ${new Date(comment.editDate).toLocaleDateString()})` : '';
        const isAuthor = comment.userId === currentUserId;
        
        commentElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>${escapeHtml(comment.name)}</strong>
                <div class="d-flex align-items-center gap-2">
                    <small class="text-muted">${date}${editDate}</small>
                    ${isAuthor ? `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-secondary btn-sm" onclick="editComment('${articleId}', ${comment.id})" title="Edit comment">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteComment('${articleId}', ${comment.id})" title="Delete comment">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
            <p class="mb-0">${escapeHtml(comment.text)}</p>
        `;
        
        commentsList.appendChild(commentElement);
    });
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
} 