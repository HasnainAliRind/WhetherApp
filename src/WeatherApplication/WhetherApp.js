import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import './WheatherStyle.css'
import './WheatherAppMedia.css'
import locationGif from './ezgif.com-crop.gif'
function WhetherApp() {


  // ALl States  
  let [city, setCity] = useState(null);
  let [search, setSearch] = useState("Karachi");
  let [unit, setUnit] = useState('metric');
  let [unitSymbol, changeUnitSymbol] = useState('°C');
  let [activeUnitState, setUnitState] = useState(true)
  let [cloudness, setcloudness] = useState(null)
  let [LonLat, setLonLat] = useState(null)
  let [loading, setLoading] = useState(false)
  let [seaLevel, ShowSeaLevel] = useState(false)
  let [groundLevel, ShowgroundLevel] = useState(false)
  let [Visibility, ShowVisibility] = useState(false)
  let [feelLike, ShowFeelLike] = useState(false)
  let [getVisibi, setVisibi] = useState(null)
  let [hideSettings, setHideSettings] = useState(-100)
  let [cityName , setCityName] = useState('karachi')

  useEffect(() => { // Fatching API's data
    let timer = setTimeout(() => {
    const fetchData = async () => {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=${unit}&appid=17b838ebd88324a7efb98d8630a4d0d0`
      setLoading(true)
      let fetching = await fetch(url);
      let dataToJson = await fetching.json()
      setLoading(false)
      setCity(dataToJson.main)
      setcloudness(dataToJson.clouds)
      setLonLat(dataToJson.coord)
      setCityName(dataToJson.name)
      setVisibi(dataToJson.visibility)
    }
    fetchData();
  }, 800);

  return () => clearTimeout(timer)
  }, [search, unit])



  return (



    <div className='Dashboard'>



      {/* Dasboard */}
      <div className='dash'>
        <div className="data">

          <div className='top_of_data'>
            <input type="text" placeholder='Search any city' value={search} onChange={(e) => {
              setSearch(e.target.value)
            }} />
            <button onClick={() => {
              setHideSettings(0)
            }}><i className='fas fa-cog'></i></button>
          </div>
          {
            loading && <Spinner />
          }

          {
            city ? (

              <>
                {!loading && <>
                  <div className='details'><div><span>{cityName}</span></div><span>{city.temp} {unitSymbol}</span></div>
                  <div className='futher'>
                    <div><h3>{city.pressure} hpa</h3><p>Pressure</p></div>
                    <div><h3>{city.humidity} %</h3><p>humidity</p></div>
                    <div><h3>{cloudness.all} %</h3><p>Cloudness</p></div>

                    <div style={{ display: seaLevel === true ? 'block' : 'none' }}><h3>{!city.sea_level ? "--" : `${city.sea_level} hpa`}</h3><p>Sea Level</p></div>
                    <div style={{ display: groundLevel === true ? 'block' : 'none' }}><h3>{!city.grnd_level ? "--" : `${city.grnd_level} hpa`}</h3><p>Ground Level</p></div>
                    <div style={{ display: Visibility === true ? 'block' : 'none' }}><h3>{getVisibi / 100} km</h3><p>Visibility</p></div>
                    <div style={{ display: feelLike === true ? 'block' : 'none' }}><h3>{city.feels_like}{unitSymbol}</h3><p>Feel like</p></div>


                  </div>


                  <div className='furtherDetails'>
                    <div>
                      <li>Latitude is <strong>{`${LonLat.lat}`.slice(0, 3).replace(".", "")}°</strong></li>
                      <li>Latitude is <strong>{`${LonLat.lon}`.slice(0, 3).replace(".", "")}°</strong></li>
                    </div>
                    <div>
                      <li>Minimum temperature is <strong>{city.temp_min} {unitSymbol}</strong></li>
                      <li>Maximum temperature is <strong>{city.temp_max} {unitSymbol}</strong></li>
                    </div>
                  </div>
                </>
                }
              </>
            ) : (
              <h2 className='Msg404'> <i className='far fa-frown'></i>City is not Founding.</h2>
             
            )
          }
          {/* <h3>Temperature of {search} </h3> */}
        </div>







        {/* Setting section */}
        <div className="settings" style={{ right: `${hideSettings}%` }}>
          {/* <h2>Settings</h2> */}
          <button className='closeBtn' onClick={() => setHideSettings(-100)}><i className='fas fa-close'></i></button>
          <h2>Degree</h2>
          <div className='DegFran'>
            <div
              style={{ backgroundColor: activeUnitState ? '#11b4ff' : '#efefef', color: !activeUnitState ? '#000' : '#fff' }}
              onClick={() => {
                setUnitState(true)
                setUnit('metric')
                changeUnitSymbol('°C')
              }}><span style={{ borderRight: !activeUnitState ? '1px solid #000' : '1px solid #fff', paddingRight: '8px' }}>°C </span><span>Celcus</span></div>


            <div style={
              { backgroundColor: !activeUnitState ? '#11b4ff' : '#efefef', color: !activeUnitState ? '#efefef' : '#000' }}
              onClick={() => {
                setUnitState(false)
                setUnit('imperial');
                changeUnitSymbol('°F')
              }}><span style={{ borderRight: activeUnitState ? '1px solid #000' : '1px solid #fff', paddingRight: '8px' }}>°F </span><span>Fahrenheit</span></div>
          </div>


          {/* Other Options */}


          <div className="options">
            <h3>Other Settings</h3>
            <div>Sea Level <input type="checkbox" onChange={(e) => e.target.checked ? ShowSeaLevel(true) : ShowSeaLevel(false)} /> </div>
            <div>Ground Level <input type="checkbox" onChange={(e) => e.target.checked ? ShowgroundLevel(true) : ShowgroundLevel(false)} /> </div>
            <div>Visibility <input type="checkbox" onChange={(e) => e.target.checked ? ShowVisibility(true) : ShowVisibility(false)} /> </div>
            <div>Feel like <input type="checkbox" onChange={(e) => e.target.checked ? ShowFeelLike(true) : ShowFeelLike(false)} /> </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default WhetherApp
