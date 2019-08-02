const nav = document.querySelector('.top');

let topOfNav = nav.offsetTop;
console.log(`Top of Nav = ${topOfNav}`);

function fixNav() {
  console.log(window.scrollY);

  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', fixNav);
