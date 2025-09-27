import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
// import '../styles.css'

function MaterialDetail() {
  const { id } = useParams();

  return (
    <div className="container">
      <h3>Material Detail - {id}</h3>
      <p>📄 Preview of material {id} here...</p>
      <h4>AI Summary</h4>
      <p>➡️ This note covers key topics with simplified points.</p>
      <CommentSection />
    </div>
  );
}

export default MaterialDetail;
