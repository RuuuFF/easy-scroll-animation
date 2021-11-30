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

  initialStyle(initial, selector) {
    let transitions = ''
    this.setStyle(`${selector} {`)

    for (let [index, props] of initial.entries()) {
      const property = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      const { duration = 0.6, timing = 'ease', delay = 0 } = this.getTransitionValues(props)

      if (index === initial.length - 1) {
        transitions += `${property} ${duration}s ${timing} ${delay}s`
      } else {
        transitions += `${property} ${duration}s ${timing} ${delay}s, `
      }

      this.setStyle(`  ${property}: ${value};`)
    }

    this.setStyle(`  transition: ${transitions}; \n}\n\n`)
  },

  finalStyle(final, selector, index) {
    this.setStyle(`${selector}.animate {`)

    for (let props of final) {
      const prop = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]

      this.setStyle(`  ${prop}: ${value};`)
    }

    this.setStyle(index === Animations.length - 1 ? `}` : `}\n\n`)
  },

  innerStyles() {
    for (let [index, { selector, initial, final }] of Animations.entries()) {
      const haveInitial = initial !== 'undefined' && initial.length !== 0
      const haveFinal = final !== 'undefined' && final.length !== 0

      haveInitial ? this.initialStyle(initial, selector) : ''
      haveFinal ? this.finalStyle(final, selector, index) : ''
    }
  },

  start() {
    this.createStyleEl()
    this.innerStyles()
  },
}

ScrollAnimation.start()