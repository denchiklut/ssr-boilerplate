import React from 'react'
import { Helmet } from '@shared/helmet'

export default function NotFoundPage() {
    return (
        <>
            <Helmet title='Страница не найдена' />

            <h3>404</h3>
            <h6>Здесь ничего нет</h6>
            <p>Вероятно, это произошло из-за опечатки в адресе или неправильной раскладки клавиатуры</p>
        </>
    )
}
