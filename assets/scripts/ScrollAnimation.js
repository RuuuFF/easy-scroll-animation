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

const Options = {}

const Animations = [
  {
    selector: 'h1',
    initial: [
      { opacity: 0, duration: 0.8 },
      { transform: 'scale(0.8)', duration: 0.8 },
    ],
    final: [
      { opacity: 1 },
      { transform: 'scale(1)' },
    ]
  },

  {
    selector: '.box:is(.one, .three, .five, .seven)',
    initial: [
      { opacity: 0, timing: 'linear' },
      { transform: 'translate(-40px, 40px)', timing: 'ease-in' },
    ],
    final: [
      { opacity: 1 },
      { transform: 'translate(0, 0)' },
    ]
  },

  {
    selector: '.box:is(.two, .four, .six, .eight)',
    initial: [
      { opacity: 0, timing: 'linear' },
      { transform: 'translate(40px, 40px)', timing: 'ease-out' },
    ],
    final: [
      { opacity: 1 },
      { transform: 'translate(0, 0)' },
    ]
  },

  {
    selector: '.box:is(.nine, .ten)',
    initial: [
      { opacity: 0, duration: 0.8 },
      { transform: 'translate(0, 50px) scaleX(0.5)', duration: 0.8 },
    ],
    final: [
      { opacity: 1 },
      { transform: 'translate(0, 0) scaleX(1)' },
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
    let duration, timing, delay;

    if (props.duration) {
      duration = props.duration
    } else {
      duration = (typeof Options !== 'undefined' && typeof Options.duration !== 'undefined') ? Options.duration : 0.6
    }

    if (props.timing) {
      timing = props.timing
    } else {
      timing = (typeof Options !== 'undefined' && typeof Options.timing !== 'undefined') ? Options.timing : 'ease'
    }

    if (props.delay) {
      delay = props.delay
    } else {
      delay = (typeof Options !== 'undefined' && typeof Options.delay !== 'undefined') ? Options.delay : 0
    }

    return { duration, timing, delay }
  },

  initialStyle(initial, selector) {
    let transitions = ''
    this.setStyle(`${selector} {`)

    for (let [index, props] of initial.entries()) {
      const property = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      const { duration, timing, delay } = this.getTransitionValues(props)

      if (index === initial.length - 1) {
        transitions += `${property} ${duration}s ${timing} ${delay}s`
      } else {
        transitions += `${property} ${duration}s ${timing} ${delay}s, `
      }

      this.setStyle(`  ${property}: ${value};`)
    }

    this.setStyle(`  transition: ${transitions}; \n}\n\n`)
  },

  finalStyle(final, selector) {
    this.setStyle(`${selector}.animate {`)

    for (let props of final) {
      const prop = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      this.setStyle(`  ${prop}: ${value} !important;`)
    }

    this.setStyle(`}\n\n`)
  },

  getTriggerOptions() {
    const desktop = (typeof Options !== 'undefined' && typeof Options.desktop !== 'undefined') ? Options.desktop : 70
    const mobile = (typeof Options !== 'undefined' && typeof Options.mobile !== 'undefined') ? Options.mobile : 80
    const remake = (typeof Options !== 'undefined' && typeof Options.remake !== 'undefined') ? Options.remake : true

    return `{"desktop": ${desktop}, "mobile": ${mobile}, "remake": ${remake}}`
  },

  innerStyles() {
    let selectors = ''

    for (let [index, { selector, initial, final }] of Animations.entries()) {
      selectors += (index === Animations.length - 1) ? `${selector}` : `${selector} $ `

      this.initialStyle(initial, selector)
      if (final !== undefined && final.length !== 0) {
        this.finalStyle(final, selector)
      }
    }

    const json = this.getTriggerOptions()
    this.setStyle(`/* ${selectors} ||| ${json} */`)
  },

  start() {
    this.createStyleEl()
    this.innerStyles()
  },
}

ScrollAnimation.start()