import { Routes, Route } from 'react-router-dom'

import { Drawer } from '../drawer'
import About from 'pages/about'
import Home from 'pages/home'

import './styles.scss'

const App = () => (
    <Routes>
        <Route path='/' element={<Drawer />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
        </Route>
    </Routes>
)
export default App
