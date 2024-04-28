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

    function BuyItem(item: ArrayObject) {

        const ItemJson = JSON.stringify([item]);

        localStorage.setItem("compraItem", ItemJson);



    }

    return (
        <div className='boxObeject'>

            {
                data.products.map((item: ArrayObject) => (

                    <div key={item.id} className="object">
                        <figure>
                            <img src={item.photo} alt='product' />
                        </figure>

                        <article>
                            <h1>{item.name}</h1>
                            <p><strong> R${item.price.slice(0, -3)}</strong></p>
                        </article>

                        <article>
                            <p>{item.description}</p>
                        </article>

                        <button onClick={() => { BuyItem(item) }}>
                            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.737212" fill-rule="evenodd" clip-rule="evenodd" d="M3.9312 1.52983L1.62845 4.63719V15.513C1.62845 16.3711 2.31577 17.0667 3.16362 17.0667H13.9098C14.7576 17.0667 15.445 16.3711 15.445 15.513V4.63719L13.1422 1.52983H3.9312Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.737212" d="M1.62845 5.41404H15.445" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.737212" d="M11.9908 8.43509C11.9908 9.86522 10.6377 11.0246 8.96847 11.0246C7.29927 11.0246 5.94611 9.86522 5.94611 8.43509" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                            <p>COMPRAR</p>
                        </button>



                    </div>
                ))
            }
        </div>


    )
}

