import Footer from "./Сomponents/Footer";
import Header from "./Сomponents/Header";
import Sidebar from "./Сomponents/Sidebar";

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

