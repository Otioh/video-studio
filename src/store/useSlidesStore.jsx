import { create } from 'zustand';
import { DEFAULT_SLIDE_OBJECT } from '../utils/constants';

const useSlidesStore = create((set) => ({
  slides: [DEFAULT_SLIDE_OBJECT],
  currentSlide: DEFAULT_SLIDE_OBJECT,
  localMedia: [],
  play: false,
  currentSlideIndex: 0,
  totalDuration: 15,
  audio: null,
  isRecording: false,
  AIResponse: {
    error: true,
    scenes: [
      {
        text: "First Scene is here",
        urlVideo:
          "http://localhost:3000/static/media/eating-healthy.ab23f3c14fd222ad2c36.mp4",
      },
      {
        text: "Second Scene is here",
        urlVideo:
          "http://localhost:3000/static/media/eating-healthy.ab23f3c14fd222ad2c36.mp4",
      },
      {
        text: "Third Scene is here",
        urlVideo:
          "http://localhost:3000/static/media/eating-healthy.ab23f3c14fd222ad2c36.mp4",
      },
    ],
  },
  addNewSlide: () =>
    set((state) => ({
      slides: [...state.slides, DEFAULT_SLIDE_OBJECT],
      currentSlideIndex: state.slides.length,
      currentSlide: DEFAULT_SLIDE_OBJECT,
    })),

  updateSlides: (slides) => set((state) => ({ slides: slides })),
  updateLocalMedia: (localMedia) =>
    set((state) => ({ localMedia: localMedia })),

  updateCurrentSlide: (currentSlide) => set((state) => ({ currentSlide })),
  updateCurrentSlideIndex: (index) =>
    set((state) => ({ currentSlideIndex: index })),
  updatePlay: (isPlay) => set((state) => ({ play: isPlay })),
  updateTotalDuration: (duration) =>
    set((state) => ({ totalDuration: duration })),
  updateAIResponse: (restate) => set((state) => ({ AIResponse: restate })),
  resetSlides: (slides) => set(() => ({ slides: [DEFAULT_SLIDE_OBJECT] })),
  resetCurrentSlide: () =>
    set((state) => ({ currentSlide: DEFAULT_SLIDE_OBJECT })),
  updateAudio: (audio) => set(() => ({ audio: audio })),
  updateIsRecording: (isRecording) => set(() => ({ isRecording: isRecording })),
  resetSlideStore: () =>
    set(() => ({
      slides: [DEFAULT_SLIDE_OBJECT],
      currentSlide: DEFAULT_SLIDE_OBJECT,
      play: false,
      currentSlideIndex: 0,
      totalDuration: 5,
      audio: null,
      isRecording: false,
    })),
}));
export default useSlidesStore;
