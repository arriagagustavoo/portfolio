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

// maze game
import mgStart from "../../assets/projects/mazegame/maze-start.png"
import mgBluePower from "../../assets/projects/mazegame/blue-power.gif"
import mgGreenPower from "../../assets/projects/mazegame/green-power.gif"
import mgPinkTrap from "../../assets/projects/mazegame/pink-trap.gif"
import mgRedTrap from "../../assets/projects/mazegame/red-trap.gif"

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

export const mazeGameImages = [
    { src: mgStart, alt: "Starting view of a randomly generated 3D maze" },
    { src: mgBluePower, alt: "Blue speed boost power-up increasing player movement" },
    { src: mgGreenPower, alt: "Green high jump power-up giving a birds-eye view of the maze" },
    { src: mgRedTrap, alt: "Red slow trap reducing player movement" },
    { src: mgPinkTrap, alt: "Pink spin trap rotating the camera to disorient the player" },
]
