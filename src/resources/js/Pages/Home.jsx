import "../../css/app.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Children } from 'react';


export default function Home(props) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <div className="hidden md:flex md:w-64 md:flex-col">
                <Sidebar userName={props.data.user.name} />
            </div>
            <div className="flex-1 md:ml-64">
                <Header />
                <main className="p-6">
                    {/* {children} */}
                    <Content data={props.data} />
                </main>
                <Footer />
            </div>



        </div>

    );

};

