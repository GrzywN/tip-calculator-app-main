import InputFilters from './modules/InputFilters';
import EventHandler from './modules/EventHandler';
import DomElements from './modules/DomElements';

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

InputFilters.init(domElements);

const eventHandler = new EventHandler(domElements);
