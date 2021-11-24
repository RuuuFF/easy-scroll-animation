const Animations = [
  {
    selector: '.box:is(.one, .three, .five, .seven)',
    declaration: {
      initial: [
        {
          opacity: 0,
          transition: { duration: 0.4, timing: 'ease', delay: 0 }
        },
        {
          transform: 'translate(-40px, 40px)',
          transition: { duration: 0.6, timing: 'ease-in', delay: 0 }
        },
      ],

      final: [
        { opacity: 1 },
        { transform: 'translate(0, 0)' },
      ]
    }
  },

  {
    selector: '.box:is(.two, .four, .six, .eight)',
    declaration: {
      initial: [
        {
          opacity: 0,
          transition: { duration: 0.4, timing: 'ease', delay: 0 }
        },
        {
          transform: 'translate(40px, 40px)',
          transition: { duration: 0.6, timing: 'ease-in', delay: 0 }
        },
      ],

      final: [
        { opacity: 1 },
        { transform: 'translate(0, 0)' },
      ]
    }
  },

  {
    selector: '.box:is(.nine, .ten)',
    declaration: {
      initial: [
        {
          opacity: 0,
          transition: { duration: 0.6, timing: 'ease', delay: 0 }
        },
        {
          width: '60%',
          transition: { duration: 0.6, timing: 'ease-in', delay: 0 }
        },
        {
          transform: 'translate(0, 50px)',
          transition: { duration: 0.6, timing: 'ease-in', delay: 0 }
        },
      ],

      final: [
        { opacity: 1 },
        { width: '100%' },
        { transform: 'translate(0, 0)' },
      ]
    }
  },
]

const ScrollAnimation = {
  createStyleEl() {
    const styleEl = document.createElement("style")
    styleEl.setAttribute("id", "scroll-animation")
    document.querySelector("head").appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by ScrollAnimation (github.com/ruuuff/scroll-animation) -->")
  },

  initialStyle(style, initial, selector) {
    let transition = ''
    style.insertAdjacentHTML("beforeend", `${selector} {`)

    for (let [index, props] of initial.entries()) {
      const prop = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      style.insertAdjacentHTML("beforeend", `  ${prop}: ${value};`)

      if (props['transition']) {
        const { duration, timing, delay } = props['transition']

        if (index === initial.length - 1) {
          transition += `${prop} ${duration}s ${timing} ${delay}s;`
          style.insertAdjacentHTML("beforeend", `  transition: ${transition}`)
        } else {
          transition += `${prop} ${duration}s ${timing} ${delay}s, `
        }
      }
    }

    style.insertAdjacentHTML("beforeend", `}
    `)
  },

  finalStyle(style, final, selector) {
    style.insertAdjacentHTML("beforeend", `${selector}.animate {`)

    for (let props of final) {
      const prop = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      style.insertAdjacentHTML("beforeend", `  ${prop}: ${value} !important;`)
    }

    style.insertAdjacentHTML("beforeend", `}
    `)
  },

  innerStyles() {
    const style = document.querySelector("head style#scroll-animation")
    let selectors = ''

    for (let [index, { selector, declaration }] of Animations.entries()) {
      const lastSelector = index === Animations.length - 1
      selectors += lastSelector ? `${selector}` : `${selector} $ `

      const { initial, final } = declaration

      this.initialStyle(style, initial, selector)

      if (final !== undefined && final.length !== 0) {
        this.finalStyle(style, final, selector)
      }
    }

    style.insertAdjacentHTML("beforeend", `/* ${selectors} */`)
  },

  start() {
    this.createStyleEl()
    this.innerStyles()
  },
}

ScrollAnimation.start()