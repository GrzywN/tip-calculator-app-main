import DomElements from './DomElements';
import Renderer from './Renderer';

export default class InputHandler {
  constructor() {
    InputHandler.setListeners();
  }

  private static setListeners() {
    DomElements.bill.addEventListener('input', (e) => InputHandler.handleInput(e.target));
    DomElements.people.addEventListener('input', (e) => InputHandler.handleInput(e.target));
  }

  private static handleInput(target) {
    if (target.value !== '') Renderer.updateDisplay();
    else Renderer.resetOutput();
  }
}
