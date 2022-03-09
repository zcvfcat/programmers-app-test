import Component from '../modules/Component.js'

export default class Loading extends Component {
  state = { isLoading: true }
  $target = document.createElement('div')

  constructor(props) {
    super(props)
    this.$target.className = 'Loading Modal'
  }

  init({ $app }) {
    $app.appendChild(this.$target)
    this.render()
  }

  render() {
    this.$target.innerHTML = `
      <div class="content">
        <img src="./assets/nyan-cat.gif"/>
      </div>
    `

    this.$target.style.display = this.state.isLoading ? 'block' : 'none'
  }
}
