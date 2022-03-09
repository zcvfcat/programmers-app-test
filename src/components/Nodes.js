import Component from '../modules/Component.js'

export default class Nodes extends Component {
  state = { nodes: [], isRoot: true, depth: [] }
  $target = document.createElement('ul')

  constructor(props) {
    super(props)
  }

  /** @param {{$app: HTMLElement, isRoot:boolean, nodes:Array, handleClickNode:Function, handleBackClickNode:Function}} */
  init({ $app, handleClickNode, handleBackClickNode }) {
    this.handleClickNode = handleClickNode
    this.handleBackClickNode = handleBackClickNode
    $app.append(this.$target)
    this.render()

    this.$target.addEventListener('click', (e) => {
      /** @type {HTMLElement} */
      const $node = e.target.closest('.Node')

      if ($node) {
        const { nodeId } = $node.dataset

        if (!nodeId) {
          this.handleBackClickNode()
          return
        }

        const selectedNode = this.state.nodes.find((node) => node.id === nodeId)

        if (selectedNode) {
          this.handleClickNode(selectedNode)
        }
      }
    })
  }

  render() {
    if (this.state.nodes) {
      const nodeTemplate = this.state.nodes
        .map((node) => {
          const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'
          return `<li class="Node" data-node-id="${node.id}">
              <img src="${iconPath}" alt="${node.name}"/>
              <p>${node.name}</p>
            </li>`
        })
        .join('')

      this.$target.innerHTML = !this.state.isRoot ? `<li class="Node"><img src="/assets/prev.png"></li>${nodeTemplate}` : nodeTemplate
    }
  }
}
