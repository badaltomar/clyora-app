import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

import Header from "./components/common/Header"
import HomeMain from "./components/common/HomeMain"
import Footer from "./components/common/Footer"
import "./components/common/App.css"

function App() {

  return (
    <div style={{backgroundColor: "#f7faff", minHeight: "100vh"}}>
      <Header/>
      <HomeMain />
      <Footer/>
    </div>
  )
}

export default App
