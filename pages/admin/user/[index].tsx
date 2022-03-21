import { useRouter } from "next/router"
import Link from "next/link";

export default function AdminUser() {
    const router = useRouter();

    console.log("Route", router);

    const handleClick = () =>{
        router.push("/login");
    }

    return (
        <div>
            <h1>Admin -&gt; User Page {router.query.index}</h1>
            <Link href="/login"><a className="active">Go to Home Page</a></Link>
            <button onClick={handleClick}>Go to Login Page</button>
        </div>
    )
}