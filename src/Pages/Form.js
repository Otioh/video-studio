import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSlidesStore from "../store/useSlidesStore";
import "./form.css";
import axios from "axios";
import { Spin, notification } from "antd";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGears} from '@fortawesome/free-solid-svg-icons';

function Form() {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [color, setcolor] = useState("black");
  const [spinning, setspinning] = useState(false);
  const [spintext, setspintext] = useState("Please Wait");
  const [description, setdescription] = useState("");
  const [logRe, setlogRe] = useState(false);

  const updateAIResponse = useSlidesStore((state) => state.updateAIResponse);
  const processForm = () => {
setspinning(true)
    axios.post('https://app.googptai.com/api/vsl', {description:'some text', title:'Title Text'}).then((res)=>{
      setspintext("Please wait while we gather resources")
     
      if(!res.data.error){
let newArr=res.data.scenes.map((scene)=>{
  return { ...scene, urlVideo:'http://localhost:3000/static/media/eating-healthy.ab23f3c14fd222ad2c36.mp4'}
})
   
       

        notification.success({ message: res.data.message })
        updateAIResponse({ ...res.data, scenes: newArr })
        // updateAIResponse(res.data)
        navigate('/editor')
       
        setspinning(false)
      }else{
        notification.error({ message: res.data.message })
     
      }
   

    })   

  }
  return (
    <div
      className="card-container"
      style={{
        height: "100vh",
      }}
    >
      <video controls src={require('../assets/vid/eating-healthy.mp4')}>

      </video>
      <div className="form-group">
        {logRe && (
          <a href="https://app.googptai.com/login" className="button">
            Login First
          </a>
        )}
        <Spin spinning={spinning} size="large" tip={spintext}></Spin>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <input
            placeholder="Video Title"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <textarea
            placeholder="Video Description"
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          ></textarea>

          <button className="button" type="submit" onClick={processForm}>
         <FontAwesomeIcon icon={faGears}></FontAwesomeIcon>   Build
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
