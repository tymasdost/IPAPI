import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import icon from './icon'
import './App.css';
import video from './bg.mp4'
import { useState } from "react";
//https://geo.ipify.org/api/v2/country,city?apiKey=at_xv6PM3rQjjoJr0rljuBxOqmVamw46&ipAddress=8.8.8.8

function App() {
  const [ip, setIp] = useState('8.8.8.8');
  const [location, setLocation] = useState('California');
  const [timeZone, setTimeZone] = useState('');
  const [isp, setIsp] = useState('');
  const [center, setCenter] = useState([37.40599, -122.078514]);

  const leaveMenu = () => {
    document.getElementById('center').style.top = "-100vh";
    document.getElementById('app').style.top = "-100vh";
    document.getElementById('clickTrigger').style.display = "none";
  }

  const s = 'at_xv6PM3rQjjoJr0rljuBxOqmVamw46';

  const findIP = async () => {
    setIp(await document.getElementById('input').value)
    try {
      const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${s}&ipAddress=${ip}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data)
      setTimeZone(data.location.timezone);
      setIsp(data.isp);
      setLocation(`${data.location.region}, ${data.location.city}`)
      setCenter([data.location.lat, data.location.lng])

    } catch (error) {
      console.log(error)
    }
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
            <div className='data'>{ip}</div>
          </div>
          <span className='line'></span>
          <div className='item'>
            <div className='name'>LOCATION</div>
            <div className='data'>{location}</div>
          </div>
          <span className='line'></span>
          <div className='item'>
            <div className='name'>TIMEZONE</div>
            <div className='data'>UTC {timeZone}</div>
          </div>
          <span className='line'></span>
          <div className='item'>
            <div className='name'>ISP</div>
            <div className='data'>{isp}</div>
          </div>
        </div>
        <div id="map">
        <MapContainer style={{width:'100%',height:'100%'}} center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={icon} position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        </div>
        
      </div>

    </>
  );
}

export default App;
