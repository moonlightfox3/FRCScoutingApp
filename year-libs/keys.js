// Keys lists
let allKeys = {
    2024: {
        invertAction: ";",
        switchStage_Teleop: " ",
        switchStage_Auto: "b",
        toggleRobotCame: "t",
        toggleRobotAutoLeftStart: "y",
        focusNotesField: "p",
        speakerHit: "d",
        ampHit: "k",
        speakerMiss: "e",
        ampMiss: "i",
        defenseResistance_None: "z",
        defenseResistance_Weak: "x",
        defenseResistance_Strong: "c",
        playingDefenseType_None: "v",
        playingDefenseType_Passive: "g",
        playingDefenseType_Active: "h",
        playingDefenseStrength_VeryWeak: "n",
        playingDefenseStrength_Weak: "m",
        playingDefenseStrength_Average: ",",
        playingDefenseStrength_Strong: ".",
        playingDefenseStrength_VeryStrong: "/",
        playingDefenseStrength_None: "'",
        secondsBroken_1To10: "3",
        secondsBroken_11To30: "4",
        secondsBroken_31To60: "8",
        secondsBroken_Over60: "9",
        secondsBroken_None: "0",
        endType_Park: "5",
        endType_Climb: "7",
        saveData: "enter",
        // Unused keys:
        //  a, s, f, q, w, r
        //  j, l, u, o
        //  `, 1, 2, -, =, [, ], \
        //  Backspace
    },
    2025: {
        invertAction: ";",
        switchStage_Teleop: " ",
        switchStage_Auto: "b",
        toggleRobotCame: "t",
        toggleRobotAutoLeftStart: "y",
        focusNotesField: "p",
        coralL1Hit: "a",
        coralL2Hit: "s",
        coralL3Hit: "d",
        coralL4Hit: "f",
        coralL1Miss: "q",
        coralL2Miss: "w",
        coralL3Miss: "e",
        coralL4Miss: "r",
        algaeProcessorHit: "j",
        algaeNetHit: "k",
        algaeDescoreHit: "l",
        algaeProcessorMiss: "u",
        algaeNetMiss: "i",
        algaeDescoreMiss: "o",
        defenseResistance_None: "z",
        defenseResistance_Weak: "x",
        defenseResistance_Strong: "c",
        playingDefenseType_None: "v",
        playingDefenseType_Passive: "g",
        playingDefenseType_Active: "h",
        playingDefenseStrength_VeryWeak: "n",
        playingDefenseStrength_Weak: "m",
        playingDefenseStrength_Average: ",",
        playingDefenseStrength_Strong: ".",
        playingDefenseStrength_VeryStrong: "/",
        playingDefenseStrength_None: "'",
        secondsBroken_1To10: "3",
        secondsBroken_11To30: "4",
        secondsBroken_31To60: "8",
        secondsBroken_Over60: "9",
        secondsBroken_None: "0",
        endType_Park: "5",
        endType_Deep: "6",
        endType_Shallow: "7",
        saveData: "enter",
        // Unused keys:
        //  `, 1, 2, -, =, [, ], \
        //  Backspace
    },
    2026: {
        invertAction: ";",
        switchStage_Teleop: " ",
        switchStage_Auto: "b",
        toggleRobotCame: "t",
        toggleRobotAutoLeftStart: "y",
        focusNotesField: "p",
        /* PLACEHOLDER */
        defenseResistance_None: "z",
        defenseResistance_Weak: "x",
        defenseResistance_Strong: "c",
        playingDefenseType_None: "v",
        playingDefenseType_Passive: "g",
        playingDefenseType_Active: "h",
        playingDefenseStrength_VeryWeak: "n",
        playingDefenseStrength_Weak: "m",
        playingDefenseStrength_Average: ",",
        playingDefenseStrength_Strong: ".",
        playingDefenseStrength_VeryStrong: "/",
        playingDefenseStrength_None: "'",
        secondsBroken_1To10: "3",
        secondsBroken_11To30: "4",
        secondsBroken_31To60: "8",
        secondsBroken_Over60: "9",
        secondsBroken_None: "0",
        endType_Park: "5",
        /* PLACEHOLDER */
        saveData: "enter",
        /* PLACEHOLDER */
        // Unused keys:
        //  a, s, d, f, q, w, e, r
        //  j, k, l, u, i, o
        //  `, 1, 2, -, =, [, ], \
        //  Backspace
    },
    0: {
        invertAction: ";",
        switchStage_Teleop: " ",
        switchStage_Auto: "b",
        toggleRobotCame: "t",
        toggleRobotAutoLeftStart: "y",
        focusNotesField: "p",
        /* PLACEHOLDER */
        defenseResistance_None: "z",
        defenseResistance_Weak: "x",
        defenseResistance_Strong: "c",
        playingDefenseType_None: "v",
        playingDefenseType_Passive: "g",
        playingDefenseType_Active: "h",
        playingDefenseStrength_VeryWeak: "n",
        playingDefenseStrength_Weak: "m",
        playingDefenseStrength_Average: ",",
        playingDefenseStrength_Strong: ".",
        playingDefenseStrength_VeryStrong: "/",
        playingDefenseStrength_None: "'",
        secondsBroken_1To10: "3",
        secondsBroken_11To30: "4",
        secondsBroken_31To60: "8",
        secondsBroken_Over60: "9",
        secondsBroken_None: "0",
        endType_Park: "5",
        /* PLACEHOLDER */
        saveData: "enter",
        /* PLACEHOLDER */
        // Unused keys:
        //  a, s, d, f, q, w, e, r
        //  j, k, l, u, i, o
        //  `, 1, 2, -, =, [, ], \
        //  Backspace
    },
}
let allGamepadKeys = {
    2024: {
        invertAction: "LBD",
        scoreMiss: "RBD",
        switchStage_Teleop: "RBU",
        switchStage_Auto: "LBU",
        toggleRobotCame: "ML",
        toggleRobotAutoLeftStart: "MR",
        focusNotesField: "LU",
        speaker: "RL",
        amp: "LR",
        saveData: "MM",
        // Unused gamepad keys:
        //  RU, RD, RR
        //  LL, LD
        //  JL, JR
        // Unused gamepad axes:
        //  LX, LY, RX, RY
    },
    2025: {
        invertAction: "LBD",
        scoreMiss: "RBD",
        switchStage_Teleop: "RBU",
        switchStage_Auto: "LBU",
        toggleRobotCame: "ML",
        toggleRobotAutoLeftStart: "MR",
        focusNotesField: "LU",
        coralL1: "RU",
        coralL2: "RL",
        coralL3: "RD",
        coralL4: "RR",
        algaeProcessor: "LL",
        algaeNet: "LD",
        algaeDescore: "LR",
        saveData: "MM",
        // Unused gamepad keys:
        //  JL, JR
        // Unused gamepad axes:
        //  LX, LY, RX, RY
    },
    2026: {
        invertAction: "LBD",
        scoreMiss: "RBD",
        switchStage_Teleop: "RBU",
        switchStage_Auto: "LBU",
        toggleRobotCame: "ML",
        toggleRobotAutoLeftStart: "MR",
        focusNotesField: "LU",
        /* PLACEHOLDER */
        saveData: "MM",
        /* PLACEHOLDER */
        // Unused gamepad keys:
        //  RU, RL, RD, RR
        //  LL, LD, LR
        //  JL, JR
        // Unused gamepad axes:
        //  LX, LY, RX, RY
    },
    0: {
        invertAction: "LBD",
        scoreMiss: "RBD",
        switchStage_Teleop: "RBU",
        switchStage_Auto: "LBU",
        toggleRobotCame: "ML",
        toggleRobotAutoLeftStart: "MR",
        focusNotesField: "LU",
        /* PLACEHOLDER */
        saveData: "MM",
        /* PLACEHOLDER */
        // Unused gamepad keys:
        //  RU, RL, RD, RR
        //  LL, LD, LR
        //  JL, JR
        // Unused gamepad axes:
        //  LX, LY, RX, RY
    },
}

// Get keys
function setKeyVars (year) {
    if (year == -1) { // Reset variables
        keys = null
        gamepadKeys = null
    } else { // Get keys
        keys = allKeys[year]
        gamepadKeys = allGamepadKeys[year]
    }
}
