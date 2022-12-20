/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sideBarToggle = document.querySelector('.sidebar-toggle');
    const sidebarMini = document.querySelector('.sidebar-mini');
    sideBarToggle.addEventListener('click', function(e) {
      if (sidebarMini.classList.contains('sidebar-open', 'sidebar-collapse')) {
        sidebarMini.classList.remove('sidebar-open', 'sidebar-collapse');
      } else {
        sidebarMini.classList.add('sidebar-open', 'sidebar-collapse');
      }
      e.preventDefault();
    })

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const btnSidebar = Array.from(document.querySelectorAll('.menu-item'));
    btnSidebar.forEach(el => el.addEventListener('click', function(e) {
      if (el.classList.contains('menu-item_register')) {
        const modal = App.getModal('register');
        const element = modal.element;
        Modal.open(element);
   
      } if (el.classList.contains('menu-item_login')) {
        const modal = App.getModal('login');
        const element = modal.element;
        Modal.open(element);
      } 
      if(el.classList.contains('menu-item_logout')) {
        User.logout(response => {
          if (response.success) {
            App.setState('init');
          }
        });
      }
      e.preventDefault();
    }))

  }
}