import { getProducts } from "@/utils";
import { GetStaticPaths } from "next";
import { memo } from "react";

interface IProductDetailPageProps {
    product: IProduct;
}

export interface IProduct {
    id: string;
    productName: string;
    price: number;
}

function ProductDetailPage(props: IProductDetailPageProps) {
    const { product: { price, productName } } = props;
    return <div>
        <h1>Product Detail Page</h1>
        <p>{productName}</p>
        <p>Rs {price}</p>
    </div>

}

export async function getStaticProps(context: any) {
    const { productId } = context.params;
    const products = await getProducts();
    const product = products.find(({ id }) => id === productId);

    return {
        props: {
            product
        }
    }
}

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map((product: any) => ({ params: { productId: product.id } })),//Here we are explicitly telling next which all pages should be pre rendered
        fallback: true
    }
}

export default memo(ProductDetailPage); 