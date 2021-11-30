const ScrollTrigger = {
  nodes: [],

  setNodes() {
    for (let { selector } of Animations) {
      const nodeList = document.querySelectorAll(selector)
      nodeList.forEach(node => this.nodes.push(node))
    }
  },

  getScreenPercentage: (desktop, mobile) => window.innerWidth > 480 ? desktop : mobile,

  getTriggerOptions() {
    const haveOptions = typeof AnimationOptions !== 'undefined'
    let desktop, mobile, remake;

    if (haveOptions) {
      AnimationOptions?.desktop ? desktop = AnimationOptions.desktop : ''
      AnimationOptions?.mobile ? mobile = AnimationOptions.mobile : ''

      if (AnimationOptions?.remake || !AnimationOptions?.remake) {
        remake = AnimationOptions.remake
      }
    }

    desktop === undefined ? desktop = 70 : ''
    mobile === undefined ? mobile = 80 : ''
    remake === undefined ? remake = true : ''

    return { desktop, mobile, remake }
  },

  checkNodes() {
    const { desktop, mobile, remake } = this.getTriggerOptions()
    const percentage = this.getScreenPercentage(desktop, mobile)
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
    this.setNodes()
    this.checkNodes()
    window.onscroll = () => this.checkNodes()
  }
}

window.onload = () => ScrollTrigger.start()