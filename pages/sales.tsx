//This example or pattern is very important which showcases use of swr
import { memo, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

interface ISalesRecord {
    id: string;
    userName: string;
    volume: number;
}

interface ISalesPageProps {
    sales: ISalesRecord[];
}

type Sales = Record<string, Omit<ISalesRecord, 'id'>>

const getTransFormedSales = (data: Sales): ISalesRecord[] => {
    const result = [];
    for (const key in data) {
        result.push({
            id: key,
            userName: data[key].userName,
            volume: data[key].volume
        })
    }
    return result;
}

const getSalesData = async (): Promise<Sales> => {
    const response = await fetch('https://nextjs-course-ab106-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json();
    return data;
}

const SalesPage = (props: ISalesPageProps) => {
    const [sales, setSales] = useState<ISalesRecord[]>(props?.sales);

    const { data, error, isLoading } = useSWR('https://nextjs-course-ab106-default-rtdb.firebaseio.com/sales.json')

    useEffect(() => {
        if (data) {
            const fetchData = async () => {
                setSales(getTransFormedSales(data));
            };
            fetchData();
        }
    }, [data])

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    if (!sales || error) {
        return <h1>No records</h1>
    }

    return sales?.map((sale) => {
        return (
            <div key={sale.id}>
                <h1>{sale.userName}</h1>
                <h1>{sale.volume}</h1>
            </div>
        )
    })

}

export default memo(SalesPage);

export const getStaticProps = async () => {
    console.log('Server Side Code');
    const sales = getTransFormedSales(await getSalesData());
    return {
        props: {
            sales
        },
    }
}