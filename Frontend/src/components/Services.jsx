import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RouteIcon from '@mui/icons-material/Route';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

function Services() {
  return (
    <>
     <div class="Services">
       <h5>SERVICES</h5>
       <h2>OUR LATEST SERVICES</h2>
       <div class="services-cards-container">
         <div class="services-cards">
           <div className="icon services">
             <DirectionsCarIcon sx={{ fontSize: 70 }}/>
           </div>
           <h3>Wedding Ceremony</h3>
           <p>
           A small river named Duden flows by their place and supplies it with the necessary regelialia.
           </p>

         </div>
         <div class="services-cards">
           <div className="icon services">
             <RouteIcon sx={{ fontSize: 70 }} />
           </div>
           <h3>City Transfer</h3>
           <p>
           A small river named Duden flows by their place and supplies it with the necessary regelialia.
           </p>

         </div>
         <div class="services-cards">
           <div className="icon services">
              <AirplaneTicketIcon sx={{ fontSize: 70 }} />
           </div>
           <h3>Airport Transfer</h3>
           <p>
           A small river named Duden flows by their place and supplies it with the necessary regelialia.
           </p>

         </div>
         <div class="services-cards">
           <div className="icon services">
           <RouteIcon sx={{ fontSize: 70 }} />
           </div>
           <h3>Whole City Tour</h3>
           <p>
           A small river named Duden flows by their place and supplies it with the necessary regelialia.
           </p>

         </div>
       </div>
      
     </div>
    </>
  )
}
export default Services