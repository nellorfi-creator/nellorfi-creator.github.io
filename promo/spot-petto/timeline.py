"""Spot #3 — Focus Petto. Timeline semplice: immagini veloci, scritte lente."""

FPS = 25
W, H = 1080, 1920
SRC = "/tmp/petto-src"

ORANGE = (255, 170, 0)
WHITE = (255, 255, 255)
GREY = (168, 168, 168)


def sec(frame):
    return frame / FPS


# (nome, frame_inizio, n_frame)
SCENES = [
    ("S1_HOOK", 0, 100),           # 4.0 s — claim su nero
    ("S2_INTRO", 100, 88),         # 3.5 s — atleta + numero
    ("S3_BLOCCO_1", 188, 120),     # 4.8 s — macchine 01-06 (20 f cad.)
    ("S4_CLAIM_1", 308, 100),      # 4.0 s — spinta
    ("S5_BLOCCO_2", 408, 120),     # 4.8 s — macchine 07-12
    ("S6_CLAIM_2", 528, 100),      # 4.0 s — aperture e libero
    ("S7_RAFFICA", 628, 180),      # 7.2 s — recap 12 x 15 f
    ("S8_PAYOFF", 808, 117),        # 4.7 s — CTA
]

TOTAL_FRAMES = SCENES[-1][1] + SCENES[-1][2]  # 925 = 37.0 s

# (file senza estensione, num, label, brand)
MACHINES = [
    ("chest-press-declinata", "01", "CHEST PRESS DECLINATA", "Plate Loaded"),
    ("chest-press-life-fitness", "02", "CHEST PRESS", "Life Fitness"),
    ("incline-chest-press-hoist", "03", "INCLINE CHEST PRESS", "HOIST ROC-IT"),
    ("incline-press-life-fitness", "04", "INCLINE PRESS", "Life Fitness"),
    ("multi-flight-machine", "05", "MULTI FLIGHT", "Sala Revenge"),
    ("pec-fly", "06", "PEC FLY", "Selectorized"),
    ("panca-inclinata", "07", "PANCA INCLINATA", "Postazione Revenge"),
    ("panca-orizzontale", "08", "PANCA ORIZZONTALE", "Postazione Revenge"),
    ("pectoral-machine-life-fitness", "09", "PECTORAL MACHINE", "Life Fitness"),
    ("power-smith-dual-system-upper-panatta", "10", "POWER SMITH UPPER", "Panatta"),
    ("rear-delt-pec-fly-precor", "11", "REAR DELT / PEC FLY", "Precor"),
    ("super-horizontal-multi-press-panatta", "12", "SUPER MULTI PRESS", "Panatta"),
]

BLOCK_1 = MACHINES[0:6]
BLOCK_2 = MACHINES[6:12]
SLOT_FAST = 20    # 0.80 s per macchina nei blocchi
SLOT_WHIP = 15    # 0.60 s nel recap finale


def build_text_events():
    """Swoosh solo sulle scritte principali, non su ogni cartello macchina."""
    ev = [
        (12, "sharp_01", 0.80),    # NON UNA SOLA SPINTA.
        (108, "deep_02", 0.92),    # 12 MACCHINE PER IL PETTO
        (318, "sharp_03", 0.85),   # SPINGI DA OGNI ANGOLO.
        (538, "air_tight_02", 0.85),  # APRI. ISOLA. COSTRUISCI.
        (818, "sharp_01", 0.82),   # 12 POSTAZIONI PETTO.
        (858, "deep_02", 0.90),    # OGNI ANGOLO. UN PETTO.
    ]
    return sorted(ev)


TEXT_EVENTS = build_text_events()
SWOOSH_COUNT = len(TEXT_EVENTS)

IMPACTS = [
    (8, "soft", 0.55),
    (188, "soft", 0.45),
    (408, "soft", 0.45),
    (628, "soft", 0.50),
    (808, "final", 0.75),
]

MUSIC_IN = 3.5
MUSIC_DROP_AT = 37.0  # non usato: spot corto, musica continua
