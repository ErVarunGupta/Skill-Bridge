function CommentSection() {
  return (
    <div className="comments">
      <h4>Comments</h4>
      <input type="text" placeholder="Write a comment..." />
      <button className="btn">Post</button>
      <ul>
        <li>👍 Great notes!</li>
        <li>✨ Helpful for exams</li>
      </ul>
    </div>
  );
}

export default CommentSection;
