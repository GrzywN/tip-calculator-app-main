import DomElements from './modules/DomElements';
import Calculator from './modules/Calculator';

const domElements: DomElements = {
  bill: document.getElementById('bill') as HTMLInputElement,
  tipCustom: document.getElementById('custom-tip') as HTMLInputElement,
  people: document.getElementById('people') as HTMLInputElement,

  tipButtons: [
    document.getElementById('tip-5'),
    document.getElementById('tip-10'),
    document.getElementById('tip-15'),
    document.getElementById('tip-25'),
    document.getElementById('tip-50'),
  ] as Array<HTMLButtonElement>,
  resetButton: document.getElementById('reset') as HTMLButtonElement,

  tipAmount: document.getElementById('tip-amount') as HTMLHeadingElement,
  total: document.getElementById('total') as HTMLHeadingElement,
};

Calculator.init(domElements);
