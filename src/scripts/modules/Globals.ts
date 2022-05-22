export default class Globals {
  public static readonly TRUE: string = 'true';
  public static readonly FALSE: string = 'false';

  public static readonly FLOAT_REGEX: RegExp = /^\d*\.?\d*$/;
  public static readonly INTEGER_REGEX: RegExp = /^\d*$/;

  public static readonly DEFAULT_TIP: HTMLButtonElement = document.getElementById(
    'tip-15'
  ) as HTMLButtonElement;

  public static readonly EVENTS_TO_FILTER: Array<string> = [
    'contextmenu',
    'drop',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
  ];

  private constructor() {}
}
