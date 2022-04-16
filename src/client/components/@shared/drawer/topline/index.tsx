import type { FC, MouseEvent } from 'react'
import MenuIcon from './img/menu.icon.svg'
import css from './styles.scss'

interface Props {
    onCLick: () => void
}
export const TopLine: FC<Props> = ({ onCLick }) => {
    const prevent = (event: MouseEvent) => event.stopPropagation()

    return (
        <header className={css.wrapper} onClick={prevent}>
            <button data-testid='toggle' className={css.btn} onClick={onCLick}>
                <MenuIcon width={20} height={20} />
            </button>
            <p className={css.title}>SSR APP</p>
        </header>
    )
}
