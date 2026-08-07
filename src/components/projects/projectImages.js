// screenshot sets for the project galleries
// must be imported, not path strings, or vite won't hash them

// auth screens
import qsLogin from "../../assets/projects/queuesmart/Login.webp"
import qsRegister from "../../assets/projects/queuesmart/Register.webp"
import qsUnauthorized from "../../assets/projects/queuesmart/Unauthorized.webp"

// user side
import qsUserDashboard from "../../assets/projects/queuesmart/User-Dashboard.webp"
import qsUserJoin from "../../assets/projects/queuesmart/User-Join.webp"
import qsUserStatus from "../../assets/projects/queuesmart/User-Status.webp"
import qsUserHistory from "../../assets/projects/queuesmart/User-History.webp"
import qsUserFeedback from "../../assets/projects/queuesmart/User-Feedback.webp"

// admin side
import qsAdminDashboard from "../../assets/projects/queuesmart/Admin-Dashboard.webp"
import qsAdminQueue from "../../assets/projects/queuesmart/Admin-QueueManagement.webp"
import qsAdminQueueEdit from "../../assets/projects/queuesmart/Admin-QueueManagementEdit.webp"
import qsAdminService from "../../assets/projects/queuesmart/Admin-ServiceManagement.webp"
import qsAdminServiceCreate from "../../assets/projects/queuesmart/Admin-ServiceManagementCreate.webp"
import qsAdminServiceEdit from "../../assets/projects/queuesmart/Admin-ServiceManagementEdit.webp"
import qsAdminReports from "../../assets/projects/queuesmart/Admin-Reports.webp"
import qsAdminReportsCSV from "../../assets/projects/queuesmart/Admin-ReportsCSV.webp"
import qsAdminReportsPDF from "../../assets/projects/queuesmart/Admin-ReportsPDF.webp"
import qsAdminFeedback from "../../assets/projects/queuesmart/Admin-Feedback.webp"

// cover art, deliberately not in the gallery array
import qsCover from "../../assets/projects/queuesmart/QueueSmart-cover.webp"

// maze game
import mgStart from "../../assets/projects/mazegame/maze-start.png"
import mgBluePower from "../../assets/projects/mazegame/blue-power.gif"
import mgGreenPower from "../../assets/projects/mazegame/green-power.gif"
import mgPinkTrap from "../../assets/projects/mazegame/pink-trap.gif"
import mgRedTrap from "../../assets/projects/mazegame/red-trap.gif"

import mgCover from "../../assets/projects/mazegame/Labyrinth-cover.webp"

// rideshare
import rsEmpty from "../../assets/projects/rideshare/Page-empty.webp"
import rsFilled from "../../assets/projects/rideshare/Page-filled.webp"

import rsCover from "../../assets/projects/rideshare/RideShare-cover.webp"

// unity game
import ugScene from "../../assets/projects/unitygame/Scene.png"
import ugInGame from "../../assets/projects/unitygame/ingame.gif"
import ugMainIdle from "../../assets/projects/unitygame/Arriaga_Gustavo_MC_I.gif"
import ugMainMove from "../../assets/projects/unitygame/Arriaga_Gustavo_MC_M.gif"
import ugMainAttack from "../../assets/projects/unitygame/Arriaga_Gustavo_MC_A.gif"
import ugEnemyIdle from "../../assets/projects/unitygame/Arriaga_Gustavo_EC_I.gif"
import ugEnemyMove from "../../assets/projects/unitygame/Arriaga_Gustavo_EC_M.gif"
import ugEnemyAttack from "../../assets/projects/unitygame/Arriaga_Gustavo_EC_A.gif"

import ugCover from "../../assets/projects/unitygame/Faceoff-cover.webp"

// mri scanner
import mriHomeRect from "../../assets/projects/mriScanner/home-rectangle.png"
import mriRectCartesian from "../../assets/projects/mriScanner/rectangle-cartesian.png"
import mriHomeCircle from "../../assets/projects/mriScanner/home-circle.png"
import mriCircleRadial from "../../assets/projects/mriScanner/circle-radial.png"

import mriCover from "../../assets/projects/mriScanner/MRI-cover.webp"

// freelance document system
import docPortal1 from "../../assets/projects/documents/Portal_page-0001.jpg"
import docPortal2 from "../../assets/projects/documents/Portal_page-0002.jpg"
import docProposal1 from "../../assets/projects/documents/Proposal_page-0001.jpg"
import docProposal2 from "../../assets/projects/documents/Proposal_page-0002.jpg"
import docContract1 from "../../assets/projects/documents/Contract_page-0001.jpg"
import docContract2 from "../../assets/projects/documents/Contract_page-0002.jpg"
import docInvoice1 from "../../assets/projects/documents/Invoice_page-0001.jpg"
import docInvoice2 from "../../assets/projects/documents/Invoice_page-0002.jpg"

