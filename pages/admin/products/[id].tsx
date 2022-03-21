import { useRouter } from "next/router"
import Link from "next/link";

export default function AdminProducts() {
    const router = useRouter();

    console.log("Route", router);

    const handleClick = () => {
        router.push("/login");
    }

    return (
        <div>
            <h1>Admin -&gt; Product Page {router.query.id}</h1>
            <div>
                <Link href={{
                    pathname: '/admin/user/[index]',
                    query: { index: 21 }
                }}><a className="active">Go to User Page 21</a></Link>
                <br/>
                <Link href={`/admin/user/${encodeURIComponent('Bao Nho % 3#')}`}><a className="active">Go to User Page Bao Nho</a></Link>
            </div>

            <button onClick={handleClick}>Go to Login Page</button>
        </div>
    )
}