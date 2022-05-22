import DomElements from './DomElements';
import Renderer from './Renderer';

export default class InputHandler {
  constructor() {
    this.setListeners();
  }

  private setListeners() {
    DomElements.bill.addEventListener('input', e => this.handleInput(e.target));
    DomElements.people.addEventListener('input', e => this.handleInput(e.target));
  }

  private handleInput(target) {
    if (target.value !== '') Renderer.updateDisplay();
  }
}
