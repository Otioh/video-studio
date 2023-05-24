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
    text: "Some AI Genegerated Content Here...",
    urlVideo:
      "https://player.vimeo.com/external/189545487.sd.mp4?s=8cd2af1ec08f7ce121a5a6a09c78c05237943524&profile_id=164&oauth2_token_id=57447761",
    urlAudio:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3",
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
