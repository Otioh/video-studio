import "./Sidebar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faVideo, faUpload, faFileText, faMusic} from '@fortawesome/free-solid-svg-icons';

function Sidebar({ activeItem, setActiveItem }) {
  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        <li
          className={
            activeItem === "upload"
              ? "sidebar__list__item active upload_nav"
              : "sidebar__list__item upload_nav"
          }
          onClick={() => setActiveItem("upload")}
        >
          <FontAwesomeIcon icon={faUpload} style={{ fontSize: "xx-large" }} />
          <span>Upload</span>
        </li>
        <li
          className={
            activeItem === "media"
              ? "sidebar__list__item active media_nav"
              : "sidebar__list__item media_nav"
          }
          onClick={() => setActiveItem("media")}
        >
          <FontAwesomeIcon icon={faImage} style={{ fontSize: "xx-large" }} />
          <span>Images</span>
        </li>
        <li
          className={
            activeItem === "text"
              ? "sidebar__list__item active text_nav"
              : "sidebar__list__item text_nav"
          }
          onClick={() => setActiveItem("text")}
        >
          <FontAwesomeIcon icon={faFileText} style={{ fontSize: "xx-large" }} />
          <span>Text</span>
        </li>

        {/* @TODO : Commenting the Graphics navbar since its not used currently  */}

        <li
          className={
            activeItem === "graphics"
              ? "sidebar__list__item active"
              : "sidebar__list__item"
          }
          onClick={() => setActiveItem("graphics")}
        >
          <FontAwesomeIcon icon={faVideo} style={{ fontSize: "xx-large" }} />
          <span>Videos</span>
        </li>

        <li
          className={
            activeItem === "music"
              ? "sidebar__list__item active music_nav"
              : "sidebar__list__item music_nav"
          }
          onClick={() => setActiveItem("music")}
        >
          <FontAwesomeIcon icon={faMusic} style={{ fontSize: "xx-large" }} />
          <span>Music</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
