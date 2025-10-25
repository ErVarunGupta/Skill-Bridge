import Footer from "../../../layouts/Footer";
import Navbar from "../components/Navbar";
import UploadPage from "./UploadPage";
// import '../styles.css'

function UploadMaterial() {
  return (
    <>
    <Navbar />
    <div className="container">
      <UploadPage />
    </div>
    <Footer/>
    </>
  );
}

export default UploadMaterial;
