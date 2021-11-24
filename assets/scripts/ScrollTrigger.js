/**
 * ==== DEFAULT OPTIONS ====
 * desktop: 70   (screen height percentage)
 * mobile: 80   (screen height percentage)
 * remake: true   (repetition of the animation on going up and down again )
 */

const Options = {}

const ScrollTrigger = {
  nodes: [],

  getNodes() {
    const styleEl = document.querySelector('head style#easy-scroll-animation')
    const CSSCodeString = styleEl.innerText

    const selectors = CSSCodeString.substring(
      CSSCodeString.indexOf("/*") + 2,
      CSSCodeString.lastIndexOf("*/")
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
    return (typeof Options !== 'undefined' && typeof Options.remake !== 'undefined') ? Options.remake : true
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