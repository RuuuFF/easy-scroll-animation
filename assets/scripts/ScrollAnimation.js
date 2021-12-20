/**
 * ====== DEFAULT ANIMATION OPTIONS ======
 * duration: 0.6
 * timing: 'ease'
 * delay: 0
 * desktop: 70   (screen height percentage)
 * mobile: 80   (screen height percentage)
 * remake: true   (repetition of the animation on going up and down again)
 * 
 * Use :is() for multiple selectors with the same animation
 */

const AnimationOptions = {}  // Can be erased

const Animations = [
  {
    selector: 'h1',
    styles: [
      { opacity: [0, 1], duration: 0.8 },
      { transform: ['scale(0.8)', 'scale(1)'], duration: 0.8 },
    ]
  },

  {
    selector: '.box:is(.one, .three, .five, .seven)',
    styles: [
      { opacity: [0, 1], timing: 'linear' },
      { transform: ['translate(-40px, 40px)', 'translate(0, 0)'], timing: 'ease-in' },
    ]
  },

  {
    selector: '.box:is(.two, .four, .six, .eight)',
    styles: [
      { opacity: [0, 1], timing: 'linear' },
      { transform: ['translate(40px, 40px)', 'translate(0, 0)'], timing: 'ease-out' },
    ]
  },

  {
    selector: '.box:is(.nine, .ten)',
    styles: [
      { opacity: [0, 1], duration: 0.8 },
      { transform: ['translate(0, 50px) scaleX(0.5)', 'translate(0, 0) scaleX(1)'], duration: 0.8 },
    ]
  },
]

const ScrollAnimation = {
  createStyleEl() {
    this.styleEl = document.createElement("style")
    this.styleEl.setAttribute("id", "easy-scroll-animation")
    document.head.appendChild(this.styleEl)
    this.styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by Easy Scroll Animation (github.com/ruuuff/easy-scroll-animation) -->")
  },

  setStyle(style) {
    this.styleEl.insertAdjacentHTML("beforeend", style)
  },

  getTransitionValues(props) {
    const haveOptions = typeof AnimationOptions !== 'undefined'
    let duration, timing, delay;

    if (props.duration) {
      duration = props.duration
    } else if (haveOptions && AnimationOptions?.duration) {
      duration = AnimationOptions.duration
    }

    if (props.timing) {
      timing = props.timing
    } else if (haveOptions && AnimationOptions?.timing) {
      timing = AnimationOptions.timing
    }

    if (props.delay) {
      delay = props.delay
    } else if (haveOptions && AnimationOptions?.delay) {
      delay = AnimationOptions.delay
    }

    return { duration, timing, delay }
  },

  initialStyle(styles, selector) {
    let transitions = ''
    this.setStyle(`${selector} {`)

    for (let [index, props] of styles.entries()) {
      const [property, values] = Object.entries(props)[0]
      const value = values[0]

      const { duration = 0.6, timing = 'ease', delay = 0 } = this.getTransitionValues(props)

      if (index === styles.length - 1) {
        transitions += `${property} ${duration}s ${timing} ${delay}s`
      } else {
        transitions += `${property} ${duration}s ${timing} ${delay}s, `
      }

      this.setStyle(`  ${property}: ${value};`)
    }

    this.setStyle(`  transition: ${transitions}; \n}\n\n`)
  },

  finalStyle(styles, selector, index) {
    this.setStyle(`${selector}.animate {`)

    for (let props of styles) {
      const [property, values] = Object.entries(props)[0]
      const value = values[1]

      this.setStyle(`  ${property}: ${value};`)
    }

    this.setStyle(index === Animations.length - 1 ? `}` : `}\n\n`)
  },

  innerStyles() {
    for (let [index, { selector, styles }] of Animations.entries()) {
      const haveStyles = typeof styles !== 'undefined'

      haveStyles ? this.initialStyle(styles, selector) : ''
      haveStyles ? this.finalStyle(styles, selector, index) : ''
    }
  },

  start() {
    this.createStyleEl()
    this.innerStyles()
  },
}

ScrollAnimation.start()