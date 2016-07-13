import './core/style';
import {makeDOMDriver, div, input, p, DOMSource} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import {run} from '@cycle/xstream-run';
import {Stream} from 'xstream';

type AppDrivers = {
  DOM: Function;
}

type AppSources = {
  DOM: DOMSource;
}

let drivers: AppDrivers = {
  DOM: makeDOMDriver('#app')
};

function main(sources: AppSources): AppSources {
  let sinks: AppSources = {
    DOM: sources.DOM.select('input').events('change')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        div([
          input({attrs: {type: 'checkbox'}}), 'Toggle me',
          p(toggled ? 'ON' : 'off')
        ])
      )
  };

  return sinks;
}

document.addEventListener('DOMContentLoaded', () => run(main, drivers));
