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

  public static updateDisplay() {
    Renderer.saveCurrentData();

    Renderer.updateResetButtonState();

    const isValid = Renderer.areInputsValid();
    if (isValid) {
      const calculatedNumbers = Renderer.calculate();
      const outputStrings = Renderer.format(calculatedNumbers);
      Renderer.render(outputStrings);
    }
  }

  public static reset() {
    Renderer.resetInput();
    Renderer.resetOutput();
    Renderer.updateDisplay();
  }

  public static resetInput() {
    DomElements.bill.value = '';
    DomElements.people.value = '';
  }

  public static resetOutput() {
    DomElements.tipAmount.textContent = '$0.00';
    DomElements.total.textContent = '$0.00';
  }

  public static updateResetButtonState() {
    const isAnyInputNotEmpty = Renderer.isAnyInputNotEmpty();
    Renderer.changeResetButtonState(isAnyInputNotEmpty);
  }

  private static changeResetButtonState(isAnyInputNotEmpty) {
    if (isAnyInputNotEmpty) {
      DomElements.resetButton.disabled = false;
    } else {
      DomElements.resetButton.disabled = true;
    }
  }

  private static saveCurrentData() {
    Renderer.billValue = parseFloat(DomElements.bill.value);
    Renderer.tipValue = parseInt(Renderer.getTipValue(), 10);
    Renderer.peopleValue = parseInt(DomElements.people.value, 10);
  }

  private static areInputsValid() {
    return (
      Number.isFinite(Renderer.billValue)
      && Number.isFinite(Renderer.tipValue)
      && Number.isFinite(Renderer.peopleValue)
    );
  }

  private static isAnyInputNotEmpty() {
    return DomElements.bill.value.length > 0 || DomElements.people.value.length > 0;
  }

  private static getTipValue(): string {
    let selectedTip;
    [...DomElements.tipButtons, DomElements.tipCustom].forEach((e) => {
      if (e.dataset.active === Globals.TRUE) selectedTip = e;
    });
    if (selectedTip == null) throw new Error('Selected tip is empty Renderer, line 22');
    if (selectedTip === DomElements.tipCustom) return selectedTip.value;
    return selectedTip.textContent;
  }

  private static calculate() {
    const billPerPerson: number = Renderer.billValue / Renderer.peopleValue;
    const tipAmount: number = billPerPerson * (Renderer.tipValue / 100);
    const total: number = billPerPerson + tipAmount;
    return { tipAmount, total };
  }

  private static format(output: CalculatedNumbers): OutputStrings {
    const tipAmount: string = `$${output.tipAmount.toFixed(2)}`;
    const total: string = `$${Math.round(output.total * 100) / 100}`;
    return { tipAmount, total };
  }

  private static render(output: OutputStrings) {
    DomElements.tipAmount.textContent = output.tipAmount;
    DomElements.total.textContent = output.total;
  }
}
