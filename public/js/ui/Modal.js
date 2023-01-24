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
    if (element) {
      this.element = element;
      this.registerEvents();
    } if (!this.element) {
      throw new Error("Модальное окно не передано!");
    }
  }

  /**
 * Открывает окно: устанавливает CSS-свойство display
 * со значением «block»
 * */
  open() {
    this.element.style.display = 'block';
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = 'none';
  }

  /**
* При нажатии на элемент с data-dismiss="modal"
* должен закрыть текущее окно
* (с помощью метода Modal.onClose)
* */


  registerEvents() {
    const btnClose = Array.from(document.querySelectorAll('[data-dismiss = "modal"]'));
    btnClose.forEach(el => el.addEventListener('click', (e) => {
      if (el.closest('.modal') === this.element) {
        this.onClose(e);
      }
    }));
  }

  /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */

  onClose(e) {
    this.close();
  }
}