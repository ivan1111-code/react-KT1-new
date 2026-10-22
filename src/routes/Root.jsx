import { Outlet, useLoaderData, redirect, NavLink, useNavigation } from "react-router"
import { getBooks, createBook } from "../storage"
import { Form } from "react-router"
import "../index.css"
import { useEffect } from "react"

export const action = async ({ request }) => {
    const formData = await request.formData()

    const title = formData.get("title")
    const author = formData.get("author")
    const year = formData.get("year")

    if (!title || !author || !year) {
        return { error: "заполните все поля" }
    }

    await createBook({ title: title, author: author, year: year })
    return redirect("/")
}

export const loader = () => {
    return getBooks()
}

export const Root = () => {
    const books = useLoaderData()

    useEffect(() => {
        document.title = `Книг: ${books.length}`
    }, [books])

    const navigation = useNavigation()

    const isSubmitting = navigation.state === "submitting"

    return (
        <div>
            
            <header>
                <h1>library</h1>
                <nav>
                    <div>
                        <Form method="post">
                            <input type="text" name="title" placeholder="title" id="titleInput" />
                            <input type="text" name="author" placeholder="author" id="authorInput" />
                            <input type="number" name="year" placeholder="year" id="yearInput" />
                            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Добавляем" : "Добавить"}</button>
                        </Form>
                    </div>
                    <ul>
                        {books.length === 0 ? "Книг пока нет" : books.map((item) => (
                            <li>
                                <NavLink 
                                    to={"/books/" + item.id}
                                    className={({ isActive, isPending }) => {
                                        return isActive ? "active" : isPending ? "pending" : ""
                                    }}
                                    >{item.title + " by " + item.author}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            
            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </div>
    )
}