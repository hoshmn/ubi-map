import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import styleData from './style.json';
console.log(styleData);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

var SHEET_URL = 'https://spreadsheets.google.com/feeds/list/1gyAdUp3tekxAtz8fibILM-zHyX5CXh5OuY0Xbjxhijw/1/public/full?alt=json';
mapboxgl.accessToken = 'pk.eyJ1IjoiZXZpY3Rpb24tbGFiIiwiYSI6ImNqY20zamVpcTBwb3gzM28yb292YzM3dXoifQ.uKgAjsMd4qkJNqEtr3XyPQ';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.66995747013945,
      lng: -103.59179687498357,
      zoom: 3
    };

    this.map = null;
  }
  
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: styleData,
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      height: '100vh',
      width: '100vw',
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


    load.call(this); 
  }

  featuresOnClick(e) {
    if (e.originalEvent.cancelBubble) {
        return;
    } else { // prevent click event from passing along to other nearby clusters
        e.originalEvent.cancelBubble = true;
    }
    if (e.features.length === 0) { return; }
    var coords = e.features[0].geometry.coordinates;
    if (!e.features[0].properties.hasOwnProperty('point_count')) {
        // single item
        // this.addCard(coords, e.features);

        const point = e.features[0];
        this.map.setFeatureState({
          source: 'media',
          id: point.id
        }, {
          selected: true
        });
        return;
    }
  }

  featuresOnHover(e) {
    if (e.originalEvent.cancelBubble) {
        return;
    } else { // prevent Hover event from passing along to other nearby clusters
        e.originalEvent.cancelBubble = true;
    }
    if (e.features.length === 0) { return; }
    var coords = e.features[0].geometry.coordinates;
    if (!e.features[0].properties.hasOwnProperty('point_count')) {
        // single item
        // this.addCard(coords, e.features);

        const point = e.features[0];
        this.map.setFeatureState({
          source: 'media',
          id: point.id
        }, {
          hover: true
        });
        return;
    }
  }
  
  render() {
    return (
      <div>
      <div className='sidebarStyle'>
        <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
      </div>
      <div ref={el => this.mapContainer = el} className='map-container' />
    </div>
    )
  }
}

function load () {
  /**
   * startsWith polyfill
   */
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
  }

  // this.map.on('mouseenter', 'clusters', (exx) => {
  //   this.map.getCanvas().style.cursor = 'pointer';
  // });
  // this.map.on('mouseleave', 'clusters', (exx) => {
  //   this.map.getCanvas().style.cursor = '';
  // });
  
  // this.map.on('click', 'clusters', this.featuresOnClick.bind(this));

  // the mediaData variables contain the complete set of data returned from gSheets
  var mediaData = { type: 'FeatureCollection', features: [] };

  const reqHandler = (source, req) => {
    var rows = JSON.parse(req.responseText).feed.entry;
    var properties = Object.keys(rows[0])
      .filter(function (p) { 
        return p.startsWith("gsx$") & !p.endsWith("_db1zf");
      })
      .map(function (p) { return p.substr(4); });
    
    var items = rows.map(function (r, ri) {
      var row = {};
      properties.forEach(function (p) {
        row[p] = r["gsx$" + p].$t === "" ? null : r["gsx$" + p].$t;
        if (['latitude', 'longitude'].indexOf(p) !== -1) {
          row[p] = +row[p];
        }
        if (row[p] === null) {
          row[p] = '';
        }
      });
      return {
        type: 'Feature',
        id: row.idd,
        geometry: {
          type: 'Point',
          coordinates: [row.longitude, row.latitude]
        },
        properties: row
      };
    });
    // add fetched items into either the mediaData or lmsData object
    mediaData = { type: 'FeatureCollection', features: items };
    this.map.getSource('media').setData(mediaData);
  }

  // Fetch Local Article Data
  var mediaReq = new XMLHttpRequest();
  mediaReq.addEventListener("load",  () => { reqHandler('media', mediaReq) });
  mediaReq.open("GET", SHEET_URL);
  mediaReq.send();
}

// ReactDOM.render(<App />, document.getElementById('app'));
export default App;

