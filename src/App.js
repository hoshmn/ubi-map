import CardDock from './CardDock';
import Legend from './Legend';
import React from 'react';
import Tooltip from './Tooltip';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';
import styleData from './style.json';
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const MAX_SELECTED_POINTS = 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.66995747013945,
      lng: -103.59179687498357,
      zoom: 3,
      hovered: {},
      selectedIds: [],
      isTouchScreen: false
    };

    this.map = null;
    this.getCardDock = this.getCardDock.bind(this);
    this.getTooltip = this.getTooltip.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.getFeaturesByExperimentId = this.getFeaturesByExperimentId.bind(this);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: styleData,
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    
    this.map.on('move', () => {
      this.featuresOnUnhover();
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
    
    this.map.on('click', 'experimentSites', this.featuresOnClick.bind(this));
    this.map.on('mouseenter', 'experimentSites', this.featuresOnHover.bind(this));
    this.map.on('mouseleave', 'experimentSites', this.featuresOnUnhover.bind(this));

    this.map.on('touchstart', 'experimentSites', this.touchstart.bind(this));
    
    load.call(this); 
  }
  
  touchstart(e) {
    this.setState({ isTouchScreen: true });
  }

  getFeaturesByExperimentId(expId) {
    const { features } = this.map.getSource('experiments')._data;
    return features.filter(f => f.id === expId).map(f => f.properties);
  }
  
  featuresOnClick(e) {
    const { id: expId } = e.features[0];
    const selectedIds = [...this.state.selectedIds];
    const idx = selectedIds.indexOf(expId);
    const alreadySelected = idx > -1;

    if (!alreadySelected) {
      if (selectedIds.length >= MAX_SELECTED_POINTS) {
        console.log('OH SHET!');
        // warn user
        return;
      } else {
        selectedIds.push(expId);
      }
    } else {
      selectedIds.splice(idx, 1);
    }

    this.setState({ selectedIds });
    this.map.setFeatureState({
        source: 'experiments',
        id: expId
      }, { selected: !alreadySelected }
    );
  }

  featuresOnHover(e) {
    if (this.state.isTouchScreen) {
      // devices with touch screens shouldn't have tooltips
      return;
    }
    this.map.getCanvas().style.cursor = 'pointer';
    const { id: expId, properties } = e.features[0];    
    const { name, location, type } = properties;
    const { x, y } = e.point;

    this.setState({ hovered: { expId, name, location, type, x, y } });
    this.map.setFeatureState({
        source: 'experiments',
        id: expId
      }, { hover: true }
    );
  }

  featuresOnUnhover() {
    if (this.state.isTouchScreen || !this.state.hovered.expId) {
      return;
    }
    this.map.getCanvas().style.cursor = '';
    this.map.setFeatureState({
        source: 'experiments',
        id: this.state.hovered.expId
      }, { hover: false }
    );

    this.setState({ hovered: {} });
  }

  removeCard(expId) {
    const selectedIds = [...this.state.selectedIds];
    const idx = selectedIds.indexOf(expId);
    selectedIds.splice(idx, 1);

    this.setState({ selectedIds });
    this.map.setFeatureState({
        source: 'experiments',
        id: expId
      }, { selected: false }
    );
  }

  getTooltip() {
    const { expId, name, location, type, x, y } = this.state.hovered;
    let otherLocations = [];
    if (expId) {
      const features = this.getFeaturesByExperimentId(expId);
      otherLocations = features
        .map(f => f.location)
        .filter(l => l !== location);
    }
    return <Tooltip expId={expId} name={name} location={location} otherLocations={otherLocations} type={type} x={x} y={y}/>;
  }

  getCardDock() {
    if (!this.map || !this.state.selectedIds.length) {
      return null;
    }

    const cardData = this.state.selectedIds.map(this.getFeaturesByExperimentId);
    return <CardDock removeCard={this.removeCard} cardData={cardData} />
  }
  
  render() {
    return (
      <div className='app'>
        {this.getCardDock()}
        {this.getTooltip()}
        <div ref={el => this.mapContainer = el} className='map-container' />
        <Legend />
      </div>
    )
  }
}

function load () {
  // startsWith polyfill
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
  }

  var experimentsData = { type: 'FeatureCollection', features: [] };

  const reqHandler = (source, req) => {
    var rows = JSON.parse(req.responseText).feed.entry;
    var properties = Object.keys(rows[0])
      .filter(function (p) { 
        return p.startsWith('gsx$') & !p.endsWith('_db1zf');
      })
      .map(function (p) { return p.substr(4); });
    
    var items = rows.map(function (r, ri) {
      var row = {};
      properties.forEach(function (p) {
        row[p] = r['gsx$' + p].$t === '' ? null : r['gsx$' + p].$t;
        // mapbox wants numeric lat/long, and coerces id to num (so avoid type error headache)
        if (['latitude', 'longitude', 'eid', 'uid'].indexOf(p) !== -1) {
          row[p] = +row[p];
        }
        if (row[p] === null) {
          row[p] = '';
        }
      });
      return {
        type: 'Feature',
        id: row.eid,
        geometry: {
          type: 'Point',
          coordinates: [row.longitude, row.latitude]
        },
        properties: row
      };
    });

    experimentsData = { type: 'FeatureCollection', features: items };
    this.map.getSource('experiments').setData(experimentsData);
  }

  // Fetch Local Article Data
  var experimentsReq = new XMLHttpRequest();
  experimentsReq.addEventListener('load',  () => { reqHandler('experiments', experimentsReq) });
  experimentsReq.open('GET', process.env.REACT_APP_SHEET_URL);
  experimentsReq.send();
}

export default App;
