import Week from './Components/Week.jsx'
const React = require('react')
const { createRoot } = require('react-dom/client')

// Start point for the entire front end of the web app
createRoot(
  document.getElementById('root')
).render(
  <div>
    <Week/>
    <Week/>
    <Week/>
    <Week/>
    <Week/>

  </div>
)
