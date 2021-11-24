const Options = {}

const ScrollTrigger = {
  nodes: [],

  getNodes() {
    const stringSelectors = document.querySelector('head #scroll-animation').innerText
    const selectors = stringSelectors.substring(
      stringSelectors.indexOf("/*") + 2,
      stringSelectors.lastIndexOf("*/")
    ).split('$')

    for (let selector of selectors) {
      const nodeList = document.querySelectorAll(selector.trim())
      nodeList.forEach(node => this.nodes.push(node))
    }
  },

  screenPercentage() {
    if (window.innerWidth > 480) {
      return (typeof Options !== 'undefined' && typeof Options.desktop !== 'undefined') ? Options.desktop : 70
    } else {
      return (typeof Options !== 'undefined' && typeof Options.mobile !== 'undefined') ? Options.mobile : 80
    }
  },

  animationRemake() {
    if (typeof Options !== 'undefined' && typeof Options.remake !== 'undefined') {
      return Options.remake
    } else {
      return true
    }
  },

  checkNodes() {
    const percentage = this.screenPercentage()
    const remake = this.animationRemake()
    const trigger = window.innerHeight * percentage / 100

    for (let node of this.nodes) {
      const elTop = node.getBoundingClientRect().top

      if (elTop < trigger) {
        node.classList.add('animate')
      } else if (remake) {
        node.classList.remove('animate')
      }
    }
  },

  start() {
    this.getNodes()
    this.checkNodes()
    window.onscroll = () => this.checkNodes()
  }
}

window.onload = () => ScrollTrigger.start()