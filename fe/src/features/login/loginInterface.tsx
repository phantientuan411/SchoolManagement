import LoginPage from './LoginPage.tsx'

const loginInterface = () => {
  return (
    <div className="containor_login w-screen  flex justify-center items-center bg-cover bg-center h-screen bg-[url('https://res.cloudinary.com/du9onbxav/image/upload/v1765747249/15a1c70196c792c03d1931d704fccc24_pkzpxg.jpg')]">

      {/* <div className="left_login w-1/2 h-screen">
        <div></div>
      </div> */}
      <div className="right_login  h-screen flex items-center justify-center">
        <div className="login w-full h-screen flex items-center justify-center">
          <LoginPage />
        </div>
      </div>
    </div>
  )
}

export default loginInterface