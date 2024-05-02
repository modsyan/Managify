import { routes } from "../config/routes";
import * as data from "./lang.json";
import { MdDashboard, MdHomeRepairService } from "react-icons/md";
import { DocumentIcon, UserIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { GiVacuumCleaner } from "react-icons/gi";
import { IoQrCode } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: data.ar.overview,
  },
  // label end
  {
    name: data.ar.dashboard,
    href: "/",
    icon: <MdDashboard />,
  },

  // label start
  {
    name: data.ar.technical_reports_and_repairs,
  },
  // label end
  {
    name: data.ar.technical_reports,
    icon: <MdHomeRepairService />,

    dropdownItems: [
      {
        name: data.ar.technical_reports_create,
        href: routes.technicalReports.create,
        badge: "",
      },
      {
        name: data.ar.technical_reports_list,
        href: routes.technicalReports.list,
      },
    ],
  },
  {
    name: data.ar.repair_requests,
    href: "#",
    icon: <DocumentIcon />,
    dropdownItems: [
      {
        name: data.ar.repair_requests_create,
        href: routes.repairRequests.create,
        badge: "",
      },
      {
        name: data.ar.repair_requests_list,
        href: routes.repairRequests.list,
      },
    ],
  },
  {
    name: data.ar.technical_reports,
    href: "#",
    icon: <DocumentIcon />,
    dropdownItems: [
      {
        name: data.ar.technical_reports_create,
        href: routes.technicalReports.create,
        badge: "",
      },
      {
        name: data.ar.technical_reports_list,
        href: routes.technicalReports.list,
      },
    ],
  },
  // label start
  {
    name: data.ar.maintenance_and_cleaning,
  },
  // label end
  {
    name: data.ar.maintenance,
    href: "#",
    icon: <WrenchIcon />,
    dropdownItems: [
      {
        name: "يومية",
        href: routes.maintenanceRequests.daily,
        badge: "",
      },
      {
        name: "أسبوعية",
        href: routes.maintenanceRequests.weekly,
        badge: "",
      },
      {
        name: "شهرية",
        href: routes.maintenanceRequests.monthly,
        badge: "",
      },
      {
        name: "ربع سنوي",
        href: routes.maintenanceRequests.quarterly,
        badge: "",
      },
      {
        name: "سنوي",
        href: routes.maintenanceRequests.yearly,
        badge: "",
      },
    ],
  },
  {
    name: data.ar.cleaning,
    href: "#",
    icon: <GiVacuumCleaner />,
    dropdownItems: [
      {
        name: "يومية",
        href: routes.cleaningRequests.daily,
        badge: "",
      },
      {
        name: "أسبوعية",
        href: routes.cleaningRequests.weekly,
        badge: "",
      },
      {
        name: "شهرية",
        href: routes.cleaningRequests.monthly,
        badge: "",
      },
      {
        name: "ربع سنوي",
        href: routes.cleaningRequests.quarterly,
        badge: "",
      },
      {
        name: "سنوي",
        href: routes.cleaningRequests.yearly,
        badge: "",
      },
    ],
  },
  // label start
  {
    name: "QR Code",
  },
  // label end
  {
    name: "QR Code",
    href: "#",
    icon: <IoQrCode />,
    dropdownItems: [
      {
        name: "إضافة",
        href: routes.qrCode.create,
        badge: "",
      },
      {
        name: "عرض",
        href: routes.qrCode.list,
        badge: "",
      },
    ],
  },
  {
    name: "إدارة المستخدمين ",
  },
  // label end
  {
    name: "المستخدمين",
    href: "#",
    icon: <UserIcon />,
    dropdownItems: [
      {
        name: "إضافة",
        href: routes.users.create,
        badge: "",
      },
    ],
  },
  {
    name: "إدارة المنشآت ",
  },
  // label end
  {
    name: "المنشآت",
    href: "#",
    icon: <PiBuildingsFill />,
    dropdownItems: [
      {
        name: "تفاصيل المباني",
        href: routes.facilities.list,
        badge: "",
      },
      {
        name: "تفاصيل الطوابق",
        href: routes.levels.list,
        badge: "",
      },

      {
        name: "تفاصيل أنواع الأصول",
        href: routes.resourceAssetTypes.list,
        badge: "",
      },
    ],
  },
  {
    name: "إدارة الأصول ",
  },
  // label end
  {
    name: "الأصول",
    href: "#",
    icon: <PiBuildingsFill />,
    dropdownItems: [
      {
        name: "إضافة نوع الأصل",
        href: routes.assetCategories.create,
        badge: "",
      },
      {
        name: "إضافة أصل",
        href: routes.assets.create,
        badge: "",
      },
    ],
  },
];
