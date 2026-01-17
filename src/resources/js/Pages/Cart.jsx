import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Cart(props) {

    return (
        <>
            <Header/>
            <Sidebar userName={props.name || "Гость"} />
            <h1>Cart</h1>
            <Footer />
        </>
    )
};

