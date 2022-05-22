import Globals from './Globals';

interface Inputs {
  bill: HTMLInputElement;
  customTip: HTMLInputElement;
  people: HTMLInputElement;
}

export default class InputFilters {
  private constructor() {}

  public static init(inputs: Inputs) {
    InputFilters.setInputFilter(inputs.bill, value => Globals.FLOAT_REGEX.test(value));
    InputFilters.setInputFilter(inputs.customTip, value => Globals.INTEGER_REGEX.test(value));
    InputFilters.setInputFilter(inputs.people, value => Globals.INTEGER_REGEX.test(value));
  }

  private static setInputFilter(textbox: Element, inputFilter: (value: string) => boolean): void {
    Globals.EVENTS_TO_FILTER.forEach(event => {
      textbox.addEventListener(
        event,
        function (
          this: HTMLInputElement & {
            oldValue: string;
            oldSelectionStart: number | null;
            oldSelectionEnd: number | null;
          }
        ) {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
            this.value = this.oldValue;
            if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
          } else {
            this.value = '';
          }
        }
      );
    });
  }
}
