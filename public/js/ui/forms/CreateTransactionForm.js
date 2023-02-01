/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    const userCurrent = User.current();
    if (userCurrent) {
      Account.list(userCurrent.id, ((err, response) => {
        if (response.success) {
          const data = response.data;

          for (let key in data) {
            const account = data[key];
            const name = account.name;
            const id = account.id;
            select.insertAdjacentHTML('beforeend', `<option value="${id}">${name}</option>`);
          }

        this.onSubmit(data)

        //   const options = Array.from(select.children);
        //   const nameArr = [];
        //   for (let i = 0; i < options.length; i++) {
        //     const names = options[i].innerText;
        //     nameArr.push(names);
        //   }
        //   console.log(nameArr)
        //  data.forEach(item => {
        //   if (nameArr.indexOf(item.name) === -1) {
        //     for (let key in data) {
        //       const account = data[key];
        //       const name = account.name;
        //       const id = account.id;
        //       select.insertAdjacentHTML('beforeend', `<option value="${id}">${name}</option>`);
        //     }
        //   }
        //  })
        }

     
    
    }))
  }
}

/**
 * Создаёт новую транзакцию (доход или расход)
 * с помощью Transaction.create. По успешному результату
 * вызывает App.update(), сбрасывает форму и закрывает окно,
 * в котором находится форма
 * */
onSubmit(data) {
  Transaction.create(data, ((err, response) => {
    if (response.success) {
      App.update();
      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
    }
  }));
}
}