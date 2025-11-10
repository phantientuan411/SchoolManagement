import LoginPage from './LoginPage.tsx'

const loginInterface = () => {
  return (
    <div className="containor_login w-screen h-screen flex">

        <div className="left_login w-1/2 h-screen">
          <div></div>
        </div>
        <div className="right_login w-1/2 h-screen flex items-center justify-center">
          <div className="login w-full h-screen flex items-center justify-center">
            <LoginPage />
          </div>
        </div>
      </div>
  )
}

export default loginInterface