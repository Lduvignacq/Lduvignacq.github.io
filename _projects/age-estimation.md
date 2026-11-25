---
title: Probabilistic age estimation from a single face
kind: deep learning
period: feb → mar 2026
order: 5
summary: |
  Apparent age is an opinion: on APPA-REAL each face is rated by about 38 people, and they
  disagree by some 4.5 years. On a pretrained SE-ResNeXt50 we compared ways to train with
  that ambiguity: DEX classification with hard or Gaussian-smoothed targets, mean-variance
  and CORAL losses, and a Residual DEX head that corrects apparent age towards real age. I
  designed the uncertainty quantification on the DEX head, with MC-Dropout and a
  heteroscedastic loss. On the test set, half of the predictions land within
  <strong class="hl">4.5 years</strong> of the raters' consensus.
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

Before any training, a check on the backbone: frozen ImageNet features, L2-normalised
and clustered by k-means, separate 13,233 faces (LFW) from 13,233 CIFAR-10 objects with
3 errors in 26,466 images.

Soft targets matter. Replacing the one-hot target with a Gaussian around the annotated
age (σ = 2 years) brings the test error on apparent age from 7.5 down to 6.5 years.
Residual DEX gives the best error on real age (8.5 years), and test-time augmentation
saves another 0.15 year.
