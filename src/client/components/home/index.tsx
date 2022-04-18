import { useState } from 'react'
import css from './styles.scss'

export const Home = () => {
    const [count, setCount] = useState(0)

    return (
        <div className={css.wrapper}>
            <h3>Home page!</h3>
            <p>count {count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    )
}
