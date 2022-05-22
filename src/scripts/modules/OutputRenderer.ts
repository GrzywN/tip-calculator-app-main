import DomElements from './DomElements';
import EventHandler from './EventHandler';
import Globals from './Globals';

interface Output {
  tipAmount: number;
  total: number;
}

export default class OutputRenderer {
  private billValue: number;
  private tipCustom: HTMLInputElement;
  private tipValue: number;
  private peopleValue: number;
  private tipAmount: HTMLHeadingElement;
  private total: HTMLHeadingElement;

  public constructor(domElements: DomElements, eventHandler: EventHandler) {
    this.billValue = parseFloat(domElements.bill.value);

    this.tipCustom = domElements.tipCustom;
    this.tipValue = this.getCurrentTipValue(eventHandler);

    this.peopleValue = parseFloat(domElements.people.value);

    this.tipAmount = domElements.tipAmount;
    this.total = domElements.total;
  }

  private getCurrentTipValue(eventHandler): number {
    const activeTip = eventHandler.whichTipIsActive;
    if (activeTip === this.tipCustom) return parseInt(activeTip.value);
    else return parseInt(activeTip.textContent);
  }

  public updateResults() {
    if (this.shouldCalculate()) {
      const output = this.calculate();
      this.render(output);
    }
  }

  private shouldCalculate(): boolean {
    console.log(isFinite(this.billValue) && isFinite(this.peopleValue)); // do wyjebania potem
    return isFinite(this.billValue) && isFinite(this.peopleValue);
  }

  private calculate(): Output {
    const billPerPerson: number = this.billValue / this.peopleValue;
    const tipAmount: number = +((billPerPerson / 100) * this.tipValue); // podzielic jna sto
    const total: number = +(billPerPerson + tipAmount);
    return { tipAmount: tipAmount, total: total };
  }

  private render(output: Output) {
    this.tipAmount.textContent = `$${output.tipAmount.toFixed(2)}`;
    this.total.textContent = `$${output.total.toFixed(2)}`;
  }
}
