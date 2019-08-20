const body = document.querySelector('body');
const nav = document.querySelector('.top');
const navLinks = nav.querySelectorAll('li');

let topOfNav = nav.offsetTop;
// console.log(`Top of Nav = ${topOfNav}`);

function fixNav() {
  //   console.log(window.scrollY);

  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

function scrollToElem(e) {
  // console.log(e);
  e.preventDefault();
  const href = this.querySelector('a').getAttribute('href');
  const offset = document.querySelector(href).offsetTop;
  // console.log(`Section offsetTop = ${offset}`);
  scrollTo(offset, 500);
}

function scrollTo(position, duration) {
  var start = window.scrollY,
    change = position - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // console.log(val);
    // The 80 here represnts space above the item we're scrolling to
    window.scrollTo(0, val - 80);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

window.addEventListener('scroll', fixNav);
navLinks.forEach((link) => link.addEventListener('click', scrollToElem));
