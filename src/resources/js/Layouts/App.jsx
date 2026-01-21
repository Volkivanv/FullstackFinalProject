import Header from "@/Pages/components/Header";


export default function App({ children, auth }) {
    return (
        <div>
            <Header auth={auth} />
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}
