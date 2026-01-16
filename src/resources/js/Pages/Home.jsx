import "../../css/app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
export default function Home(props) {
    return (
        <>



            <Header />
            <Sidebar userName={props.name || "Гость"} />
            <h1 className="title text-gray-700 dark:text-gray-400">Hello {props.name}</h1>
            <Footer />

        </>

    );

};

