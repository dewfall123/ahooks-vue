import { withDirectives, h, render } from 'vue';
import vClickAway from '../index'

describe('v-click-away', () => {

  it('should be defined', () => {
    expect(vClickAway).toBeDefined();
  });

  let container: HTMLDivElement;
  let container1: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container1 = document.createElement('div');
    container1.setAttribute('id', 'ele');
    document.body.appendChild(container);
    document.body.appendChild(container1);
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.removeChild(container1);
  });

  
  it('test on dom optional', async () => {
    const id = 'target';
    const innerId = 'inner';
    let state: number = 0;
    const component = {
      setup() {
        return () => (withDirectives(
          h('div', { id }, [
            h('p', { id: innerId })
          ]),
          [
            [ vClickAway, () => state++ ],
          ]
        ))
      }
    }
    render(h(component), container)

    document.body.click();
    expect(state).toEqual(1);

    (document.getElementById(id) as NonNullable<HTMLElement >).click();
    expect(state).toEqual(1);

    (document.getElementById(innerId) as NonNullable<HTMLElement >).click();
    expect(state).toEqual(1);

    document.body.click();
    expect(state).toEqual(2);
  });
});
