import './App.css'
import Header from './components/header/Header'
// import Loader from './pages/loader'
import LoginPage from './pages/login/LoginPage'

function App() {
 
  return (
    <>
        <div className="App">
         {/* <Loader />  */}
        <LoginPage />
        <Header />
        </div>
    </>
  )
}

export default App
