import Link from "next/link";
import { memo } from "react";

interface IUsers {
    id: string;
    username: string;
}
interface IUserProfileProps {
    users: IUsers[];
}
const Users = (props: IUserProfileProps) => {
    if (!props.users) {
        return <h2>Loading...</h2>
    }
    return (
        <ul>
            {props.users.map((user) => (
                <li key={user.id}>
                    <Link href={`/users/${user.id}`}>{user.username}</Link>
                </li>
            ))}
        </ul>
    )
}

export const getServerSideProps = async (context: any) => {
    //! Here unlike the getStaticProps the getServerSideProps have access to the entire request object
    const { req, res } = context;
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return {
        props: {
            users
        }
    }
}

export default memo(Users);