import DomElements from './DomElements';
import Renderer from './Renderer';

export default class ResetHandler {
  constructor() {
    ResetHandler.setListeners();
  }

  private static setListeners() {
    DomElements.resetButton.addEventListener('click', (e) => ResetHandler.handleInput(e.target));
  }

  private static handleInput(target) {
    Renderer.reset();
  }
}
