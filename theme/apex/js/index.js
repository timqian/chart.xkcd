/**
 * Setup.
 */

const items = document.querySelectorAll('.Page')
const links = document.querySelectorAll('.Menu a')
const hamburger = document.getElementById('hamburger')
const sidebar = document.getElementById('sidebar')
const contentWrapper = document.getElementById('content-wrapper')

/**
 * Check if `el` is out out of view.
 */

function isBelowScroll(el) {
  return el.getBoundingClientRect().bottom > 0
}

/**
 * Activate item `i`.
 */

function activateItem(i) {
  links.forEach(e => e.classList.remove('active'))
  links[i].classList.add('active')
}

/**
 * Activate the correct menu item for the
 * contents in the viewport.
 */

function activate() {
  let i = 0

  for (; i < items.length; i++) {
    if (isBelowScroll(items[i])) {
      break
    }
  }

  activateItem(i)
}

/**
 * Toggle sidebar visibility on mobile.
 */

function toggleSidebar() {
  hamburger.classList.toggle('active')
  sidebar.classList.toggle('active')
  contentWrapper.classList.toggle('sidebar-open')
}

/**
 * Close sidebar when clicking on a menu link.
 */

function closeSidebarOnLink() {
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active')
      sidebar.classList.remove('active')
      contentWrapper.classList.remove('sidebar-open')
    })
  })
}

/**
 * Close sidebar when clicking outside.
 */

document.addEventListener('click', (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target)
  const isClickOnHamburger = hamburger.contains(e.target)

  if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
    hamburger.classList.remove('active')
    sidebar.classList.remove('active')
    contentWrapper.classList.remove('sidebar-open')
  }
})

/**
 * Activate scroll spy thingy.
 */

window.addEventListener('scroll', e => activate())

/**
 * Setup hamburger menu.
 */

hamburger.addEventListener('click', toggleSidebar)
closeSidebarOnLink()
