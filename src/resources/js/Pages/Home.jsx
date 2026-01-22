import "../../css/app.css";
import Content from "./Сomponents/Content";
import Footer from "./Сomponents/Footer";
import Header from "./Сomponents/Header";
import Sidebar from "./Сomponents/Sidebar";
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

