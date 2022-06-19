
import './App.css';

import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Top from './components/Top';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './Services/WeatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query, setQuery ] = useState({q: 'berlin'});
  const [units , setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(()=>{
    
 const fetchWeather = async () => {
    
  const message = query.q ? query.q : 'current location.'

  toast.info('Fetching weather for ' + message)

    await getFormattedWeatherData({...query,units}).then(
      (data)=>{

       toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)

      setWeather(data);
    });

  };
  fetchWeather();
  },[query, units]);

  const formatBackground = ()=> {
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-400 to-orange-700'
  }


  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-20 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400  ${formatBackground()}`}>
      <Top setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}  />
     
      {weather && (
        <div>

          <TimeAndLocation weather={weather} />
          <TemperatureDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />

        </div>

      )}

     <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}  />

    </div>

  );
}
//max-w-screen-md
//https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=d7309540a9bccd49317618615ecd10b6

export default App;
