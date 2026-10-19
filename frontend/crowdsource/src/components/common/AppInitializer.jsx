import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/authApi";
import useAuthStore from "../../store/authStore";

function AppInitializer({ children }) {

    const setUser = useAuthStore(
        (state) => state.setUser
    );
    const clearUser = useAuthStore((state) => state.clearUser);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function initialize() {

            try {

                const response =
                    await getCurrentUser();

                setUser(response.data);

            }
            catch {
                clearUser();
            }
            finally {

                setLoading(false);

            }

        }

        initialize();

    }, [clearUser, setUser]);

    if (loading)
        return <h1>Loading...</h1>;

    return children;

}

export default AppInitializer;