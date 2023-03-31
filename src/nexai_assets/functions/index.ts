import { useContext, useState } from "react";
// import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";


// not useful, cll this function inside any page it is needed
export const useLogIn = () => {
    const { actor, setLoggedIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    try {
        const handleLogIn = (): void => {
            setLoading(true);
            actor.logIn().then((data: boolean) => {
                setLoading(false);
                setLoggedIn(data)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })

        }
        return { handleLogIn, loading }
    } catch (err) {
        setLoading(false)
        console.log(err);

    }
}