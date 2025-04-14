// Curriculum data
const oceanNavigatorCurriculum = [
    {
        title: "Marine Biology",
        description: "Extensive experience in marine ecosystems and conservation"
    },
    {
        title: "Diving Expertise",
        description: "Certified professional diver with years of underwater exploration"
    },
    {
        title: "Environmental Advocacy",
        description: "Active participation in marine conservation initiatives"
    }
];

const earthWhispererCurriculum = [
    {
        title: "Plant Biology",
        description: "PhD in Plant Biology with focus on sustainable agriculture"
    },
    {
        title: "Mindfulness Practice",
        description: "Certified yoga instructor and mindfulness coach"
    },
    {
        title: "Nature Connection",
        description: "Expert in bridging scientific knowledge with spiritual practice"
    }
];

// Function to create curriculum items
function createCurriculumItem(item) {
    const div = document.createElement('div');
    div.className = 'curriculum-item';
    div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
    `;
    return div;
}

// Function to populate curriculum sections
function populateCurriculums() {
    const oceanContent = document.querySelector('.profile-column:first-child .curriculum-content');
    const earthContent = document.querySelector('.profile-column:last-child .curriculum-content');

    oceanNavigatorCurriculum.forEach(item => {
        oceanContent.appendChild(createCurriculumItem(item));
    });

    earthWhispererCurriculum.forEach(item => {
        earthContent.appendChild(createCurriculumItem(item));
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateCurriculums();
}); 