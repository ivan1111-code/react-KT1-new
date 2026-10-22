import { RouterProvider, createBrowserRouter } from "react-router"
import { createRoot } from 'react-dom/client'
import { loader as rootloader, Root, action as createBookAction } from "./routes/Root"
import { ChooseMenu } from "./routes/ChooseMenu"
import { loader as bookLoader, Book } from "./routes/Book"
import { ErrorPage } from "./routes/ErrorPage"
import { action as deleteAction } from "./routes/DeleteBook"

const router = createBrowserRouter([
    { 
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootloader,
        action: createBookAction,
        children: [
            { index: true, element: <ChooseMenu /> },
            {
                errorElement: <ErrorPage />, 
                children:[
                    { path: "books/:id", element: <Book />, loader: bookLoader }
                ]
            },
            {
                path: "books/:id/delete",
                action: deleteAction
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)