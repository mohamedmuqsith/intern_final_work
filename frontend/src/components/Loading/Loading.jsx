import './Loading.css';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
