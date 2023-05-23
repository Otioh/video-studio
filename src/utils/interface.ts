//The minimum Scene to return is 1
//The Maximum Scenes to return is 20
//The response must have a background audio/sound


// Each scene must have atleast an Image, Video and Text


interface AIResponse{
status:boolean;
message?:string;
backgroundSound:string;  
scenes:Scene[];
}


interface Scene {
    text:string;
    urlVideo: string;
    urlImage:string;
    urlAudio:string;
}



const responseJSONSameple: AIResponse = {
  status: true,
  message: "Video Script Generated Successfully",
  backgroundSound: "urltoAudio.mp3",
  scenes: [
    {
      text: "Some Text from AI",
      urlVideo: "URL to Video",
      urlImage: "URL to Image",
      urlAudio: "URL to Audio",
    },
  ]
};