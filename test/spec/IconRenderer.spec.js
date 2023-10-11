import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  inject,
  insertCSS
} from 'bpmn-js/test/helper';

import RendererModule from '../../src';

import diagramXML from '../fixtures/icons.bpmn';

const singleStart = window.__env__ && window.__env__.SINGLE_START === 'renderer';

insertCSS(
  'diagram.css',
  require('bpmn-js/dist/assets/diagram-js.css').default
);

insertCSS(
  'bpmn-js.css',
  require('bpmn-js/dist/assets/bpmn-js.css').default
);

insertCSS(
  'bpmn-font.css',
  require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css').default
);

insertCSS(
  'test.css',
  require('../test.css').default
);


describe('IconRenderer', function() {

  beforeEach(async function() {
    const modeler = new BpmnModeler({
      container: document.body,
      additionalModules: [ RendererModule ],
      iconRenderer: {
        icons: {

          // activities
          'bpmn:BusinessRuleTask': require('../fixtures/svg/business-rule-task.svg').default,
          'bpmn:ManualTask': require('../fixtures/svg/manual-task.svg').default,
          'bpmn:ReceiveTask': require('../fixtures/svg/receive-task.svg').default,
          'bpmn:ScriptTask': require('../fixtures/svg/script-task.svg').default,
          'bpmn:SendTask': require('../fixtures/svg/send-task.svg').default,
          'bpmn:ServiceTask': require('../fixtures/svg/service-task.svg').default,
          'bpmn:UserTask': require('../fixtures/svg/user-task.svg').default,

          // events
          'bpmn:BoundaryEvent': {
            'bpmn:CancelEventDefinition': require('../fixtures/svg/cancel-catch.svg').default,
            'bpmn:CompensateEventDefinition': require('../fixtures/svg/compensate-catch.svg').default,
            'bpmn:ConditionalEventDefinition': require('../fixtures/svg/conditional.svg').default,
            'bpmn:ErrorEventDefinition': require('../fixtures/svg/error-catch.svg').default,
            'bpmn:EscalationEventDefinition': require('../fixtures/svg/escalation-catch.svg').default,
            'bpmn:MessageEventDefinition': require('../fixtures/svg/message-catch.svg').default,
            'bpmn:SignalEventDefinition': require('../fixtures/svg/signal-catch.svg').default,
            'bpmn:TimerEventDefinition': require('../fixtures/svg/timer.svg').default,
          },
          'bpmn:EndEvent': {
            'bpmn:CancelEventDefinition': require('../fixtures/svg/cancel-throw.svg').default,
            'bpmn:CompensateEventDefinition': require('../fixtures/svg/compensate-throw.svg').default,
            'bpmn:ErrorEventDefinition': require('../fixtures/svg/error-throw.svg').default,
            'bpmn:EscalationEventDefinition': require('../fixtures/svg/escalation-throw.svg').default,
            'bpmn:MessageEventDefinition': require('../fixtures/svg/message-throw.svg').default,
            'bpmn:SignalEventDefinition': require('../fixtures/svg/signal-throw.svg').default,
            'bpmn:TerminateEventDefinition': require('../fixtures/svg/terminate.svg').default,
          },
          'bpmn:IntermediateCatchEvent': {
            'bpmn:ConditionalEventDefinition': require('../fixtures/svg/conditional.svg').default,
            'bpmn:LinkEventDefinition': require('../fixtures/svg/link-catch.svg').default,
            'bpmn:MessageEventDefinition': require('../fixtures/svg/message-catch.svg').default,
            'bpmn:SignalEventDefinition': require('../fixtures/svg/signal-catch.svg').default,
            'bpmn:TimerEventDefinition': require('../fixtures/svg/timer.svg').default,
          },
          'bpmn:IntermediateThrowEvent': {
            'bpmn:CompensateEventDefinition': require('../fixtures/svg/compensate-throw.svg').default,
            'bpmn:EscalationEventDefinition': require('../fixtures/svg/escalation-throw.svg').default,
            'bpmn:LinkEventDefinition': require('../fixtures/svg/link-throw.svg').default,
            'bpmn:MessageEventDefinition': require('../fixtures/svg/message-throw.svg').default,
            'bpmn:SignalEventDefinition': require('../fixtures/svg/signal-throw.svg').default,
          },
          'bpmn:StartEvent': {
            'bpmn:CompensateEventDefinition': require('../fixtures/svg/compensate-catch.svg').default,
            'bpmn:ErrorEventDefinition': require('../fixtures/svg/error-catch.svg').default,
            'bpmn:EscalationEventDefinition': require('../fixtures/svg/escalation-catch.svg').default,
            'bpmn:ConditionalEventDefinition': require('../fixtures/svg/conditional.svg').default,
            'bpmn:MessageEventDefinition': require('../fixtures/svg/message-catch.svg').default,
            'bpmn:SignalEventDefinition': require('../fixtures/svg/signal-catch.svg').default,
            'bpmn:TimerEventDefinition': require('../fixtures/svg/timer.svg').default,
          }
        }
      }
    });

    await modeler.importXML(diagramXML);
  });


  (singleStart ? it.only : it)('should render icons', inject(function() {}));

});