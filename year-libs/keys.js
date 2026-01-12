// Keys lists
let allKeys = {
    match: {
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
            downloadData: "enter",
            saveDataInBrowser: "\\",
            // Unused keys:
            //  `, 1, 2, -, =, [, ]
            //  Backspace
        },
        2026: {
            invertAction: ";",
            switchStage_Teleop: " ",
            switchStage_Auto: "b",
            toggleRobotCame: "t",
            focusOwnNotesField: "o",
            focusNotesField: "p",
            focusTeleopActiveBehavior: "j",
            focusTeleopInactiveBehavior: "k",
            focusSecondsBrokenCause: "l",
            scoreBy10: "y",
            fuelShotWhenInactive: "a",
            climbHeight: "s",
            fuelShot: "d",
            fuelMissed: "f",
            teleopCycleTime_1To3: "q",
            teleopCycleTime_4To6: "w",
            teleopCycleTime_7To10: "e",
            teleopCycleTime_Over10: "r",
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
            downloadData: "enter",
            saveDataInBrowser: "\\",
            // Unused keys:
            //  g, h, u, i, z, x, c, v
            //  `, 1, 2, 5, 6, 7, -, =, [, ]
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
            downloadData: "enter",
            saveDataInBrowser: "\\",
            /* PLACEHOLDER */
            // Unused keys:
            //  a, s, d, f, q, w, e, r
            //  j, k, l, u, i, o
            //  `, 1, 2, 6, 7, -, =, [, ]
            //  Backspace
        },
    },
    pit: {
        2026: {
            invertAction: ";",
            switchStage_Teleop: " ",
            switchStage_Auto: "b",
            toggleGetFuelFromFloor: "j",
            toggleCanCrossBump: "k",
            toggleCanGoThroughTrench: "l",
            focusOwnNotesField: "o",
            focusNotesField: "p",
            scoreBy10: "y",
            fuelCapacity: "m",
            climbHeight: "n",
            downloadData: "enter",
            saveDataInBrowser: "\\",
            // Unused keys:
            //  a, s, d, f, q, w, e, r, t
            //  g, h, u, i, z, x, c, v
            //  `, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, =, [, ]
            //  ', ,, ., /
            //  Backspace
        },
    },
}
let allGamepadKeys = {
    match: {
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
            downloadData: "MM",
            saveDataInBrowser: "JR",
            // Unused gamepad keys:
            //  JL
            // Unused gamepad axes:
            //  LX, LY, RX, RY
        },
        2026: {
            invertAction: "LBD",
            switchStage_Teleop: "RBU",
            switchStage_Auto: "LBU",
            toggleRobotCame: "ML",
            focusOwnNotesField: "LR",
            focusNotesField: "LU",
            focusTeleopActiveBehavior: "LL",
            focusTeleopInactiveBehavior: "LD",
            focusSecondsBrokenCause: "MR",
            scoreBy10: "RBD",
            fuelShotWhenInactive: "RU",
            climbHeight: "RL",
            fuelShot: "RR",
            fuelMissed: "RD",
            downloadData: "MM",
            saveDataInBrowser: "JR",
            // Unused gamepad keys:
            //  JL
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
            downloadData: "MM",
            saveDataInBrowser: "JR",
            /* PLACEHOLDER */
            // Unused gamepad keys:
            //  RU, RL, RD, RR
            //  LL, LD, LR
            //  JL
            // Unused gamepad axes:
            //  LX, LY, RX, RY
        },
    },
    pit: {
        2026: {
            invertAction: "LBD",
            switchStage_Teleop: "RBU",
            switchStage_Auto: "LBU",
            toggleGetFuelFromFloor: "RU",
            toggleCanCrossBump: "RL",
            toggleCanGoThroughTrench: "RD",
            focusOwnNotesField: "LR",
            focusNotesField: "LU",
            scoreBy10: "RBD",
            fuelCapacity: "LD",
            climbHeight: "RR",
            downloadData: "MM",
            saveDataInBrowser: "JR",
            // Unused gamepad keys:
            //  LL
            //  JL
            // Unused gamepad axes:
            //  LX, LY, RX, RY
        },
    },
}

// Get keys
function setKeyVars (year, isPit) {
    if (year == -1) { // Reset variables
        keys = null
        gamepadKeys = null
    } else { // Get keys
        keys = allKeys[isPit ? "pit" : "match"][year]
        gamepadKeys = allGamepadKeys[isPit ? "pit" : "match"][year]
    }
}