import docCover from "../../assets/projects/documents/Bracketed-cover.webp"

export const queueSmartCover = { src: qsCover, alt: "QueueSmart title card reading 'smarter way to wait in line'" }

// order shown in the grid
export const queueSmartImages = [
    { src: qsLogin, alt: "Login screen with email and password fields" },
    { src: qsRegister, alt: "Account registration form" },
    { src: qsUnauthorized, alt: "Unauthorized access screen for a blocked route" },

    { src: qsUserDashboard, alt: "User dashboard showing current queue, notifications, and active services" },
    { src: qsUserJoin, alt: "Joining a queue from the list of available services" },
    { src: qsUserStatus, alt: "Live queue status with position and estimated wait" },
    { src: qsUserHistory, alt: "User history of past queue visits" },
    { src: qsUserFeedback, alt: "User feedback form with a star rating" },

    { src: qsAdminDashboard, alt: "Admin dashboard overview of queue activity" },
    { src: qsAdminQueue, alt: "Queue management table with people waiting, estimated wait, and priority" },
    { src: qsAdminQueueEdit, alt: "Editing a queue entry from the management table" },
    { src: qsAdminService, alt: "Service management list of all bookable services" },
    { src: qsAdminServiceCreate, alt: "Creating a new service" },
    { src: qsAdminServiceEdit, alt: "Editing an existing service" },
    { src: qsAdminReports, alt: "Reports view of queue activity" },
    { src: qsAdminReportsCSV, alt: "Report exported to CSV and opened in a spreadsheet" },
    { src: qsAdminReportsPDF, alt: "Report exported as a PDF document" },
    { src: qsAdminFeedback, alt: "Admin feedback view with all submissions and average rating" },
]

export const mazeGameCover = { src: mgCover, alt: "Labyrinth title card reading 'Lost in space. Try and escape the labyrinth.'" }

export const mazeGameImages = [
    { src: mgStart, alt: "Starting view of a randomly generated 3D maze" },
    { src: mgBluePower, alt: "Blue speed boost power-up increasing player movement" },
    { src: mgGreenPower, alt: "Green high jump power-up giving a birds-eye view of the maze" },
    { src: mgRedTrap, alt: "Red slow trap reducing player movement" },
    { src: mgPinkTrap, alt: "Pink spin trap rotating the camera to disorient the player" },
]

export const rideShareCover = { src: rsCover, alt: "RideShare title card reading 'Reliable booking. Safe travels.'" }

export const rideShareImages = [
    { src: rsEmpty, alt: "Booking page before any rides have been entered" },
    { src: rsFilled, alt: "Booking page populated with ride and transaction data" },
]

export const unityGameCover = { src: ugCover, alt: "Faceoff title card reading 'frame-by-frame', with the two characters facing off" }

// gameplay first, then the hand-drawn animation cycles
export const unityGameImages = [
    { src: ugScene, alt: "Level scene laid out in the Unity editor" },
    { src: ugInGame, alt: "In-game footage of the player moving through the level" },
    { src: ugMainIdle, alt: "Main character idle animation, drawn frame by frame" },
    { src: ugMainMove, alt: "Main character walk cycle" },
    { src: ugMainAttack, alt: "Main character attack animation" },
    { src: ugEnemyIdle, alt: "Enemy character idle animation" },
    { src: ugEnemyMove, alt: "Enemy character movement animation" },
    { src: ugEnemyAttack, alt: "Enemy character attack animation" },
]

export const mriScannerCover = { src: mriCover, alt: "MRI Scanner title card reading 'Matlab GUI. Custom data. Accurate results.'" }

// each phantom shown as setup then reconstruction
export const mriScannerImages = [
    { src: mriHomeRect, alt: "Scanner GUI with the rectangle phantom and Cartesian acquisition set up" },
    { src: mriRectCartesian, alt: "Rectangle phantom, Cartesian reconstruction, and difference map with signal profiles" },
    { src: mriHomeCircle, alt: "Scanner GUI with the circle phantom and radial acquisition set up" },
    { src: mriCircleRadial, alt: "Circle phantom, radial reconstruction, and difference map with signal profiles" },
]

export const documentSystemCover = { src: docCover, alt: "Bracketed title card reading 'Fill the brackets. Skip the paperwork.'" }

export const documentSystemImages = [
    { src: docPortal1, alt: "Document portal home menu, page 1" },
    { src: docPortal2, alt: "Document portal home menu, page 2" },
    { src: docProposal1, alt: "Project proposal, page 1" },
    { src: docProposal2, alt: "Project proposal, page 2" },
    { src: docContract1, alt: "Client contract, page 1" },
    { src: docContract2, alt: "Client contract, page 2" },
    { src: docInvoice1, alt: "Invoice, page 1" },
    { src: docInvoice2, alt: "Invoice, page 2" },
]
