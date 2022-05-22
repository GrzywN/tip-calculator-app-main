import DomElements from './DomElements';
import Globals from './Globals';

interface CalculatedNumbers {
  tipAmount: number;
  total: number;
}

interface OutputStrings {
  tipAmount: string;
  total: string;
}

export default class Renderer {
  private static billValue: number;
  private static tipValue: number;
  private static peopleValue: number;

  public static reset() {
    DomElements.bill.value = '';
    DomElements.people.value = '';
    DomElements.tipAmount.textContent = '$0.00';
    DomElements.total.textContent = '$0.00';
  }

  public static updateDisplay() {
    Renderer.saveCurrentData();
    if (Renderer.areInputsValid()) {
      const calculatedNumbers = Renderer.calculate();
      const outputStrings = Renderer.format(calculatedNumbers);
      Renderer.render(outputStrings);
    }
  }

  private static saveCurrentData() {
    Renderer.billValue = parseFloat(DomElements.bill.value);
    Renderer.tipValue = parseInt(Renderer.getTipValue());
    Renderer.peopleValue = parseInt(DomElements.people.value);
  }

  private static areInputsValid() {
    return (
      isFinite(Renderer.billValue) && isFinite(Renderer.tipValue) && isFinite(Renderer.peopleValue)
    );
  }

  private static getTipValue(): string {
    let selectedTip;
    [...DomElements.tipButtons, DomElements.tipCustom].forEach(e => {
      if (e.dataset.active === Globals.TRUE) selectedTip = e;
    });
    if (selectedTip == null) throw new Error('Selected tip is empty Renderer, line 22');
    if (selectedTip === DomElements.tipCustom) return selectedTip.value;
    else return selectedTip.textContent;
  }

  private static calculate() {
    const billPerPerson: number = Renderer.billValue / Renderer.peopleValue;
    const tipAmount: number = billPerPerson * (Renderer.tipValue / 100);
    const total: number = billPerPerson + tipAmount;
    return { tipAmount: tipAmount, total: total };
  }

  private static format(output: CalculatedNumbers): OutputStrings {
    const tipAmount: string = `$${output.tipAmount.toFixed(2)}`;
    const total: string = `$${Math.round(output.total)}`;
    return { tipAmount: tipAmount, total: total };
  }

  private static render(output: OutputStrings) {
    DomElements.tipAmount.textContent = output.tipAmount;
    DomElements.total.textContent = output.total;
  }
}
