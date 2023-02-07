import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import icon from './icon'
import './App.css';
import video from './bg.mp4'


function App() {


  const leaveMenu = () => {
    document.getElementById('center').style.top = "-100vh";
    document.getElementById('app').style.top = "-100vh";
    document.getElementById('clickTrigger').style.display = "none";
  }

  const findIP = () => {
    console.log("zmrde")
  }
  return (
    <>
      <div id='clickTrigger' onClick={leaveMenu}></div>
      <video id='myVideo' loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video>
      <div id='center'>
        <div className='logo heading'>IP Address Tracker</div>
        <div className='copy'>©made by @tymasdost</div>
        <div className='info'>click to continue</div>
      </div>
      <div id='app'>
        <div className='heading'>IP Address Tracker</div>
        <div className='input'>
          <input id='input' type="text" placeholder='Enter IP Here'></input>
          <button id='find' onClick={findIP}>{">"}</button>
        </div>
        <div className='output'>
          <div className='item'>
            <div className='name'>IP ADDRESS</div>
            <div className='data'>8.8.8.8</div>
          </div>
          <span className='line'></span>
          <div className='item'>
            <div className='name'>LOCATION</div>
            <div className='data'>California, Mountain View</div>
          </div>
          <span className='line'></span>
          <div className='item'>
            <div className='name'>TIMEZONE</div>
            <div className='data'>UTC -07:00</div>
          </div>
          <span className='line'></span>
          <div className='item'>
            <div className='name'>ISP</div>
            <div className='data'>Google LLC</div>
          </div>
        </div>
        <MapContainer id="map" center={[51.505, -0.09]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={icon} position={[51.505, -0.09]}>
          </Marker>
        </MapContainer>
        </div>
        
    </>
  );
}

export default App;
