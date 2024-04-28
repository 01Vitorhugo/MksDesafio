import { useEffect, useState } from 'react';
import './header.css';
import { motion } from "framer-motion"



type TypeItemBuy = {
    id: number,
    name: string,
    brand: string,
    description: string,
    photo: string,
    price: string,

    numberItem: number

}


export default function Header() {

    const [boxCar, setBoxCar] = useState(false);
    const [itemBuyConvert, setItemBuyConvert] = useState<TypeItemBuy[]>([]);
    const [totalBuyFinish, setTotalBuyFinish] = useState('')


    useEffect(() => {

        const dadosLocalStorage = localStorage.getItem("compraItem");

        if (dadosLocalStorage) {
            const dados: TypeItemBuy[] = JSON.parse(dadosLocalStorage);
            setItemBuyConvert(dados);

            var priceTotal = 0.0;
            dados.forEach(item => {
                priceTotal += parseFloat(item.price);

                if (item.numberItem !== null) {
                    item.numberItem = 1;
                }

                setTotalBuyFinish(priceTotal.toString())
            })


        }

    }, []);





    // Variantes para animacao na lista
    const variantsTrue = {
        visible: { width: "100%", height: "100vh", background: "#0f52ba" },
        hidden: { width: "100%" }
    };
    const variantsTrueLi = {
        visible: { width: "4%" },
        hidden: { width: "50%" }
    }




    function AnimateMenu(): boolean {
        if (boxCar === false) {
            setBoxCar(true);
            return true

        } else {
            setBoxCar(false);
            return false
        }
    }




    function RemoveItemCar(item: TypeItemBuy) {
        if (item.numberItem > 1) {
            item.numberItem--;

            if (totalBuyFinish) {
                var totalPrice: number = parseFloat(item.price);

                if (!isNaN(totalPrice)) {
                    var valorASubtrair: number = totalPrice;
                    var sub: number = parseFloat(totalBuyFinish) - valorASubtrair;

                    setTotalBuyFinish(sub.toString())
                }
            }
        }
    }


    function AdcItemCar(item: TypeItemBuy) {
        if (item.numberItem >= 0) {
            item.numberItem++;


            var totalPrice: number = parseFloat(item.price);


            var valorASubtrair: number = totalPrice;
            var sub: number = parseFloat(totalBuyFinish) + valorASubtrair;

            setTotalBuyFinish(sub.toString())


        }
    }

    function FinishBuy() {

    }


    function CancelItem(item: TypeItemBuy) {

        var itemStorage = localStorage.getItem('compraItem');


        if (itemStorage !== null) {

            const value: TypeItemBuy[] = JSON.parse(itemStorage) as TypeItemBuy[];

            console.log(value.length)


            for (let i = 0; i < value.length; i++) {
                if (value[i].name == item.name) {

                    value.splice(i, 1);
                    
                }
                // console.log(value[i].name == item.name)
                // console.log(value[i].name)
                // console.log(item.name)

            }
             localStorage.setItem('compraItem', JSON.stringify(value));

        }
    }


    return (
        <nav>
            <ul>
                {
                    boxCar === true ?
                        <motion.li className='logo'
                            initial="hidden"
                            animate="visible"
                            variants={variantsTrueLi}
                        >
                            <h1>MKS</h1><strong>sistemas</strong>
                        </motion.li>

                        :

                        <li className='logo'>
                            <h1>MKS</h1><strong>sistemas</strong>
                        </li>
                }

                {boxCar === true ?

                    <motion.li className='carTrue'
                        initial="hidden"
                        animate="visible"
                        variants={variantsTrue}
                    >
                        <div className='boxTitleToogle'>
                            <article>
                                <p>Carrinho</p>
                                <p> de compras</p>
                            </article>

                            <button onClick={AnimateMenu}>
                                <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="22.9609" cy="23.4307" r="22.9609" fill="black" />
                                    <path d="M34.66 34L25.42 22.12L34.132 10.856H30.7L23.748 19.92L16.796 10.856H13.276L21.988 22.12L12.836 34H16.356L23.748 24.32L31.096 34H34.66Z" fill="#0F52BA" />
                                </svg>

                            </button>


                        </div>
                        <div className='totalButton'>

                            <div className='total'>
                                <div className='totalPrice'>
                                    <p>Total:</p>
                                </div>
                                <div className='valueBuy'>
                                    <p>R${totalBuyFinish}</p>

                                </div>

                            </div>
                            <div className='buttonBuy'>
                                <button onClick={FinishBuy}>Finalizar Compra</button>
                            </div>

                        </div>




                        {itemBuyConvert.length >= 1 ?
                            itemBuyConvert.map((item: TypeItemBuy) => {
                                return (

                                    <div className='itensBuy' key={item.id}>

                                        <aside>
                                            <button onClick={() => CancelItem(item)}>
                                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.63 22.8113L12.81 11.4713L21.126 0.719309H17.85L11.214 9.37131L4.578 0.719309H1.218L9.534 11.4713L0.798 22.8113H4.158L11.214 13.5713L18.228 22.8113H21.63Z" fill="black" />
                                                </svg>
                                            </button>
                                        </aside>

                                        <figure>
                                            <img src={item.photo} alt='product' />
                                            <p>{item.name}</p>
                                        </figure>

                                        <main>

                                            <article>

                                                <div className='increment'>

                                                    <button onClick={() => RemoveItemCar(item)} > - </button>
                                                    {item.numberItem}
                                                    <button onClick={() => AdcItemCar(item)}> + </button>
                                                </div>
                                            </article>

                                            <article>
                                                <div className='priceProduct'>
                                                    <p>R${item.price.slice(0, -3)}</p>
                                                </div>

                                            </article>

                                        </main>



                                    </div>

                                )

                            })
                            :
                            <h1>Nenhum item encontrado</h1>

                        }




                    </motion.li>
                    :
                    <li className='carFalse'>

                        <button onClick={AnimateMenu}>

                            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.00971 0.0888977C0.821031 0.0888977 0.666656 0.244898 0.666656 0.435564C0.666656 0.626231 0.821031 0.782231 1.00971 0.782231H2.34763L2.63923 1.87423C2.63923 1.89156 2.63923 1.9089 2.63923 1.9089L3.737 6.05156C3.737 6.05156 3.737 6.05156 3.737 6.0689L4.09721 7.45556C4.13152 7.61156 4.26874 7.71556 4.42311 7.71556H9.912C10.1007 7.71556 10.2551 7.55956 10.2551 7.3689C10.2551 7.17823 10.1007 7.02223 9.912 7.02223H4.69756L4.50888 6.29423L10.6324 5.98223C10.7868 5.98223 10.924 5.8609 10.9583 5.7049L11.6444 1.89156C11.6616 1.78756 11.6273 1.68356 11.5758 1.61423C11.5072 1.52756 11.4043 1.47556 11.3014 1.47556H3.23957L2.94798 0.348898C2.89652 0.192898 2.7593 0.0888977 2.60492 0.0888977H1.00971ZM5.12638 2.86223C5.31506 2.86223 5.46943 3.01823 5.46943 3.2089V4.59556C5.46943 4.78623 5.31506 4.94223 5.12638 4.94223C4.9377 4.94223 4.78332 4.78623 4.78332 4.59556V3.2089C4.78332 3.01823 4.9377 2.86223 5.12638 2.86223ZM7.18471 2.86223C7.37339 2.86223 7.52777 3.01823 7.52777 3.2089V4.59556C7.52777 4.78623 7.37339 4.94223 7.18471 4.94223C6.99603 4.94223 6.84166 4.78623 6.84166 4.59556V3.2089C6.84166 3.01823 6.99603 2.86223 7.18471 2.86223ZM9.24304 2.86223C9.43173 2.86223 9.5861 3.01823 9.5861 3.2089V4.59556C9.5861 4.78623 9.43173 4.94223 9.24304 4.94223C9.05436 4.94223 8.89999 4.78623 8.89999 4.59556V3.2089C8.89999 3.01823 9.05436 2.86223 9.24304 2.86223ZM5.12638 8.4089C4.56034 8.4089 4.09721 8.8769 4.09721 9.4489C4.09721 10.0209 4.56034 10.4889 5.12638 10.4889C5.69242 10.4889 6.15555 10.0209 6.15555 9.4489C6.15555 8.8769 5.69242 8.4089 5.12638 8.4089ZM9.24304 8.4089C8.677 8.4089 8.21388 8.8769 8.21388 9.4489C8.21388 10.0209 8.677 10.4889 9.24304 10.4889C9.80909 10.4889 10.2722 10.0209 10.2722 9.4489C10.2722 8.8769 9.80909 8.4089 9.24304 8.4089Z" fill="black" />
                            </svg>
                            {itemBuyConvert.length}

                        </button>
                    </li>

                }



            </ul>

        </nav>


    )

}