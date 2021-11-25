const ScrollTrigger = {
  nodes: [],

  setNodes(selectors) {
    for (let selector of selectors) {
      const nodeList = document.querySelectorAll(selector.trim())
      nodeList.forEach(node => this.nodes.push(node))
    }
  },

  getSelectorsAndOptions() {
    const styleEl = document.querySelector('head style#easy-scroll-animation')
    const cssInString = styleEl.innerText

    return cssInString.substring(
      cssInString.indexOf("/*") + 2,
      cssInString.lastIndexOf("*/")
    ).split('|||')
  },

  setNodesAndOptions() {
    const [selectors, options] = this.getSelectorsAndOptions()

    this.setNodes(selectors.split('$'))
    this.options = JSON.parse(options)
  },

  getScreenPercentage() {
    return window.innerWidth > 480 ? this.options.desktop : this.options.mobile
  },

  checkNodes() {
    const percentage = this.getScreenPercentage()
    const trigger = window.innerHeight * percentage / 100

    for (let node of this.nodes) {
      const elTop = node.getBoundingClientRect().top

      if (elTop < trigger) {
        node.classList.add('animate')
      } else if (this.options.remake) {
        node.classList.remove('animate')
      }
    }
  },

  start() {
    this.setNodesAndOptions()
    this.checkNodes()
    window.onscroll = () => this.checkNodes()
  }
}

window.onload = () => ScrollTrigger.start()