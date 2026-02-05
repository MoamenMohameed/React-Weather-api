import './App.css'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

import { useEffect,useState } from 'react';

import axios from 'axios'
import moment from 'moment/min/moment-with-locales'
import { useTranslation } from 'react-i18next';

function App() {

  const { t, i18n } = useTranslation();
  const [lang,setLang] = useState("en")
  const [dateAndTime, setDateAndTime] = useState("");
  const [temprature,setTemp] = useState({
    temp:null,
    min:null,
    max:null,
    description:"",
    icon:"icon"
  })

	function handleLanguageClick() {
		if (lang == "en") {
			setLang("ar");
			i18n.changeLanguage("ar");
			moment.locale("ar");
		} else {
			setLang("en");
			i18n.changeLanguage("en");
			moment.locale("en");
		}

		setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
	}


useEffect(()=>{
  i18n.changeLanguage(lang)
},[])
useEffect(()=>{
    // i18n.changeLanguage("ar")
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=9cf0d4d5a231e5470d1eb620471f5076')
    .then(function (response) {
      // handle success
      console.log(response);
      const temp = Math.round(response.data.main.temp - 272.15)
      const min = Math.round(response.data.main.temp_min - 272.15)
      const max = Math.round(response.data.main.temp_max - 272.15)
      const description = response.data.weather[0].description
      const weatherIcon = response.data.weather[0].icon
      console.log(temp,min,max,description,weatherIcon)
      setTemp({temp,
                min,
                max,
                description,
                icon: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
              })
        })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
},[])

console.log(temprature.icon)

 

return (
    <div style={{direction:lang=="en"?"ltr":"rtl"}}>
       <Container maxWidth="sm">
        {/* app */}
        <div style={{height:"100vh",display:'flex', alignItems:"center", justifyContent:"center",flexDirection:"column",}}>

          {/* content */}
          <div style={{width:"100%", background:"#01329ba1",padding:"10px",borderRadius:"20px"}}>
            {/* city-date */}
            <div style={{display:"flex", justifyContent:"start", alignItems:"flex-end"}}> 
              <Typography variant='h1' style={{marginRight:"20px"}}>{t("cairo")}</Typography>
              <Typography variant='h6' style={{marginRight:"20px"}}>{dateAndTime}</Typography>
            </div>
            {/* city-date */}
              
              <hr style={{width:"100%"}}/>
            
            {/* weather data */}
            <div style={{display:"flex", justifyContent:"space-around", alignItems:"center", gap:"50px", textAlign:"center"}}>
              {/* temp */}
                <div>
                <Typography variant='h1' style={{textAlign:"center"}}>{temprature.temp}</Typography>
                {/* temp-text */}
                <div style={{display:"flex", textAlign:"center", flexDirection:"column"}}>
                  <Typography variant='h5'>{t(temprature.description)}</Typography>
                  <Typography variant='h5' sx={{fontSize:"16px"}} > {t("Min")} : {temprature.min} | {t("Max")} : {temprature.max}</Typography>
                </div>
                {/* temp-text */}
                </div>
                {/* temp */}

                {/* icon */}
                <div>
                  <img src={temprature.icon} alt="" style={{width:"200px"}}/>
                </div>
                {/* icon */}

              </div>
              {/* weather data */}

           </div>
          {/* btn-translate */}
          <div style={{width:"100%", textAlign:"left"}}>
           <Button variant="text" sx={{color:"#01329ba1"}} onClick={handleLanguageClick}>{lang == "en"? "Arabic" : "English"}</Button>
          </div>
          {/* btn-translate */}
          {/* content */}
        </div>
        {/* app */}
      </Container>
    </div>
  )
}

export default App
