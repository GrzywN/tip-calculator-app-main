import InputFilters from './InputFilters';
import EventHandler from './EventHandler';

export default class Calculator {
  private constructor() {}

  public static init(domElements) {
    const inputFilters = new InputFilters(domElements);
    const eventHandler = new EventHandler(domElements);
  }
}
