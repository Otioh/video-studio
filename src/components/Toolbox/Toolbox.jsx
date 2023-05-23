import "./Toolbox.scss";
import MediaToolbox from "./MediaToolbox";
import TextToolbox from "./TextToolbox";
import GraphicToolbox from "./GraphicToolbox";
import UploadToolbox from "./UploadToolbox";
import MusicToolbox from "./MusicToolbox";

function Toolbox({ activeItem: toolbox, setspinn }) {
  return (
    <div className="toolbox">
      {toolbox === "text" && <TextToolbox setspinn={setspinn} />}
      {toolbox === "media" && <MediaToolbox setspinn={setspinn} />}
      {toolbox === "graphics" && <GraphicToolbox setspinn={setspinn} />}
      {toolbox === "upload" && <UploadToolbox />}
      {toolbox === "music" && <MusicToolbox />}
    </div>
  );
}

export default Toolbox;
