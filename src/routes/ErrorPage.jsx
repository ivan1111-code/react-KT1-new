import { useRouteError } from "react-router"

export const ErrorPage = () => {
    const err = useRouteError()
    return (
        <div>
            <h3>Ой!</h3>
            <p>{!err.statusText ? err.message : err.statusText}</p>
        </div>
    )
}