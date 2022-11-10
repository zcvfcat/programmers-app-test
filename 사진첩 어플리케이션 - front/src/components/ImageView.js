import Component from '../modules/Component.js'

const IMAGE_PATH_PREFIX = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default class ImageView extends Component {
  state = {
    selectedFilePath: null,
  }
  $target = document.createElement('div')
  handleImageViewClose = () => {}

  constructor(props) {
    super(props)
    this.$target.className = 'Modal ImageView'
  }

  /** @param {{$app:HTMLElement, handleImageViewClose:Function}} */
  init({ $app, handleImageViewClose }) {
    this.handleImageViewClose = handleImageViewClose
    $app.appendChild(this.$target)

    this.render()
    this.addCloseModalEvent()
  }

  addCloseModalEvent() {
    /** @param {{e:MouseEvent}} */
    const clickOutside = (e) => {
      const $clickedNode = e.target
      if ($clickedNode.className === 'Model ImageView') {
        this.handleImageViewClose()
        this.$target.removeEventListener('click', clickOutside)
      }
    }

    /** @param {{e:KeyboardEvent}} */
    const pressEsc = (e) => {
      if (e.key === 'Escape') {
        this.handleImageViewClose()
        window.removeEventListener('keydown', pressEsc)
      }
    }

    this.$target.addEventListener('click', clickOutside)
    window.addEventListener('keydown', pressEsc)
  }

  render() {
    this.$target.innerHTML = `
      <div class="content">
        ${this.state.selectedFilePath ? `<img src="${IMAGE_PATH_PREFIX}${this.state.selectedFilePath}"/>` : ''}
      </div>
    `
    this.$target.style.display = this.state.selectedFilePath ? 'block' : 'none'
  }
}
