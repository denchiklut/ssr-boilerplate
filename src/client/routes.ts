import loadable from '@loadable/component'

const HomePage = loadable(() => import('./pages/home'))
const AboutPage = loadable(() => import('./pages/about'))
const NotFoundPage = loadable(() => import('./pages/not-found'))

export default [
    {
        path: '/',
        component: HomePage,
        exact: true
    },
    {
        path: '/about',
        exact: true,
        component: AboutPage
    },
    {
        path: '*',
        exact: false,
        component: NotFoundPage
    }
]
