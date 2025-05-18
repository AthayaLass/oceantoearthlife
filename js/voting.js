// Voting system implementation
const VOTE_STORAGE_KEY = 'article_votes';
const USER_VOTES_KEY = 'user_votes';

// Initialize votes from localStorage or create new object
function initializeVotes() {
    const storedVotes = localStorage.getItem(VOTE_STORAGE_KEY);
    return storedVotes ? JSON.parse(storedVotes) : {};
}

// Initialize user votes from localStorage or create new object
function initializeUserVotes() {
    const storedUserVotes = localStorage.getItem(USER_VOTES_KEY);
    return storedUserVotes ? JSON.parse(storedUserVotes) : {};
}

// Save votes to localStorage
function saveVotes(votes) {
    localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(votes));
}

// Save user votes to localStorage
function saveUserVotes(userVotes) {
    localStorage.setItem(USER_VOTES_KEY, JSON.stringify(userVotes));
}

// Update vote count display
function updateVoteDisplay(articleId) {
    const votes = initializeVotes();
    const voteData = votes[articleId] || { upvotes: 0, downvotes: 0 };
    const container = document.querySelector(`[data-article-id="${articleId}"]`);
    
    if (container) {
        const voteCount = container.querySelector('.vote-count');
        const totalVotes = container.querySelector('.total-votes');
        const upvoteBtn = container.querySelector('.upvote');
        const downvoteBtn = container.querySelector('.downvote');
        
        const userVotes = initializeUserVotes();
        const userVote = userVotes[articleId];
        
        // Update vote count
        voteCount.textContent = voteData.upvotes - voteData.downvotes;
        
        // Update total votes
        totalVotes.textContent = `Total votes: ${voteData.upvotes + voteData.downvotes}`;
        
        // Update button states
        upvoteBtn.classList.toggle('active', userVote === 'up');
        downvoteBtn.classList.toggle('active', userVote === 'down');
    }
}

// Handle vote action
function handleVote(articleId, voteType) {
    const votes = initializeVotes();
    const userVotes = initializeUserVotes();
    
    // Initialize article votes if not exists
    if (!votes[articleId]) {
        votes[articleId] = { upvotes: 0, downvotes: 0 };
    }
    
    // Get current user vote for this article
    const currentUserVote = userVotes[articleId];
    
    // If user already voted the same way, remove the vote
    if (currentUserVote === voteType) {
        votes[articleId][voteType + 'votes']--;
        delete userVotes[articleId];
    } else {
        // If user voted differently before, remove that vote first
        if (currentUserVote) {
            votes[articleId][currentUserVote + 'votes']--;
        }
        
        // Add new vote
        votes[articleId][voteType + 'votes']++;
        userVotes[articleId] = voteType;
    }
    
    // Save updated votes
    saveVotes(votes);
    saveUserVotes(userVotes);
    
    // Update display
    updateVoteDisplay(articleId);
}

// Initialize all vote displays on page load
document.addEventListener('DOMContentLoaded', () => {
    const voteContainers = document.querySelectorAll('.vote-container');
    voteContainers.forEach(container => {
        const articleId = container.dataset.articleId;
        updateVoteDisplay(articleId);
    });
}); 