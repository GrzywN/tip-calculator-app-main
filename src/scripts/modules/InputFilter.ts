interface Inputs {
  bill: HTMLInputElement;
  customTip: HTMLInputElement;
  people: HTMLInputElement;
}

export default class InputFilters {
  private static FLOAT_REGEX: RegExp = /^\d*\.?\d*$/;
  private static INTEGER_REGEX: RegExp = /^\d*$/;

  private constructor() {}

  public static init(inputs: Inputs) {
    InputFilters.setInputFilter(inputs.bill, value => InputFilters.FLOAT_REGEX.test(value));
    InputFilters.setInputFilter(inputs.customTip, value => InputFilters.INTEGER_REGEX.test(value));
    InputFilters.setInputFilter(inputs.people, value => InputFilters.INTEGER_REGEX.test(value));
  }

  private static setInputFilter(textbox: Element, inputFilter: (value: string) => boolean): void {
    [
      'contextmenu',
      'drop',
      'focusout',
      'input',
      'keydown',
      'keyup',
      'mousedown',
      'mouseup',
      'select',
    ].forEach(event => {
      textbox.addEventListener(
        event,
        function (
          this: (HTMLInputElement | HTMLTextAreaElement) & {
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
