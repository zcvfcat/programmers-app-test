export default class Component {
  state = {}
  setState(nextState) {
    this.state = { ...this.state, ...nextState }
    this.render()
  }
  render() {}
}
