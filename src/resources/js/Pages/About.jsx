import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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

