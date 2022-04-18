import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { TopLine } from '@shared/drawer/topline'
import { Navbar } from '@shared/drawer/navbar'

import css from './styles.scss'

export const Drawer = () => {
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)
    const toggle = () => setOpen(!open)

    useEffect(() => {
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    })

    return (
        <>
            <TopLine onCLick={toggle} />
            <main className={css.content}>
                <Outlet />
            </main>

            <Navbar isOpen={open} toggle={toggle} />
        </>
    )
}
