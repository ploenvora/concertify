import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

function SideBar() {
    const  { data: session, status } = useSession();
    // console.log(session)
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem('concerts')
        signOut()
        router.push('/login');
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default SideBar;