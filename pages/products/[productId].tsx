import { memo } from "react";
import { getProducts } from "@/utils";

interface IProductDetailPageProps {
    product: IProduct;
}

export interface IProduct {
    id: string;
    productName: string;
    price: number;
}

export default function ProductDetailPage(props: IProductDetailPageProps) {

    if (!props.product) {
        return <h2>Loading</h2> //!This is a very important part. This is showing the asynchronous behavior of the collecting page data. Be very careful with this 
    }

    const { price, productName } = props?.product;
    return <div>
        <h1>Product Detail Page</h1>
        <p>{productName}</p>
        <p>Rs {price}</p>
    </div>
}

export const getStaticProps = async (context: any) => {
    const { productId } = context.params;
    const products = await getProducts();
    const product = products.find(({ id }) => id === productId);

    return product ? {
        props: {
            product
        }
    } : {
        notFound: true //This is important if you are not getting the product like if the requested param is not in the dynamically generated paths
    }

}

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map((product: any) => ({ params: { productId: product.id } })),//Here we are explicitly telling next which all pages should be pre rendered
        fallback: false
    }
}
