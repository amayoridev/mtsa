const frequencySlider = document.getElementById('frequencySlider');
const frequencyInput = document.getElementById('frequencyInput');
const frequencyValue = document.getElementById('frequencyValue');
const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');

let audioContext = null;
let oscillator = null;

const updateFrequencyDisplay = value => {
  const formatted = Number(value).toFixed(1);
  frequencyValue.textContent = formatted;
  frequencyInput.value = formatted;
  frequencySlider.value = formatted;
};

const getFrequency = () => {
  const freq = parseFloat(frequencyInput.value);
  if (Number.isNaN(freq)) return 440;
  return Math.min(20000, Math.max(0.1, freq));
};

frequencySlider.addEventListener('input', event => {
  updateFrequencyDisplay(event.target.value);
});

frequencyInput.addEventListener('change', () => {
  const freq = getFrequency();
  updateFrequencyDisplay(freq);
});

const startTone = () => {
  if (oscillator) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = getFrequency();
  oscillator.connect(audioContext.destination);
  oscillator.start();
  playButton.disabled = true;
  stopButton.disabled = false;
};

const stopTone = () => {
  if (!oscillator) return;
  oscillator.stop();
  oscillator.disconnect();
  oscillator = null;
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  playButton.disabled = false;
  stopButton.disabled = true;
};

playButton.addEventListener('click', () => {
  startTone();
});

stopButton.addEventListener('click', () => {
  stopTone();
});

frequencySlider.addEventListener('input', () => {
  if (oscillator) {
    oscillator.frequency.value = getFrequency();
  }
});

frequencyInput.addEventListener('change', () => {
  if (oscillator) {
    oscillator.frequency.value = getFrequency();
  }
});

updateFrequencyDisplay(frequencySlider.value);
