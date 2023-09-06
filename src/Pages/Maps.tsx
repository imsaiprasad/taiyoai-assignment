import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Maps = () => {


  const [data,setData]=useState([])

useEffect(()=>{

  axios.get("https://disease.sh/v3/covid-19/countries")
  .then((resp:any)=>{
    setData(resp.data)
  })
  .catch((e)=>{
    console.log(e)
  })

},[])

  return (
<>
<MapContainer center={[8.7832, 34.5085]} zoom={3} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

{
  data?.map((mark:any,index:any)=>{

    return (

      <Marker position={[mark.countryInfo.lat, mark.countryInfo.long]}>
      <Popup position={[mark.countryInfo.lat, mark.countryInfo.long]}>
        <div>
          <p>Country : {mark.country}</p>
          <p>Total active : {mark.active}</p>

          <p>Totla recovered : {mark.recovered}</p>
          <p>Total deaths : {mark.deaths}</p>


        </div>
      </Popup>
    </Marker>

    )

  })
}

</MapContainer>

<div style={{margin:"5px"}}>The Above Map shows Countries with Total No. of Active Cases , Recovered , Deaths respectively.</div>
</>
  )
}

export default Maps