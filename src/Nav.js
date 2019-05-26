const triggers = document.querySelectorAll('.nav-links > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');
const title = document.querySelector('h1');

let topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    // document.body.classList.add('follow-off');

    document.body.classList.add('fixed-nav');
    // document.body.one('transitioned', function() {
    //   document.body.classList.remove('follow-off');
    // });
  } else {
    // document.body.classList.add('follow-off');
    document.body.classList.remove('fixed-nav');
    // document.body.one('transitioned', function() {
    //   document.body.classList.remove('follow-off');
    // });
    document.body.style.paddingTop = 0;
    // document.body.style.top = 0;
  }
}

function handleEnter() {
  this.classList.add('trigger-enter');
  // Inside of setTimeout, we use an arrow function so that
  // "this" will be the same "this"as in the calling parent element
  setTimeout(() => {
    // The "&&" makes sure that the second class is only added if
    // "this" contains the first one
    this.classList.contains('trigger-enter') &&
      this.classList.add('trigger-enter-active');
  }, 150);
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height, // - margin,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top, //+ margin,
    left: dropdownCoords.left - navCoords.left,
  };
  // console.log(`Coords => ` + JSON.stringify(coords));
  // console.log(`Nav Coords => ` + JSON.stringify(navCoords));
  // Setting position and size of the background div

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty(
    'transform',
    `translate(${coords.left}px, ${coords.top}px)`
  );
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave)
);

window.addEventListener('scroll', fixNav);
