import { render } from 'preact';
import About from './About';
import Applet from './Applet';

const script = document.getElementById('applet-script');
const container = document.getElementById('container');

// Should probably do this in a better way but oh well
switch (script.dataset?.type) {
  case 'about':
    render(<About />, container);
    break;
  case 'applet':
  default:
    render(<Applet />, container);
    break;
}
