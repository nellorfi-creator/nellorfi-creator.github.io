"""Spot #4 — Focus Dorso. Timeline semplice: immagini veloci, scritte lente."""

FPS = 25
W, H = 1080, 1920
SRC = "/tmp/dorso-src"

ORANGE = (255, 170, 0)
WHITE = (255, 255, 255)
GREY = (168, 168, 168)


def sec(frame):
    return frame / FPS


# (nome, frame_inizio, n_frame)
SCENES = [
    ("S1_HOOK", 0, 100),           # 4.0 s — claim su nero
    ("S2_INTRO", 100, 88),         # 3.5 s — atleta + numero
    ("S3_BLOCCO_1", 188, 100),     # 4.0 s — macchine 01-05
    ("S4_CLAIM_1", 288, 100),      # 4.0 s — claim
    ("S5_BLOCCO_2", 388, 100),     # 4.0 s — macchine 06-10
    ("S6_CLAIM_2", 488, 100),      # 4.0 s — claim
    ("S7_RAFFICA", 588, 150),      # 6.0 s — recap 10 x 15 f
    ("S8_PAYOFF", 738, 112),       # 4.5 s — CTA
]

TOTAL_FRAMES = SCENES[-1][1] + SCENES[-1][2]  # 850 = 34.0 s

MACHINES = [
    ("easy-power-station-precor", "01", "EASY POWER STATION", "Precor"),
    ("lat-machine-precor", "02", "LAT MACHINE", "Precor"),
    ("lateral-front-lat-pulldown", "03", "LAT PULLDOWN", "Plate Loaded"),
    ("linear-row", "04", "LINEAR ROW", "Plate Loaded"),
    ("panca-iperextension", "05", "IPEREXTENSION", "Sala Revenge"),
    ("pulley-linea-lux-technogym", "06", "PULLEY LINEA LUX", "Technogym"),
    ("pullover-plate-loaded", "07", "PULLOVER", "Plate Loaded"),
    ("seated-row-life-fitness", "08", "SEATED ROW", "Life Fitness"),
    ("t-bar-row", "09", "T-BAR ROW", "Plate Loaded"),
    ("trap-shrug-deadlift", "10", "TRAP SHRUG / DEADLIFT", "Plate Loaded"),
]

BLOCK_1 = MACHINES[0:5]
BLOCK_2 = MACHINES[5:10]
SLOT_FAST = 20
SLOT_WHIP = 15


def build_text_events():
    return sorted([
        (12, "sharp_01", 0.80),     # NON UNA SOLA TIRATA.
        (108, "deep_02", 0.92),     # 10 MACCHINE
        (298, "sharp_03", 0.85),    # TIRA DA OGNI ANGOLO.
        (498, "air_tight_02", 0.85),  # LARGHEZZA. SPESSORE. CONTROLLO.
        (748, "sharp_01", 0.82),    # 10 POSTAZIONI DORSO.
        (788, "deep_02", 0.90),     # OGNI TIRATA. UN DORSO.
    ])


TEXT_EVENTS = build_text_events()
SWOOSH_COUNT = len(TEXT_EVENTS)

IMPACTS = [
    (8, "soft", 0.55),
    (188, "soft", 0.45),
    (388, "soft", 0.45),
    (588, "soft", 0.50),
    (738, "final", 0.75),
]

MUSIC_IN = 3.5
