import { render } from '@testing-library/vue';
import navbar from './navbar.vue';

test('render navbar', () => {
  const { debug } = render(navbar);

  debug();
});