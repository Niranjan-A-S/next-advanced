import { getProducts } from '@/utils';
import Link from 'next/link';
import { memo } from 'react';

function HomePage(props: { products: any[] }) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.productName}</Link></li>
      ))}
    </ul>
  )
}

export default memo(HomePage);

//Here we are not loading the contents through HTTP request but we are prefetching the contents using next.js

//! This function prepares the props for the components in this file.If you have this function in the file, first it will be executed and then executes the component function
//! 

export async function getStaticProps() {
  const products = await getProducts()
  return !products
    ? {
      redirect: {
        destination: '/error', // this is for redirecting to the error page
        permanent: false
      }
    }
    : products.length === 0
      ? { notFound: true } // this is to show the error page 
      : {
        props: {
          products
        },
        revalidate: 10, // this is the number of seconds after which the page will be regenerated
      }
} 