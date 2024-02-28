import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemListContainer from "../components/ItemListContainer";
import FirebaseData from "../components/FirebaseData";

function Home() {
    return (
        <>
            <ItemListContainer />
            <FirebaseData />
        </>
    )
}

export default Home;