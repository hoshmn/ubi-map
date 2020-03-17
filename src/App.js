import React from 'react';
import CardDock from './CardDock';
import Tooltip from './Tooltip';
import './App.css';
import mapboxgl from 'mapbox-gl';
import styleData from './style.json';

const SHEET_URL = 'https://spreadsheets.google.com/feeds/list/1gyAdUp3tekxAtz8fibILM-zHyX5CXh5OuY0Xbjxhijw/1/public/full?alt=json';
mapboxgl.accessToken = 'pk.eyJ1IjoiZXZpY3Rpb24tbGFiIiwiYSI6ImNqY20zamVpcTBwb3gzM28yb292YzM3dXoifQ.uKgAjsMd4qkJNqEtr3XyPQ';
const MAX_SELECTED_POINTS = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.66995747013945,
      lng: -103.59179687498357,
      zoom: 3,
      hovered: {},
      selectedIds: []
    };

    this.map = null;
    this.getCardDock = this.getCardDock.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }
  
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: styleData,
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    
    this.map.on('move', () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });

    this.map.on('click', 'clusters', this.featuresOnClick.bind(this));
    this.map.on('mouseenter', 'clusters', this.featuresOnHover.bind(this));
    this.map.on('mouseleave', 'clusters', this.featuresOnUnhover.bind(this));

    load.call(this); 
  }

  featuresOnClick(e) {
    const { id } = e.features[0];
    const selectedIds = [...this.state.selectedIds];
    const idx = selectedIds.indexOf(id);
    const alreadySelected = idx > -1;

    if (!alreadySelected) {
      if (selectedIds.length >= MAX_SELECTED_POINTS) {
        console.log('OH SHET!');
        // warn user
        return;
      } else {
        selectedIds.push(id);
      }
    } else {
      selectedIds.splice(idx, 1);
    }

    this.setState({ selectedIds });
    this.map.setFeatureState({
        source: 'media',
        id
      }, { selected: !alreadySelected }
    );
  }

  featuresOnHover(e) {
    this.map.getCanvas().style.cursor = 'pointer';
    const { id, properties } = e.features[0];
    const { name, location } = properties;
    const { x, y } = e.point;
    this.setState({ hovered: { id, name, location, x, y } });
    this.map.setFeatureState({
        source: 'media',
        id
      }, { hover: true }
    );
  }

  featuresOnUnhover() {
    this.map.getCanvas().style.cursor = '';
    this.map.setFeatureState({
        source: 'media',
        id: this.state.hovered.id
      }, { hover: false }
    );

    this.setState({ hovered: {} });
  }

  removeCard(id) {
    const selectedIds = [...this.state.selectedIds];
    const idx = selectedIds.indexOf(id);
    selectedIds.splice(idx, 1);

    this.setState({ selectedIds });
    this.map.setFeatureState({
        source: 'media',
        id
      }, { selected: false }
    );
  }

  getCardDock() {
    if (!this.map || !this.state.selectedIds.length) {
      return null;
    }
    const { features } = this.map.getSource('media')._data;
    const cardData = this.state.selectedIds.map(id => {
      return features.find(f => f.id === id).properties;
    });

    return <CardDock removeCard={this.removeCard} cardData={cardData} />
  }
  
  render() {
    return (
      <div className='app'>
        {this.getCardDock()}
        <div ref={el => this.mapContainer = el} className='map-container' />
        <Tooltip {...this.state.hovered} />
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

  var mediaData = { type: 'FeatureCollection', features: [] };

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
        if (['latitude', 'longitude', 'expid', 'uid'].indexOf(p) !== -1) {
          row[p] = +row[p];
        }
        if (row[p] === null) {
          row[p] = '';
        }
      });
      return {
        type: 'Feature',
        id: row.expid,
        geometry: {
          type: 'Point',
          coordinates: [row.longitude, row.latitude]
        },
        properties: row
      };
    });

    mediaData = { type: 'FeatureCollection', features: items };
    this.map.getSource('media').setData(mediaData);
  }

  // Fetch Local Article Data
  var mediaReq = new XMLHttpRequest();
  mediaReq.addEventListener('load',  () => { reqHandler('media', mediaReq) });
  mediaReq.open('GET', SHEET_URL);
  mediaReq.send();
}

export default App;
