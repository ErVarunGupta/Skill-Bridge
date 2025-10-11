import Footer from "../../../layouts/Footer";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
// import '../styles.css'

function UploadMaterial() {
  return (
    <>
    <Navbar />
    <div className="container">
      <UploadForm />
    </div>
    <Footer/>
    </>
  );
}

export default UploadMaterial;
