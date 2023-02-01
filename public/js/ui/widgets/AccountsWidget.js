/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */


class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Виджет счетов не передан!');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const btnCreate = document.querySelector('.create-account');
    btnCreate.addEventListener('click', (e) => {
      App.getModal('createAccount').open();
    });

    this.element.addEventListener('click', (e) => {
      const a = Array.from(this.element.querySelectorAll('a'));
      a.forEach(el => {
        if (e.target === el) {
          this.onSelectAccount(el);
        } else {
          return;
        }
      })
    })

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const userCurrent = User.current();
    if (userCurrent) {
      Account.list(userCurrent.id, (err, response) => {
        if (response.success) {
          this.clear();
          const accountList = response.data;
          accountList.forEach(el => this.renderItem(el));
        }
      });
    };

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const account = Array.from(document.querySelectorAll('.account'));
    account.forEach(el => el.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const a = Array.from(this.element.querySelectorAll('a'));
    a.forEach(el => {
      if (el !== element) {
        el.classList.remove('active');
      }
    })
    element.classList.add('active');

    let id;
    const accountName = element.firstElementChild.innerText;
    Account.list(accountName, ((err, response) => {
      if (response.success) {
        response.data.forEach(el => {
          if (el.name === accountName) {
            id = el.id;
            console.log(id);
            App.showPage('transactions', { account_id: id })
          }
        });
      }
    }))
   
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `<li class="account">
              <a href="#">
                <span>${item.name}</span>
                <span>/ ${item.sum}</span>
              </a>
            </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }

}
