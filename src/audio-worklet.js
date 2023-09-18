class AudioRecorderWorklet extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    // Salin input ke output (tidak ada pemrosesan audio)
    for (let channel = 0; channel < input.length; channel++) {
      output[channel].set(input[channel]);
    }

    return true;
  }
}

registerProcessor('audio-recorder-worklet', AudioRecorderWorklet);
