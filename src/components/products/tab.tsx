
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { products } from '@/data/products';
import { Product } from "@/types/Product";
import { ProductEmpty } from "./empty";
import { ProductItem } from "./Item";
import { getAllProducts } from "@/services/product";

type Tab = {
    title: string;
    value: string;
    products: Product[];
}

export const ProductsTab = async () => {
    const products = await getAllProducts();
    
    const tabs = [
        {
            title: 'Sushi',
            value: 'sushi',
            products: products.filter(item => item.category === 'sushi')
        },
        {
            title: 'Temaki',
            value: 'temaki',
            products: products.filter(item => item.category === 'temaki')
        },
        {
            title: 'Combinado',
            value: 'pack',
            products: products.filter(item => item.category === 'pack')
        },
        {
            title: 'Bebidas',
            value: 'beverage',
            products: products.filter(item => item.category === 'beverage')
        }
    ];

    return (
        <Tabs defaultValue="sushi">
            <TabsList className="flex border-b border-gray-300">
                {tabs.map(item => (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        className="flex-1 text-center px-4 py-2 font-medium text-gray-600 rounded-t-md bg-gray-50 border-b-2 border-transparent hover:bg-gray-200 hover:text-gray-800 transition-all focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 data-[state=active]:bg-gray-300 data-[state=active]:text-gray-900 data-[state=active]:border-gray-500"
                    >
                        {item.title}
                    </TabsTrigger>
                ))}
            </TabsList>
           {tabs.map(item => (
            <TabsContent key={item.value} value={item.value} className="mt-6">
                {item.products.length > 0 && 
                    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {item.products.map(product => ( 
                            <ProductItem key={product.id} item={product}/>
                        ))}
                    </div>
                
                }
                {item.products.length === 0 && <ProductEmpty/>}
            </TabsContent>
           ))}
        </Tabs>
    );
}
