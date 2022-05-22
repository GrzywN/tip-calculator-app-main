import DomElements from './DomElements';
import Globals from './Globals';

import Renderer from './Renderer';

export default class SelectTipHandler {
  private currentPresetTip: HTMLButtonElement;

  constructor() {
    this.selectLastSessionTip();
    this.setListeners();
  }

  private selectLastSessionTip() {
    if (localStorage.getItem('lastTip').length > 0) {
      const lastID = localStorage.getItem('lastTip');
      const lastTipElement = document.getElementById(lastID);
      lastTipElement.dataset.active = Globals.TRUE;
      const lastPresetTipID = localStorage.getItem('lastPresetTip');
      const lastPresetTipElement = document.getElementById(lastPresetTipID);
      this.currentPresetTip = lastPresetTipElement as HTMLButtonElement;
    } else {
      Globals.DEFAULT_TIP.dataset.active = Globals.TRUE;
      this.currentPresetTip = Globals.DEFAULT_TIP;
    }
    this.setTipToLocalStorage();
  }

  private setTipToLocalStorage() {
    localStorage.setItem('lastPresetTip', this.currentPresetTip.id);
    localStorage.setItem('lastTip', SelectTipHandler.getCurrentTip().id);
  }

  private setListeners() {
    document.addEventListener('click', (e) => this.handleClickEvent(e.target as HTMLElement));
    DomElements.tipCustom.addEventListener('input', () => this.handleCustomTip());
  }

  private handleClickEvent(target: HTMLElement) {
    if (target === DomElements.tipCustom) this.handleCustomTip();
    else {
      DomElements.tipButtons.forEach((e) => {
        if (e === target) this.selectTip(target);
      });
    }
  }

  private handleCustomTip() {
    this.saveCurrentTip();
    if (DomElements.tipCustom.value.length > 0) this.selectTip(DomElements.tipCustom);
    else this.selectTip(this.currentPresetTip);
  }

  private static getCurrentTip(): HTMLElement {
    let currentTip;
    [...DomElements.tipButtons, DomElements.tipCustom].forEach((e) => {
      if (e.dataset.active === Globals.TRUE) currentTip = e;
    });
    if (currentTip == null) throw new Error('None of the tips is selected SelectTipHandler.ts');
    return currentTip;
  }

  private saveCurrentTip() {
    DomElements.tipButtons.forEach((e) => {
      if (e.dataset.active === Globals.TRUE) {
        this.currentPresetTip = e;
        this.setTipToLocalStorage();
      }
    });
  }

  private selectTip(toActivate) {
    SelectTipHandler.disableAllTips();
    toActivate.dataset.active = Globals.TRUE;
    if (toActivate !== DomElements.tipCustom) {
      this.currentPresetTip = toActivate;
    }
    this.setTipToLocalStorage();
    Renderer.updateDisplay();
  }

  private static disableAllTips() {
    [...DomElements.tipButtons, DomElements.tipCustom].forEach(
      (e) => (e.dataset.active = Globals.FALSE),
    );
  }
}
