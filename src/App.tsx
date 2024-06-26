import './App.css';
import Api from "./components/Api/api";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Header/>
      <Api/>

    
      <Footer/>
    </div>
  );
}

export default App;
