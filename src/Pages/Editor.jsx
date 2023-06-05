import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";
import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";
import Toolbox from "../components/Toolbox/Toolbox";
import Viewport from "../components/Viewport/Viewport";
import "../styles/Editor.scss";
import { INTRO_STEPS } from "../utils/constants";
import { Spin } from "antd";

function Editor({ previd, setprevid }) {
  const [activeItem, setActiveItem] = useState("text");
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [viewing, setviewing] = useState(false);
  


const [spinn, setspinn] = useState(false);
  const onExit = () => {
    setStepsEnabled(false);
  };



  const handleGetStarted = () => {
    setStepsEnabled(true);
  };

  return (
    <>
      <Header
        handleGetStarted={handleGetStarted}
        previd={previd}
        setprevid={setprevid}
        viewing={viewing}
        setviewing={setviewing}
      />

      <div className="editor">
        <Steps
          enabled={stepsEnabled}
          steps={INTRO_STEPS}
          initialStep={0}
          onExit={onExit}
        />
        <Spin spinning={spinn} tip="Downloading Files to Canvas, please wait patiently" size="large">
          <div className="content" />
        </Spin>
        {/* <Hints
          enabled={true}
          hints={[]}
          // hints={hints}
        /> */}
        <div className="editor__top">
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

          <div className="viewport-wrapper">
            <Viewport
              previd={previd}
              setprevid={setprevid}
              viewing={viewing}
              setviewing={setviewing}
              setspinn={setspinn}
            />
            <Toolbox activeItem={activeItem} setspinn={setspinn} />
          </div>
        </div>
        <div className="editor__bottom">
          <Timeline />
        </div>
      </div>
    </>
  );
}

export default Editor;