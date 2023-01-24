/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } if (!this.element) {
      throw new Error("Форма не передана!");
    }

    

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const btnIncome = document.querySelector('.create-income-button');
    const btnExpense = document.querySelector('.create-expense-button');

    btnIncome.addEventListener('click', (e) => {
      App.getModal('newIncome').open();
    });

    btnExpense.addEventListener('click', (e) => {
      App.getModal('newExpense').open();
    })
   
  }
}
