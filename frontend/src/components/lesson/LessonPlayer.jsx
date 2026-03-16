import "./LessonPlayer.css";
import { FaPlayCircle } from "react-icons/fa";

function LessonPlayer({ lesson }) {

  if (!lesson) {
    return (
      <div className="lesson-player-empty">
        <FaPlayCircle className="empty-icon" />
        <p>Select a lesson to start learning</p>
      </div>
    );
  }

  const getYouTubeEmbedURL = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v"); // extract v param
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const embedURL = getYouTubeEmbedURL(lesson.videoUrl);


  return (
    <div className="lesson-player">

      <div className="lesson-header">
        <h2>{lesson.title}</h2>
      </div>

      {lesson.videoUrl && (
        <div className="video-container">

<iframe width="560" height="315" 
    src={embedURL}
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
</iframe>
        </div>
      )}

      {lesson.content && (
        <div className="lesson-content">
          <p>{lesson.content}</p>
        </div>
      )}

    </div>
  );
}

export default LessonPlayer;