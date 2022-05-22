interface DomElementsTemplate {
  bill: HTMLInputElement;
  tipCustom: HTMLInputElement;
  people: HTMLInputElement;

  tipButtons: Array<HTMLButtonElement>;
  resetButton: HTMLButtonElement;

  tipAmount: HTMLHeadingElement;
  total: HTMLHeadingElement;
}

export default class DomElements {
  public static bill: HTMLInputElement;

  public static tipCustom: HTMLInputElement;

  public static people: HTMLInputElement;

  public static tipButtons: Array<HTMLButtonElement>;

  public static resetButton: HTMLButtonElement;

  public static tipAmount: HTMLHeadingElement;

  public static total: HTMLHeadingElement;

  private static initialized: boolean;

  private constructor() {}

  public static setElements(elements: DomElementsTemplate) {
    DomElements.bill = elements.bill;
    DomElements.tipCustom = elements.tipCustom;
    DomElements.people = elements.people;
    DomElements.tipButtons = elements.tipButtons;
    DomElements.resetButton = elements.resetButton;
    DomElements.tipAmount = elements.tipAmount;
    DomElements.total = elements.total;

    DomElements.initialized = true;
  }

  public static isSet(): boolean {
    return DomElements.initialized;
  }
}
