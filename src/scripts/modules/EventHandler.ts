import DomElements from './DomElements';
import Globals from './Globals';

export default class EventHandler {
  private currentPresetTip: HTMLButtonElement;

  private inputs: Array<HTMLInputElement>;
  private tipCustom: HTMLInputElement;
  private tipButtons: Array<HTMLButtonElement>;
  private resetButton: HTMLButtonElement;
  private outputs: Array<HTMLHeadingElement>;

  public constructor(elements: DomElements) {
    this.inputs = [elements.bill, elements.tipCustom, elements.people];
    this.tipCustom = elements.tipCustom;
    this.tipButtons = elements.tipButtons;
    this.resetButton = elements.resetButton;
    this.outputs = [elements.tipAmount, elements.total];

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
