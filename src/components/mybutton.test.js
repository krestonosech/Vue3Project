import { render } from '@testing-library/vue';
import MyButton from './mybutton.vue';

test('render my button', () => {
  const { debug } = render(MyButton);

  debug();
});
