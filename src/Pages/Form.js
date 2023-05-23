import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSlidesStore from "../store/useSlidesStore";
import "./form.css";

function Form() {
  let navigate = useNavigate();
  const [text, setText]=useState('')
  const [color, setcolor] = useState('black')

  const updateAIResponse = useSlidesStore((state) => state.updateAIResponse);
  const processForm = () => {
    updateAIResponse({
        text,
      status: true,
      urlVideo:
        "https://player.vimeo.com/external/189545487.sd.mp4?s=8cd2af1ec08f7ce121a5a6a09c78c05237943524&profile_id=164&oauth2_token_id=57447761",
      urlAudio:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3",
    });
    navigate("/editor");
  };
  return (
    <div
      className="card-container"
      style={{
        height: "100vh",
      }}
    >
      <div className="form-group">
        <form
          onSubmit={processForm}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <input placeholder="Video Title" onChange={(e)=>{
            setText(e.target.value)
          }} />
          <textarea placeholder="Video Description"></textarea>
                Choose Color   <input  type='color' onChange={(e) => {
                      setcolor(e.target.value)
                  }} />
          <button className="button" type="submit">
            Build
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
