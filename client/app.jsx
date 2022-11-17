import React from 'react'
import { createRoot } from 'react-dom/client'

import EntryPoint from './EntryPoint.jsx'

// Start point for the entire front end of the web app
createRoot(
  document.getElementById('root')
).render(
  <EntryPoint />
)
