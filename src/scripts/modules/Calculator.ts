import DomElements from './DomElements';
import InputFilters from './InputFilters';
import InputHandler from './InputHandler';
import ResetHandler from './ResetHandler';
import SelectTipHandler from './SelectTipHandler';
import Renderer from './Renderer';

export default class Calculator {
  private constructor() {}

  public static init() {
    if (!DomElements.isSet) return;
    const inputFilters = new InputFilters();
    const inputHandler = new InputHandler();
    const resetHandler = new ResetHandler();
    const selectTipHandler = new SelectTipHandler();
    Renderer.updateDisplay();
  }
}
