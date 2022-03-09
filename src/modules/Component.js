export default class Component {
  state = {}
  setState(nextState) {
    this.state = nextState
    this.render()
  }
  render() {}
}
