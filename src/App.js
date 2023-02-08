import './App.css';
import video from './bg.mp4'
import Map from './Map'
import { useState } from "react";

function App() {

  const [ip, setIp] = useState('8.8.8.8');
  const [location, setLocation] = useState('California, Mountain View');
  const [timeZone, setTimeZone] = useState('-08:00');
  const [isp, setIsp] = useState('Google LLC');
  const [center, setCenter] = useState([37.38605, -122.08385]);

  const s = 'at_xv6PM3rQjjoJr0rljuBxOqmVamw46';

  const findIP = async () => {
    
    try {
      const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${s}&ipAddress=${document.getElementById('input').value}`, {
        method: "GET",
      });
      const data = await res.json();
      setTimeZone(data.location.timezone);
      setIsp(data.isp);
      setLocation(`${data.location.region}, ${data.location.city}`)
      setCenter([data.location.lat, data.location.lng])
      setIp(data.ip)
      console.log(cords)

    } catch (error) {
      console.log(error)
    }
  }
  
  const leaveMenu = () => {
    document.getElementById('center').style.top = "-100vh";
    document.getElementById('app').style.top = "-100vh";
    document.getElementById('clickTrigger').style.display = "none";
  }

  let cords = center;

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

        <Map cords={cords}/>
        
      </div>

    </>
  );
}

export default App;
