---
title: Probabilistic age estimation from a single face
kind: deep learning
period: feb → mar 2026
order: 5
summary: |
  On APPA-REAL, each face is rated by about 38 people, whose estimates of apparent age differ
  by around 4.5 years. Starting from a pretrained SE-ResNeXt50, we compared several ways of
  training with this ambiguity: DEX classification with hard or Gaussian-smoothed targets,
  mean-variance and CORAL losses, and a Residual DEX head that corrects apparent age towards
  real age. I designed the uncertainty quantification on the DEX head, with MC-Dropout and a
  heteroscedastic loss. On the test set, the median error is
  <strong class="hl">4.5 years</strong> from the raters' consensus.
figure:
  src: /assets/img/projects/age-test-set.webp
  width: 1389
  height: 457
  alt: "Left, a scatter of predicted against annotated apparent age on the test set, close to the diagonal up to about 60 years and flat above. Right, a histogram of absolute errors with a mean of 6.55 years and a median of 4.45 years."
  caption: "Test set: predicted against annotated apparent age, and the absolute errors (mean 6.55, median 4.45 years). Predictions flatten out above 60, where training faces are rare."
kv:
  team: group project
  data: APPA-REAL, 7,591 faces
  stack: pytorch · pretrainedmodels · albumentations · opencv
code: https://github.com/Lduvignacq/Age-estimation-with-deep-learning
---

As a preliminary check of the backbone, frozen ImageNet features, L2-normalized and
clustered with k-means, separate 13,233 faces (LFW) from 13,233 CIFAR-10 objects with 3
errors out of 26,466 images.

Replacing the one-hot target with a Gaussian centred on the annotated age (σ = 2 years)
reduces the test error on apparent age from 7.5 to 6.5 years. Residual DEX gives the lowest
error on real age (8.5 years), and test-time augmentation reduces it by a further 0.15 year.
