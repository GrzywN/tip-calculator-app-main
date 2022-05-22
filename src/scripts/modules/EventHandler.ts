import Globals from './Globals';

interface ElementsToBeHandled {
  tipButtons: Array<HTMLButtonElement>;
  tipCustom: HTMLInputElement;
  resetButton: HTMLButtonElement;
  inputs: Array<HTMLInputElement>;
  outputs: Array<HTMLHeadingElement>;
}

export default class EventHandler {
  private currentPresetTip: HTMLButtonElement;

  private tipButtons: Array<HTMLButtonElement>;
  private tipCustom: HTMLInputElement;
  private resetButton: HTMLButtonElement;
  private inputs: Array<HTMLInputElement>;
  private outputs: Array<HTMLHeadingElement>;

  public constructor(elements: ElementsToBeHandled) {
    this.tipButtons = elements.tipButtons;
    this.tipCustom = elements.tipCustom;
    this.resetButton = elements.resetButton;
    this.inputs = elements.inputs;
    this.outputs = elements.outputs;

    this.init();
  }

  private init() {
    this.setDefaultTip();
    this.setupListeners();
  }

  private setDefaultTip() {
    Globals.DEFAULT_TIP.dataset.active = Globals.TRUE;
    this.currentPresetTip = Globals.DEFAULT_TIP;
  }

  private setupListeners() {
    document.addEventListener('click', event => this.handleClickEvent(event.target as HTMLElement));
    this.tipCustom.addEventListener('input', event => this.handleCustomTip());
  }

  private handleClickEvent(target: HTMLElement) {
    switch (target) {
      case this.resetButton: {
        return this.reset();
      }
      case this.tipCustom:
        return this.handleCustomTip();
    }

    this.tipButtons.forEach(e => {
      if (e === target) return this.selectPresetTip(target as HTMLButtonElement);
    });
  }

  private reset() {
    this.inputs.forEach(e => (e.value = ''));
    this.outputs.forEach(e => (e.textContent = '$0.00'));
    this.disableAllPresetTips();
    this.setDefaultTip();
  }

  private handleCustomTip() {
    this.getCurrentTip();
    if (this.tipCustom.value.length > 0) {
      this.disableAllPresetTips();
      this.tipCustom.dataset.active = Globals.TRUE;
    } else {
      this.tipCustom.dataset.active = Globals.FALSE;
      this.currentPresetTip.dataset.active = Globals.TRUE;
    }
  }

  private getCurrentTip() {
    this.tipButtons.forEach(e => {
      if (e.dataset.active == Globals.TRUE) this.currentPresetTip = e;
    });
  }

  private disableAllPresetTips() {
    this.tipButtons.forEach(e => (e.dataset.active = Globals.FALSE));
  }

  private selectPresetTip(target: HTMLButtonElement) {
    this.disableAllPresetTips();
    this.tipCustom.dataset.active = Globals.FALSE;
    target.dataset.active = Globals.TRUE;
    this.currentPresetTip = target;
  }
}
