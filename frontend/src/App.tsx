import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/Layout"
import CurrentDay from "./components/CurrentDay"
import Foods from "./components/Foods"
import Login from "./components/Login"
import Signup from "./components/Signup"


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route index element={<CurrentDay />} />
          <Route path="foods" element={<Foods />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* <Route path="concerts">
            <Route index element={<ConcertsHome />} />
            <Route path=":city" element={<City />} />
            <Route path="trending" element={<Trending />} />
          </Route> */}

        </Route>
      </Routes>
    </BrowserRouter>
  )
}


/************* Routes *************/

export function Home() {
  return (
    <div>Home</div>
  )
}