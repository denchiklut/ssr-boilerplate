import type { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import css from './styles.scss'

interface Props {
    isOpen: boolean
    toggle: () => void
}

export const Navbar: FC<Props> = ({ isOpen, toggle }) => {
    const onClick = () => toggle()
    const prevent = (event: MouseEvent) => event.stopPropagation()

    return (
        <div className={cn(css.drawer, { [css.closed]: !isOpen })} onClick={prevent}>
            <Link className={css.link} to='/' onClick={onClick}>
                Home
            </Link>
            <Link className={css.link} to='/about' onClick={onClick}>
                About
            </Link>
        </div>
    )
}
