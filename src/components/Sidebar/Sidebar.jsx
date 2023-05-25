import "./Sidebar.scss";
import upload from "../../assets/img/upload.svg";
import video from "../../assets/img/video.svg";
import music from "../../assets/img/music.svg";
import text from "../../assets/img/text.svg";
import image from "../../assets/img/image.svg";

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
          <img
            src={upload}
            alt="upload"
            srcset=""
            width="40"
            height="40"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
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
          <img
            src={image}
            alt="image"
            srcset=""
            width="40"
            height="40"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
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
          <img
            src={text}
            alt="text"
            srcset=""
            width="40"
            height="40"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
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
          <img
            src={video}
            alt="video"
            srcset=""
            width="40"
            height="40"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
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
          <img
            src={music}
            alt="music"
            srcset=""
            width="40"
            height="40"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
          <span>Music</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
