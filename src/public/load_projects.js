// const Data = require('./projects.json');
const Data = {
  projects: [
    {
      name: 'Werewolf',
      label: 'Multiplayer Role Playing Game',
      images: [
        'https://github.com/adelgado0723/Werewolf/blob/master/Client/images/WereWolf_512x512.gif',
        'https://picsum.photos/id/103/250/250',
        'https://picsum.photos/id/141/250/250',
        'https://picsum.photos/id/301/250/250',
      ],
      background: 'https://picsum.photos/id/555/800/800',
      summary:
        'Werewolf! takes place in a chat room where users play the role of villagers investigating a series of crimes. They don’t know who the murderer is, but they do know that he/she passes off as a villager during the day. This has led them to adopt the practice of casting out one villager per day in hopes of casting out the murderer.',
      technologies: ['Python', 'Tkinter', 'TCP Sockets', 'Node', 'Express'],
      github: 'https://github.com/adelgado0723/Werewolf',
      demo: '',
    },
    {
      name: 'Geek Peek',
      label: 'Nerdy Book Store',
      images: [
        'https://picsum.photos/id/121/250/250',
        'https://picsum.photos/id/133/250/250',
        'https://picsum.photos/id/147/250/250',
      ],
      background: 'https://picsum.photos/id/528/800/800',
      summary:
        'Geek Peek is an online bookstore in the spirit of the website, <a href="https://www.thinkgeek.com">ThinkGeek.com</a>. It was developed over the course of five two-week sprints using Agile/SCRUM methodologies.',
      technologies: [
        'Django',
        'Python',
        'SQLite',
        'JavaScript',
        'HTML',
        'CSS',
        'BootStrap',
      ],
      github: 'https://github.com/adelgado0723/GeekPeek',
      demo: '',
    },
    {
      name: 'Decision Tree Generator',
      label: 'Data-driven Decision Making',
      images: [
        'https://picsum.photos/id/383/250/250',
        'https://picsum.photos/id/243/250/250',
        'https://picsum.photos/id/135/250/250',
        'https://picsum.photos/id/343/250/250',
        'https://picsum.photos/id/459/250/250',
        'https://picsum.photos/id/249/250/250',
      ],
      background: 'https://picsum.photos/id/657/800/800',
      summary:
        "Decision Trees are a way of finding correlations in people's behavior from data about their habits. This program builds a decision tree based on a given input file and then proceeds to classify a user-provided tuple of data. In the example below, the input file holds information that a computer manufacturing company has collected about their customers. The Decision Tree Generator will attempt to find other factors and combinations of factors (such as age, income, and student status) related to that a customer's is likeliness to make a purchase.",
      technologies: ['Java', 'Machine Learning'],
      github: 'https://github.com/adelgado0723/DecisionTreeGenerator',
      demo: '',
    },
  ],
};

const modalClose = document.querySelector('.modal-close');
const galleryContainer = document.querySelector('.gallery-container');
const galleryModal = document.querySelector('.gallery-modal');
const projectName = document.querySelector('.project-name');
const smallCarouselImages = document.querySelector('.carousel-smaller');
const activeCarouselImage = document.querySelector('.active-large');
const projectSummary = document.querySelector('.summary');
const projectTechnologies = document.querySelector('.technologies');
const projectSrcForm = document.querySelector('.src-form');
const projectDemoForm = document.querySelector('.demo-form');
const body = document.querySelector('body');
// const fadingActiveImage = document.querySelector('.fading');

function fadeImage(imageURL) {
  // activeCarouselImage.src = imageURL;
  // setTimeout(function changeFadeImage() {
  //   fadingActiveImage.src = imageURL;
  //   fadingActiveImage.classList.remove('fading');
  //   fadingActiveImage.classList.remove('fading');
  // }, 500);
}
function handleGalleryClick(event) {
  // TODO: add transition
  // fadingActiveImage.classList.remove('fading');
  // activeCarouselImage.classList.add('fading');
  // fadeImage(this.src);

  activeCarouselImage.src = this.src;
}

// Creates imageElements property on each project in the
// projects array.
Data.projects.forEach(function createImgElements(project) {
  // Making an HTML img element from each project
  project.imageElements = project.images.map(function makeCarouselItem(
    url,
    index
  ) {
    const carouselImage = document.createElement('img');
    carouselImage.src = url;
    carouselImage.alt = project.name + ' Image';
    carouselImage.setAttribute('data-index', index);

    carouselImage.addEventListener('click', handleGalleryClick);
    return carouselImage;
  });
});

// Uses data from each project and to create DOM elements
Data.projects.forEach(function loadProjects(project) {
  const projectEntry = document.createElement('div');
  projectEntry.classList.add('gallery-item');

  // Sets up the image displayed in the gallery using
  // the passed in project
  projectEntry.innerHTML = `     
    <div class="img-container">
      <div class="img">
        <div class="img-overlay"></div>
        <div class="gallery-label">
          <h2>${project.name}</h2>
          <span class="gallery-sublabel">${project.label}</span>
        </div>
      </div>
    </div>
  `;

  const background = projectEntry.querySelector('.img');
  background.style.backgroundImage = `url(${project.background})`;

  // Creates an event listener that sets up the modal context
  projectEntry.addEventListener('click', setUpModalContext);

  galleryContainer.appendChild(projectEntry);

  function setUpModalContext() {
    projectName.textContent = project.name;
    // projectDesc.textContent = project.info;
    activeCarouselImage.src = project.images[0];
    activeCarouselImage.alt = project.name + ' image';
    projectSummary.innerHTML = project.summary;
    projectSrcForm.setAttribute('action', project.github);
    projectDemoForm.setAttribute('action', project.demo);
    projectTechnologies.innerHTML = project.technologies
      .map(makeTechList)
      .join('');

    // fadingActiveImage.src = project.images[0];
    // fadingActiveImage.classList.remove('fading');
    smallCarouselImages.innerHTML = '';
    // Setting up the carousel images
    project.imageElements.forEach(function attachCarouselImages(image) {
      smallCarouselImages.appendChild(image);
    });

    body.style.overflowY = 'hidden';

    galleryModal.classList.add('is-visible');
    function makeTechList(tech) {
      return `<span>${tech}</span>`;
    }
  }
});

modalClose.addEventListener('click', function addCloseButtonListener() {
  galleryModal.classList.remove('is-visible');
  body.style.overflowY = 'scroll';
});
