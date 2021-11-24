const Options = {}

const string = document.querySelector('head #scroll-animation').innerText

const selectors = string.substring(
  string.indexOf("/*") + 2,
  string.lastIndexOf("*/")
).split('$')

const nodes = []

for (let selector of selectors) {
  const nodeList = document.querySelectorAll(selector.trim())
  nodeList.forEach(node => nodes.push(node))
}

const checkNodes = () => {
  let percentage
  let remake

  if (window.innerWidth > 480) {
    percentage = (typeof Options !== 'undefined' && typeof Options.desktop !== 'undefined') ? Options.desktop : 70
  } else {
    percentage = (typeof Options !== 'undefined' && typeof Options.mobile !== 'undefined') ? Options.mobile : 80
  }

  if (typeof Options !== 'undefined' && typeof Options.remake !== 'undefined') {
    remake = Options.remake
  } else {
    remake = true
  }

  const trigger = window.innerHeight * percentage / 100

  for (let node of nodes) {
    const elTop = node.getBoundingClientRect().top

    if (elTop < trigger) {
      node.classList.add('animate')
    } else if (remake) {
      node.classList.remove('animate')
    }
  }
}

window.onscroll = () => checkNodes()
checkNodes()