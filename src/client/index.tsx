import 'babel-polyfill';

import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';

const rootElement = document.getElementById('app')!;
render(<App/>, rootElement);
