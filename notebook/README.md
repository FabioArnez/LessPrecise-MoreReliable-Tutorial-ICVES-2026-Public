# Hands-on notebook

`Quantization_Corruption_Robustness_Tutorial.ipynb` is the hands-on half of the tutorial, about 1.5 hours. Notebook by Aymen Bouguerra, adapted by Fabio Arnez.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/FabioArnez/LessPrecise-MoreReliable-Tutorial-ICVES-2026-Public/blob/main/notebook/Quantization_Corruption_Robustness_Tutorial.ipynb)

| Part | Content | Runs on |
|---|---|---|
| 0 | Setup and the six talk clips | CPU |
| 1 | What quantization does to a 1-D model, one step at a time (FP32, naive 3-bit, PTQ, QAT) | CPU |
| 2 | The same rounding noise on a strong and a weak feature, with sliders for amplitude and bit width | CPU |
| 3 | A spectrum of features against one flat noise floor, then FP32, PTQ and QAT under test-time noise | CPU |
| 4 | Images, a general cue against a specialized cue under quantization, blur and pixel noise | CPU |
| 5 | DINOv2 ViT-S/14 on DAWN road-object crops, W8A8 PTQ and QAT under Gaussian blur | GPU |

Parts 1 to 4 run on a laptop CPU in seconds. Part 5 takes about 10 to 12 minutes on a Colab T4 GPU. It also runs on Apple's GPU (MPS); on a CPU it takes hours. QAT training on a GPU is not bit-reproducible, so the Part 5 numbers move by a few points from run to run. The notebook text says how much.

## Running it

In Google Colab, open the badge above, choose *Runtime, Change runtime type, T4 GPU*, and run the cells in order. Nothing needs installing.

Locally, with Python 3.12 or 3.13:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
jupyter lab Quantization_Corruption_Robustness_Tutorial.ipynb
```

`requirements.txt` pins the versions of Colab's GPU runtime.

## Data, models and clips

- Part 5 downloads the DAWN images (Kenk & Hassaballah, 2020) from the Hugging Face copy [`Maxim37/dawn-dataset`](https://huggingface.co/datasets/Maxim37/dawn-dataset), licensed CC BY-NC 3.0 (non-commercial use only), and the DINOv2 weights (Oquab et al., 2024) from [`timm/vit_small_patch14_dinov2.lvd142m`](https://huggingface.co/timm/vit_small_patch14_dinov2.lvd142m), licensed Apache 2.0.
- Part 0 downloads the six talk clips of Parts 1 to 3 (`media.zip`, 16 MB) from a Google Drive link. If the download fails, the notebook prints a note and continues without them. Locally, clips placed in `media/` next to the notebook are used first.

## License

The code of the notebook is released under the [MIT License](../LICENSE), copyright 2026 Aymen Bouguerra and Fabio Arnez.
