import { deleteBook } from "../storage"
import { redirect } from "react-router"

export const action = async ({ params }) => {
    const isDelete = prompt("удалить книгу да/нет?", "да")
    if (isDelete === "да") {
        const bookID = params.id
        await deleteBook(bookID)
        alert("удаление прошло успешно")
    } else if (isDelete === "нет") {
        alert("удаление отменено")
    } else {
        alert("удаление отменено")
    }
    return redirect("/")
}
