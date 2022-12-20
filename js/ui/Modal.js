/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    this.registerEvents();

    if (this.element === null) {
      throw new Error("Модальное окно не передано!");
    }

  }

  /**
 * Открывает окно: устанавливает CSS-свойство display
 * со значением «block»
 * */
  static open(element) {
    element.style.display = 'block';
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  static close(element) {
    element.style.display = 'none';

  }

  /**
* При нажатии на элемент с data-dismiss="modal"
* должен закрыть текущее окно
* (с помощью метода Modal.onClose)
* */


  registerEvents() {
    const btnClose = Array.from(document.querySelectorAll('[data-dismiss = "modal"]'));
    btnClose.forEach(el => el.addEventListener('click', (e) => {
      this.onClose(e);
    }));
  }

  /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */

  onClose(e) {
    const btnClose = Array.from(document.querySelectorAll('[data-dismiss = "modal"]'));
    btnClose.forEach(el => {
      const parent = el.closest('.modal');
      if (parent === this.element) {
        Modal.close(this.element);
      }
      e.preventDefault();
    })

  }





}