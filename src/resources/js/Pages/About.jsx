import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function About(props) {

    return (
        <>
            <Header />
            <Sidebar />
            <Content />
            <h1 className="title text-gray-700 dark:text-gray-400">About</h1>
        </>
    )
};

