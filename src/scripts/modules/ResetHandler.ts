import DomElements from './DomElements';
import Renderer from './Renderer';

export default class ResetHandler {
  constructor() {
    ResetHandler.setListeners();
  }

  private static setListeners() {
    DomElements.resetButton.addEventListener('click', () => ResetHandler.handleInput());
  }

  private static handleInput() {
    Renderer.reset();
  }
}
