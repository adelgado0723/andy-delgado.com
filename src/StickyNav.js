const navLinks = document.querySelector('.top');
let topOfNav = navLinks.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = navLinks.offsetHeight + 'px';
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

window.addEventListener('scroll', fixNav);
