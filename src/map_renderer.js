import './css/leaflet.css!';
import './css/MarkerCluster.css!';
import './css/MarkerCluster.Default.css!';
import WorldMap from './worldmap';
let firstRender = true;

export default function link(scope, elem, attrs, ctrl) {
  ctrl.events.on('render', () => {
    render();
    ctrl.renderingCompleted();
  });

  function render() {
    if (!ctrl.data) return;

    // delay first render as the map panel sizing is bugged first render even though the element has correct height
    if (firstRender) {
      firstRender = false;
      setTimeout(render, 100);
      return;
    }

    const mapContainer = elem.find('.mapcontainer');

    if (mapContainer[0].id.indexOf('{{') > -1) {
      return;
    }

    if (!ctrl.map) {
      ctrl.map = new WorldMap(ctrl, mapContainer[0]);
    }

    ctrl.map.focus();
    ctrl.map.resize();

    if (ctrl.mapCenterMoved) ctrl.map.panToMapCenter();

    if (!ctrl.map.legend && ctrl.panel.showLegend) ctrl.map.createLegend();

    if (ctrl.panel.locationData === 'geo json') {
      ctrl.map.drawGeoJson();
    } else if(ctrl.panel.showLines) {
      ctrl.map.drawLines()
    } else {
      ctrl.map.drawCircles();
    }
  }
}
