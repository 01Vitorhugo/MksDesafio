import './api.css'
import { useQuery } from "react-query";


export default function Api() {


    const { data, isLoading, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: () =>
            fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC')
                .then((res) => res.json()


                ),

    })
    if (isLoading) {
        return <div>Carregando...</div>;
    }
    if (isError) {
        return <div>Ocorreu um erro ao carregar os dados.</div>;
    }

    if (!data) {
        return <div>Dados não encontrados.</div>;
    }

    type ArrayObject = {
        id: number,
        name: string,
        brand: string,
        description: string,
        photo: string,
        price: string

    } 

    function BuyItem(item: ArrayObject){

        const ItemJson = JSON.stringify(item);

        localStorage.setItem("compraItem", ItemJson);



    }

    return (
        <div className='boxObeject'>

            {
                data.products.map((item: ArrayObject) => (
                
                    <div key={item.id} className="object">
                        <figure>
                            <img src={item.photo} />
                        </figure>

                        <article>
                        <h1>{item.name}</h1>
                        <p><strong> R${item.price.slice(0, -3)}</strong></p>
                        </article>

                        <article>
                            <p>{item.description}</p>
                        </article>

                        <button onClick={() => {BuyItem(item)} }>
                           <img src={require('../../imgs/shopping-bag.png')}/> <p>COMPRAR</p>
                        </button>
                        
                        

                    </div>
                ))
            }
        </div>


    )
}

