"""Timeline condivisa dello Spot #2 — Focus Gambe.

Video e audio leggono da qui: ogni evento di testo genera automaticamente
il proprio swoosh, così i due montaggi non possono andare fuori sincrono.
"""

FPS = 25
W, H = 1080, 1920
SRC = "/tmp/gambe-src"

ORANGE = (255, 170, 0)
WHITE = (255, 255, 255)
GREY = (168, 168, 168)


def sec(frame):
    return frame / FPS


# ---------------------------------------------------------------- scene bounds
# (nome, frame_inizio, n_frame)
SCENES = [
    ("S1_HOOK", 0, 100),
    ("S2_DICHIARAZIONE", 100, 100),
    ("S3_RAFFICA_1", 200, 200),
    ("S4_FRENATA_1", 400, 100),
    ("S5_RAFFICA_2", 500, 200),
    ("S6_FRENATA_2", 700, 75),
    ("S7_RAFFICA_3", 775, 175),
    ("S8_SOSPENSIONE", 950, 125),
    ("S9_VENTUNESIMA", 1075, 75),
    ("S10_PAYOFF", 1150, 150),
]

TOTAL_FRAMES = SCENES[-1][1] + SCENES[-1][2]


def scene_start(name):
    for n, start, _ in SCENES:
        if n == name:
            return start
    raise KeyError(name)


# ---------------------------------------------------------------- le 21 macchine
# (file, numero, nome a schermo, brand)
MACHINES = [
    # Raffica 1 — la spinta
    ("pressa-orizzontale-life-fitness", "01", "PRESSA ORIZZONTALE", "Life Fitness"),
    ("pressa-45-life-fitness", "02", "PRESSA 45\u00b0", "Life Fitness"),
    ("v-squat-life-fitness", "03", "V-SQUAT", "Life Fitness"),
    ("hack-squat-gymleco", "04", "HACK SQUAT", "Gymleco"),
    ("hack-squat-pendulum", "05", "HACK SQUAT PENDULUM", "Pendulum"),
    ("belt-squat", "06", "BELT SQUAT", "Plate Loaded"),
    ("sissy-squat", "07", "SISSY SQUAT", "Plate Loaded"),
    # Raffica 2 — l'isolamento
    ("dual-leg-curl-extension-panatta", "08", "LEG CURL / EXTENSION", "Panatta"),
    ("leg-extension-teca", "09", "LEG EXTENSION", "Teca"),
    ("leg-curl-teca", "10", "LEG CURL", "Teca"),
    ("standing-leg-curl", "11", "STANDING LEG CURL", "Sala Revenge"),
    ("lunge-deadlift-machine", "12", "LUNGE / DEADLIFT", "Plate Loaded"),
    ("abductor-life-fitness", "13", "ABDUCTOR", "Life Fitness"),
    ("adductor-life-fitness", "14", "ADDUCTOR", "Life Fitness"),
    # Raffica 3 — glutei e struttura
    ("gluteus-machine-life-fitness", "15", "GLUTEUS MACHINE", "Life Fitness"),
    ("master-gluteus-panatta", "16", "MASTER GLUTEUS", "Panatta"),
    ("hip-thrust-orizzontale", "17", "HIP THRUST ORIZZONTALE", "Plate Loaded"),
    ("hip-thrust-verticale", "18", "HIP THRUST VERTICALE", "Plate Loaded"),
    ("calf-machine-hammer", "19", "CALF MACHINE", "Hammer Strength"),
    ("smith-machine-hammer", "20", "SMITH MACHINE", "Hammer Strength"),
    # La ventunesima
    ("rack-hammer", "21", "RACK", "Hammer Strength"),
]

BURST_1 = MACHINES[0:7]
BURST_2 = MACHINES[7:14]
BURST_3 = MACHINES[14:20]
MACHINE_21 = MACHINES[20]

# Ogni macchina nelle raffiche occupa un blocco di frame di pari durata.
BURST_SLOTS = {
    "S3_RAFFICA_1": (200, 28, BURST_1),   # 7 x 28 = 196 (+4 di respiro)
    "S5_RAFFICA_2": (500, 28, BURST_2),   # 7 x 28 = 196 (+4)
    "S7_RAFFICA_3": (775, 29, BURST_3),   # 6 x 29 = 174 (+1)
}


# ---------------------------------------------------------------- eventi di testo
# Ogni voce = una scritta che APPARE a schermo -> genera 1 swoosh.
# (frame, variante_swoosh, gain)
def build_text_events():
    ev = []

    # S1 — claim su nero
    ev.append((15, "sharp_01", 0.85))

    # S2 — dichiarazione + il numero chiave
    ev.append((105, "sharp_03", 0.85))          # NOI L'ABBIAMO ARMATO
    ev.append((143, "deep_02", 1.00))           # 21 VOLTE.

    # S3 / S5 / S7 — un cartello per macchina
    variants = ["sharp_01", "sharp_03", "air_tight_02"]
    for scene in ("S3_RAFFICA_1", "S5_RAFFICA_2", "S7_RAFFICA_3"):
        start, slot, machines = BURST_SLOTS[scene]
        for i in range(len(machines)):
            ev.append((start + i * slot + 1, variants[i % 3], 0.42))

    # S4 — claim in due righe
    ev.append((405, "sharp_03", 0.85))          # QUI NON SI SIMULA.
    ev.append((413, "air_tight_02", 0.80))      # SI SPINGE.

    # S6 — claim sul freeze
    ev.append((704, "deep_02", 0.88))           # OGNI FIBRA HA LA SUA MACCHINA.

    # S8 — contatore e sussurro
    ev.append((962, "deep_02", 0.45))           # 20
    ev.append((1031, "reverse_long", 0.90))     # NE MANCA UNA.

    # S9 — lo stamp della ventunesima
    ev.append((1077, "deep_02", 1.00))          # 21 · RACK

    # S10 — payoff in tre battute
    ev.append((1152, "sharp_01", 0.85))         # 21 MACCHINE PER LE GAMBE.
    ev.append((1192, "deep_02", 0.95))          # ZERO SCUSE.
    ev.append((1232, "air_tight_02", 0.75))     # REVENGE GYM / revengegym.it

    ev.sort(key=lambda e: e[0])
    return ev


TEXT_EVENTS = build_text_events()
SWOOSH_COUNT = len(TEXT_EVENTS)

# ---------------------------------------------------------------- impatti
# (frame, tipo, gain)
IMPACTS = [
    (8, "metal_low", 0.95),      # il disco che si incastra
    (1075, "huge", 1.00),        # rivelazione della 21a
    (1265, "final", 0.85),       # chiusura sul logo
]

# ---------------------------------------------------------------- battito cardiaco
HEART_START = 36.0        # infiltrazione impercettibile
HEART_END = 42.76         # taglio netto (6 frame di silenzio prima di S9)
HEART_BPM = (70.0, 150.0)
HEART_GAIN = (0.063, 0.50)   # -24 dB -> -6 dB

# 6 frame di silenzio assoluto prima della rivelazione
SILENCE_IN = 42.76
SILENCE_OUT = 43.0
