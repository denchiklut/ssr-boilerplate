import { Suspense } from 'react'
import loadable from '@loadable/component'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Loader } from '@shared/loader'
import { Drawer } from '@shared/drawer'

const About = loadable(() => import('pages/about'))
const Home = loadable(() => import('pages/home'))

import './styles.scss'

export const App = () => (
    <BrowserRouter>
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/' element={<Drawer />}>
                    <Route index element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
)
