import DomElements from './DomElements';
import InputFilters from './InputFilters';
import OutputRenderer from './OutputRenderer';
import EventHandler from './EventHandler';

export default class Calculator {
  private constructor() {}

  public static init(domElements: DomElements) {
    const inputFilters = new InputFilters(domElements);
    const eventHandler = new EventHandler(domElements);
    const outputRenderer = new OutputRenderer(domElements, eventHandler);
    eventHandler.init(outputRenderer);
  }
}
