import "./App.css"
import LoginPage from "./features/login/LoginPage"
const App = () => {
  return (
    <>
      <div className="containor_login w-screen h-screen flex">

        <div className="w-1/2 h-screen">
          <div></div>
        </div>
        <div className="w-1/2 h-screen flex items-center justify-center">
          <div className="login w-full h-screen flex items-center justify-center">
            <LoginPage />
          </div>
        </div>
      </div>

    </>


  )
}

export default App