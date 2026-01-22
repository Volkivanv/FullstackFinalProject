import Footer from "./Сomponents/Footer";
import Header from "./Сomponents/Header";
import Sidebar from "./Сomponents/Sidebar";

export default function About(props) {

    return (
        <>
            <Header />
            <Sidebar userName={props.name || "Гость"} />
            <h1 className="title">About</h1>
            <Footer />
        </>
    )
};

