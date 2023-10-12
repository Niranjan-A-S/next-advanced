import { memo } from "react"

const UserIdPage = (props: any) => {
    return (
        <h1>UserId- {props.userId}</h1>
    )
}

export default memo(UserIdPage);

export const getServerSideProps = async (context: any) => {
    console.log('Server Side Code');
    const { uid: userId } = context.params;
    return {
        props: {
            userId
        }
    }
}

//!Here there is no need for getStaticPaths as we don't need to define the dynamic paths or there is no prerendering page