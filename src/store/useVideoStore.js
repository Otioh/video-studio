import { create } from "zustand";
import { shallow } from "zustand/shallow";

const videoStore = create((set) => ({
  currentVideoURL:
    "file:///home/erim/Downloads/VID-20230325-WA0008.mp4",
  setVideoURL: (currentVideoURL) => set(() => ({ currentVideoURL })),
}));

export const useVideoStore = () => {
  const store = videoStore(
    ({ currentVideoURL, setVideoURL }) => ({
      currentVideoURL,
      setVideoURL,
    }),
    shallow
  );

  return store;
};

export default useVideoStore;
