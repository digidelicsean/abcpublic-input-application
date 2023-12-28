import React from 'react'

// Importing the necessary components
import DSSelection from './DSSelection'   // Importing the DSSelection component
import GameAssortmentSelection from './GameAssortmentSelection'   // Importing the GameAssortmentSelection component
import DateSelection from './DateSelection'   // Importing the DateSelection component

import style from "../Styles/OAMatchSection.module.css"   // Importing the CSS module for styling

// Defining the OAMatchSection function component
function OAMatchSection() {
  return (
    // Creating a container div with the specified CSS class
    <div className={style.container}>   
    {/* // Rendering the DSSelection component with the specified CSS classes */}
      <DSSelection className={`${style['ds-selection']} ${style.border}`} />   
      {/* // Rendering the GameAssortmentSelection component with the specified CSS classes */}
      <GameAssortmentSelection className={`${style['game-assortment-selection']} ${style.border}`} />   
      {/* // Rendering the DateSelection component with the specified CSS classes */}
      <DateSelection className={`${style['date-selection']} ${style.border}`} />   
    </div>
  )
}

export default OAMatchSection   // Exporting the OAMatchSection component as the default export