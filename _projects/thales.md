---
title: "Acoustic scene classification: from research to a working tool"
kind: deep learning engineering internship
tag: main project
period: "2026"
order: 1
home: true
main: true
summary: |
  I trained a model that recognizes the type of place a recording was made in (bus, metro,
  park, restaurant…). Fine-tuned on a public benchmark, then on field recordings made with
  four everyday devices, it identifies the exact place <strong class="hl">94.5%</strong> of
  the time and the broad type of place (indoor, outdoor, transport)
  <strong class="hl-2">97.3%</strong> of the time. Its prediction then routes each recording
  to the matching noise-removal model.
kv:
  where: Thales Innovations Asia, Singapore
  stack: python · pytorch · passt · weights & biases · scikit-learn · cleanlab · ffmpeg · mqtt
---

## Training on a public benchmark

I started from PaSST, a transformer pre-trained on AudioSet that reads audio as a spectrogram,
and fine-tuned it on TAU Urban Acoustic Scenes, unfreezing its layers gradually from the top
down.

<div class="pair">
{% include figure.html src="/assets/img/projects/thales-mel-spectrogram.jpeg" width="547" height="365" alt="Mel spectrogram of a 15-second recording: frequency on a logarithmic scale against time, energy in colour from dark purple to yellow." caption="Input of the model: a mel spectrogram, frequency against time." %}
{% include figure.html src="/assets/img/projects/thales-passt.jpeg" width="539" height="371" alt="Diagram of the PaSST architecture: the spectrogram is cut into patches, some patches are dropped, and the rest go through self-attention layers to an MLP classifier." caption="PaSST architecture: the spectrogram is split into patches, part of them dropped during training, and the rest processed by a transformer. Figure from the PaSST paper." %}
</div>

## Building a field dataset

The public data did not match the target setting, so I recorded 19.4 hours of audio in 9
types of place with four devices (phone, tablet, earphones and laptop), each clip stored
with its place, location, device and noise level. Clips cut from the same recording were
kept on the same side of the train/test split, so that test scores measure performance on
new recordings. Some recordings had also been filed under the wrong place: three detection
methods flagged suspicious clips, which I checked by ear, and 130 clips (about 22 minutes of
audio) were relabelled.

## Robustness

Field recordings often contain speech, which can mislead a scene classifier. I mixed speech
from audiobooks into the training clips and added a consistency loss, so that the model
gives the same prediction for a clip with and without the added speech. The gain was small
on the validation split, and clearer on a separate 3-hour field recording. Mixing clips from
different devices during training, intended to reduce the dependence on the microphone, did
not bring a clear improvement.

To check what the model relies on, I adapted an attribution method for transformers to
audio, which shows the regions of the spectrogram that drive each decision. At inference,
predictions are averaged over 5 consecutive windows and returned only above a confidence of
0.28, which stabilizes the output on long recordings. With these settings, the model reaches
94.5% accuracy on the exact place and 97.3% on the broad category.

## Deployment

The classifier runs inside a pipeline driven by an orchestrator and three MQTT queues:
preprocessing, which converts any input to the expected format, scene classification, and
denoising, where each recording goes to the model suited to its type of noise. A desktop
interface on top of it lets a user submit an audio file directly.
