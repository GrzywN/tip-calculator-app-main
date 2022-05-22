import DomElements from './DomElements';
import Renderer from './Renderer';

export default class ResetHandler {
  constructor() {
    this.setListeners();
  }

  private setListeners() {
    DomElements.resetButton.addEventListener('click', e => this.handleInput(e.target));
  }

  private handleInput(target) {
    Renderer.reset();
  }
}
