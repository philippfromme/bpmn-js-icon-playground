import inherits from 'inherits-browser';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  is,
  isAny
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isLabel
} from 'bpmn-js/lib/util/LabelUtil';


import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';

var HIGH_PRIORITY = 1250;


export default function IconRenderer(
    config,
    bpmnRenderer,
    eventBus) {

  this._bpmnRenderer = bpmnRenderer;

  this._icons = config ? config.icons : {};

  BaseRenderer.call(this, eventBus, HIGH_PRIORITY);
}

inherits(IconRenderer, BaseRenderer);

IconRenderer.prototype.canRender = function(element) {

  if (isLabel(element)) {
    return false;
  }

  return !!(
    isAny(element, [ 'bpmn:Task', 'bpmn:Event' ]) && this._getIcon(element)
  );
};

IconRenderer.prototype._getIcon = function(element) {
  if (is(element, 'bpmn:Event')) {
    const icons = this._icons[element.type];

    const { businessObject } = element,
          eventDefinition = businessObject.eventDefinitions && businessObject.eventDefinitions[0];

    if (eventDefinition) {
      return icons[eventDefinition.$type];
    } else {
      return;
    }
  }

  return this._icons[element.type];
};

IconRenderer.prototype.drawShape = function(parentGfx, element) {

  var renderer = this._bpmnRenderer.handlers[
    [
      'bpmn:BoundaryEvent',
      'bpmn:EndEvent',
      'bpmn:IntermediateCatchEvent',
      'bpmn:IntermediateThrowEvent',
      'bpmn:StartEvent',
      'bpmn:Task'
    ].find(t => is(element, t))
  ];

  var gfx = renderer(parentGfx, element, { renderIcon: false });

  var icon = this._getIcon(element);

  console.log('icon', icon);

  var size = 18;

  var padding = is(element, 'bpmn:Task') ? {
    x: 5,
    y: 5
  } : {
    x: (element.width - size) / 2,
    y: (element.height - size) / 2
  };

  var img = svgCreate('image');
  svgAttr(img, {
    href:  'data:image/svg+xml;utf8,' + icon,
    width: size,
    height: size,
    ...padding
  });

  svgAppend(parentGfx, img);

  return gfx;
};

IconRenderer.$inject = [
  'config.iconRenderer',
  'bpmnRenderer',
  'eventBus'
];