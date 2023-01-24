/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data);
    Array.from(this.element.querySelectorAll('input')).forEach(el => el.value = '');
    App.getModal('register').close();
    App.setState('user-logged');
  }
}