import Component from '../modules/Component.js'

export default class Breadcrumb extends Component {
  /** @type {HTMLElement} */
  $nav = document.createElement('nav')
  /** @type {HTMLElement} */
  $target = document.createElement('ul')

  state = {
    depth: [],
  }

  constructor(props) {
    super(props)
    this.$nav.className = 'Breadcrumb'
    this.$target.className = 'ul'
  }

  /** @param {{ $app: HTMLElement, handleClickPath: Function }} */
  init({ $app, handleClickPath }) {
    this.$nav.appendChild(this.$target)

    $app.appendChild(this.$nav)
    this.render()

    this.$target.addEventListener('click', (e) => {
      const $navItem = e.target.closet('.nav-item')

      if ($navItem) {
        const { index } = $navItem.dataset
        handleClickPath(index ? Number(index) : null)
      }
    })
  }

  render() {
    this.$target.innerHTML = `<li class="nav-item">root</li>${this.state.depth
      .map((node, index) => {
        return `<li class="nav-item" data-index=${index}>${node.name}</li>`
      })
      .join('')}`
  }
}
