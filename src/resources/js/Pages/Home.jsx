import "../../css/app.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Children } from 'react';


export default function Home(props) {
    return (
        <>



            <Header />
            <Sidebar userName={props.data.user.name || "Гость"} />
            <Content data={props.data}/>
            <Footer />

        </>

    );

};

