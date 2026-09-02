from __future__ import annotations

import math
import random
import struct
import wave
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "lesson-03"
SAMPLE_RATE = 22_050
DURATION = 2.4
FRAME_COUNT = int(SAMPLE_RATE * DURATION)


def clamp(value: float) -> float:
    return max(-1.0, min(1.0, value))


def write_wav(name: str, samples: list[float]) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    with wave.open(str(path), "wb") as target:
        target.setnchannels(1)
        target.setsampwidth(2)
        target.setframerate(SAMPLE_RATE)
        frames = b"".join(struct.pack("<h", int(clamp(sample) * 32767)) for sample in samples)
        target.writeframes(frames)


def birds() -> list[float]:
    samples = [0.0] * FRAME_COUNT
    starts = [0.16, 0.42, 0.92, 1.19, 1.66]
    for index, start in enumerate(starts):
        length = 0.15
        start_frame = int(start * SAMPLE_RATE)
        for offset in range(int(length * SAMPLE_RATE)):
            frame = start_frame + offset
            if frame >= FRAME_COUNT:
                break
            phase = offset / SAMPLE_RATE
            progress = offset / max(1, int(length * SAMPLE_RATE) - 1)
            frequency = 1_350 + index * 55 + 720 * progress
            envelope = math.sin(math.pi * progress) ** 2
            samples[frame] += 0.27 * envelope * math.sin(2 * math.pi * frequency * phase)
    return samples


def rain() -> list[float]:
    rng = random.Random(3035)
    samples = [0.0] * FRAME_COUNT
    smooth = 0.0
    for frame in range(FRAME_COUNT):
        smooth = 0.78 * smooth + 0.22 * rng.uniform(-1.0, 1.0)
        samples[frame] = 0.16 * smooth
    for start in (0.12, 0.36, 0.68, 1.02, 1.37, 1.74, 2.03):
        start_frame = int(start * SAMPLE_RATE)
        for offset in range(int(0.08 * SAMPLE_RATE)):
            frame = start_frame + offset
            if frame >= FRAME_COUNT:
                break
            t = offset / SAMPLE_RATE
            samples[frame] += 0.22 * math.exp(-40 * t) * math.sin(2 * math.pi * 1_450 * t)
    return samples


def wind() -> list[float]:
    rng = random.Random(3103)
    samples = [0.0] * FRAME_COUNT
    low = 0.0
    for frame in range(FRAME_COUNT):
        time = frame / SAMPLE_RATE
        low = 0.993 * low + 0.007 * rng.uniform(-1.0, 1.0)
        gust = 0.50 + 0.28 * math.sin(2 * math.pi * 0.55 * time)
        fade = min(1.0, time / 0.18, (DURATION - time) / 0.22)
        samples[frame] = 2.2 * low * gust * max(0.0, fade)
    return samples


def thunder() -> list[float]:
    rng = random.Random(3303)
    samples = [0.0] * FRAME_COUNT
    low = 0.0
    for frame in range(FRAME_COUNT):
        time = frame / SAMPLE_RATE
        low = 0.985 * low + 0.015 * rng.uniform(-1.0, 1.0)
        strike = math.exp(-3.1 * max(0.0, time - 0.14)) if time >= 0.14 else 0.0
        rumble = math.sin(2 * math.pi * 38 * time) + 0.45 * math.sin(2 * math.pi * 61 * time)
        samples[frame] = strike * (0.55 * low + 0.21 * rumble)
    return samples


def main() -> None:
    write_wav("birds-morning.wav", birds())
    write_wav("rain-soft.wav", rain())
    write_wav("wind-low.wav", wind())
    write_wav("thunder-low.wav", thunder())
    print(f"Wrote four deterministic classroom sounds to {OUT}")


if __name__ == "__main__":
    main()
