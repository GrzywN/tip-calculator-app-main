import InputFilters from './modules/InputFilter';

const domElements = {
  input: {
    bill: document.getElementById('bill') as HTMLInputElement,
    tipButtons: [
      document.getElementById('tip-5'),
      document.getElementById('tip-10'),
      document.getElementById('tip-15'),
      document.getElementById('tip-25'),
      document.getElementById('tip-50'),
    ],
    customTip: document.getElementById('custom-tip') as HTMLInputElement,
    people: document.getElementById('people') as HTMLInputElement,
    reset: document.getElementById('reset'),
  },
  output: {
    tipAmount: document.getElementById('tip-amount'),
    total: document.getElementById('total'),
  },
};

InputFilters.init({
  bill: domElements.input.bill,
  customTip: domElements.input.customTip,
  people: domElements.input.people,
});
