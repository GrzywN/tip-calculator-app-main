- Po wpisaniu Custom Tipa ma dać data-active (wtedy padding zadziała dla liter a nie zadziała dla placeholdera)
- Stylowanie caret w inputach, do dopracowania, zmiany paddingów na focusie albo jakieś elementy css
- Zrobić handler na input żeby po inpucie obliczał kalkulator
- Zrobić, żeby wszystkie konstruktory przyjmowały ten sam typ, najlepiej to klase
- wyjebac select tip i select custom tip / mniej kodu
  https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
  https://stackoverflow.com/questions/13803032/java-constructor-and-static-method

  // private selectCustomTip() {
  // // this.disableAllPresetTips(); //
  // DomElements.tipCustom.dataset.active = Globals.TRUE;
  // // this.whichTipIsActive = DomElements.tipCustom; //
  // // this.setTipToLocalStorage(); //
  // // Renderer.updateDisplay(); //
  // }

  // private selectPreviousPresetTip() {
  // // DomElements.tipCustom.dataset.active = Globals.FALSE; //
  // this.currentPresetTip.dataset.active = Globals.TRUE;
  // // this.whichTipIsActive = this.currentPresetTip; //
  // // this.setTipToLocalStorage(); //
  // // Renderer.updateDisplay(); //
  // }

  // private selectPresetTip(target: HTMLButtonElement) {
  // // this.disableAllPresetTips(); //
  // DomElements.tipCustom.dataset.active = Globals.FALSE;
  // target.dataset.active = Globals.TRUE;
  // // this.currentPresetTip = target;
  // // this.whichTipIsActive = target; //
  // // this.setTipToLocalStorage(); //
  // // Renderer.updateDisplay(); //
  // }

  // private disableAllPresetTips() {
  // DomElements.tipButtons.forEach(e => (e.dataset.active = Globals.FALSE));
  // }
