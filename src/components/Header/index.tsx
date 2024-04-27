import { useState } from 'react';
import './header.css';
import { motion } from "framer-motion"

export default function Header() {

    const [boxCar, setBoxCar] = useState(false);

    const variantsTrue = {

        visible: { width: "100vw", height: "100vh", background: "#0f52ba",},
        hidden: { width: "0" }
    };


    function AnimateMenu(): boolean {
        if (boxCar === false) {
            setBoxCar(true);

            return true

        } else {
            setBoxCar(false);
            return false
        }
    }



    return (
        <nav>
            <ul>
                <li className='logo'><h1>MKS</h1><strong>sistemas</strong></li>

                {boxCar === true ?
                    <motion.li className='car'
                        initial="hidden"
                        animate="visible"
                        variants={variantsTrue}
                    >
                        <button onClick={AnimateMenu}>

                            <img src={require('../../imgs/Carrinho.png')} />
                            <p>0</p>

                        </button>

                    </motion.li>
                    :
                    <li className='car'>

                    <button onClick={AnimateMenu}>

                        <img src={require('../../imgs/Carrinho.png')} />
                        <p>0</p>

                    </button>
                    </li>
                }

                 
                
            </ul>

        </nav>


    )

}