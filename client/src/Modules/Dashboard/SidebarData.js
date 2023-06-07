import {
  FcComments,
  FcGlobe,
  FcSelfServiceKiosk,
  FcHome,
  FcFilm,
} from "react-icons/fc";
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FcHome />,
    cName: "nav-text",
  },
  {
    title: "Compiler",
    path: "/compiler",
    icon: <FcSelfServiceKiosk />,
    cName: "nav-text",
  },
  {
    title: "Community",
    path: "/community",
    icon: <FcGlobe />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/chat",
    icon: <FcComments />,
    cName: "nav-text",
  },

  {
    title: "Courses",
    path: "/showCourses",
    icon: <FcFilm />,
    cName: "nav-text",
  },
];
