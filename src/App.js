import { request } from './utils/api.js'
import Component from './modules/Component.js'
import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'
import ImageView from './components/ImageView.js'
import Loading from './components/Loading.js'

const cache = {}

export default class App extends Component {
  state = {
    isRoot: true,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: true,
  }
  breadcrumb = new Breadcrumb()
  nodes = new Nodes()
  imageView = new ImageView()
  loading = new Loading()

  constructor($app) {
    super($app)
    this.breadcrumb.init({ $app, handleClickPath: this.handleClickPath.bind(this) })
    this.nodes.init({ $app, handleClickNode: this.handleClickNode.bind(this), handleBackClickNode: this.handleBackClickNode.bind(this) })
    this.imageView.init({ $app, handleImageViewClose: this.handleImageViewClose.bind(this) })
    this.loading.init({ $app })
    this.init()
  }

  handleImageViewClose() {
    this.setState({ selectedFilePath: null })
  }

  handleClickPath(index) {
    if (index === null) {
      this.setState({
        ...this.state,
        depth: [],
      })
      return
    }

    if (index === this.state.depth.length - 1) {
      return
    }

    const nextDepth = this.state.depth.slice(0, index + 1)

    this.setState({ depth: nextDepth, nodes: cache[nextDepth[nextDepth.length - 1].id] })
  }

  /** @param {{node:object}} */
  async handleClickNode(node) {
    if (node.type === 'DIRECTORY') {
      this.setState({ isLoading: true })
      if (cache[node.id]) {
        this.setState({
          depth: [...this.state.depth, node],
          nodes: cache[node.id],
          isLoading: false,
          isRoot: false,
        })
      } else {
        const nextNodes = await request(node.id)
        this.setState({
          depth: [...this.state.depth, node],
          nodes: nextNodes,
          isLoading: false,
          isRoot: false,
        })
        cache[node.id] = nextNodes
      }
    } else if (node.type === 'FILE') {
      this.setState({
        selectedFilePath: node.filePath,
      })
    }
  }

  handleBackClickNode() {
    const nextState = { ...this.state }
    nextState.depth.pop()

    const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id

    if (prevNodeId === null) {
      this.setState({
        ...nextState,
        isRoot: true,
        nodes: cache.root,
      })
    } else {
      this.setState({
        ...nextState,
        isRoot: false,
        nodes: cache[prevNodeId],
      })
    }
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState }
    console.log('this.state')
    console.log(this.state)
    this.loading.setState({ isLoading: this.state.isLoading })
    this.breadcrumb.setState({ depth: this.state.depth })
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    })
    this.imageView.setState({ selectedFilePath: this.state.selectedFilePath })
  }

  async init() {
    const rootNodes = await request()
    this.setState({
      ...this.state,
      isRoot: true,
      nodes: rootNodes,
      isLoading: false,
    })
    cache.root = rootNodes
  }
}
