import DomElements from './DomElements';
import Globals from './Globals';
import OutputRenderer from './OutputRenderer';

export default class EventHandler {
  private currentPresetTip: HTMLButtonElement;

  private inputs: Array<HTMLInputElement>;
  private tipCustom: HTMLInputElement;
  private tipButtons: Array<HTMLButtonElement>;
  private resetButton: HTMLButtonElement;
  private outputs: Array<HTMLHeadingElement>;

  public whichTipIsActive: HTMLElement;
  public outputRenderer: OutputRenderer;

  public constructor(elements: DomElements) {
    this.inputs = [elements.bill, elements.tipCustom, elements.people];
    this.tipCustom = elements.tipCustom;
    this.tipButtons = elements.tipButtons;
    this.resetButton = elements.resetButton;
    this.outputs = [elements.tipAmount, elements.total];

    this.setDefaultTip();
  }

  public init(outputRenderer) {
    this.outputRenderer = outputRenderer;
    this.setupListeners();
  }

  private setDefaultTip() {
    Globals.DEFAULT_TIP.dataset.active = Globals.TRUE;
    this.currentPresetTip = Globals.DEFAULT_TIP;
    this.whichTipIsActive = Globals.DEFAULT_TIP;
  }

  private setupListeners() {
    document.addEventListener('click', event => this.handleClickEvent(event.target as HTMLElement));
    this.inputs.forEach(e => this.outputRenderer.updateResults());
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
      this.whichTipIsActive = this.tipCustom;
    } else {
      this.tipCustom.dataset.active = Globals.FALSE;
      this.currentPresetTip.dataset.active = Globals.TRUE;
      this.whichTipIsActive = this.currentPresetTip;
    }
  }

  private getCurrentTip() {
    this.tipButtons.forEach(e => {
      if (e.dataset.active == Globals.TRUE) {
        this.currentPresetTip = e;
        this.whichTipIsActive = e;
      }
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
    this.whichTipIsActive = target;
    this.outputRenderer.updateResults();
  }
}
