import { useLoaderData, Form, Link, redirect } from "react-router"
import { getBook, deleteBook } from "../storage"
import { useEffect, useState } from "react"

export const loader = async ({ params }) => {
    const id = params.id

    const book = await getBook(id)
    
    if (!book || book === null || book === undefined) {
        throw new Response("Not found!", { status: 404, statusText: "not found" })
    }

    return book
}

export const action = async ({ request }) => {
    const formData = await request.formData()
    const id = formData.get("id")
    await deleteBook(id)
}

export const Book = () => {
    const book = useLoaderData()
    const [seconds, setSeconds] = useState()

    useEffect(() => {
        setSeconds(0)

        const intervalId = setInterval(() => {
            setSeconds((prev) => prev + 1)
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [book.id])
    
    return (
        <div>
            <div>
                <div>
                    <p>Название: {book.title}</p>
                </div>
                <div>
                    <p>Автор: {book.author}</p>
                </div>
                <div>
                    <p>Год: {book.year}</p>
                </div>
                
                <nav>
                    <Form method="post" action="delete">
                        <button type="submit">delete</button>
                    </Form>
                </nav>
                <p>Вы на этой странице: {seconds}</p>
            </div>
        </div>
    )
}