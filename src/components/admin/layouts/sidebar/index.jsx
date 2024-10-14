import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleCollapsed } from "../../../../features/collapsedSlice";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import formatRoutes from "../../../../config/routes/format-routes";
import defaultTheme from "../../../../themes/default-theme";
import "./index.css";
import { toggleBreakpoint } from "../../../../features/responsiveSlice";
import { styles } from "./styles";
import { selectMenu } from "../../../../features/userSlice";

const { Sider } = Layout;

const menus = [
    {
        "id": 1,
        "label": "Dashboard",
        "path": "/admin/dashboard",
        "key": "dashboard",
        "icon": "fa-solid fa-house",
        "parent_id": null
    },
    {
        "id": 2,
        "label": "user Management",
        "path": null,
        "key": "user-management",
        "icon": "fa-solid fa-users",
        "parent_id": null,
        "children": [
            {
                "id": 3,
                "label": "Roles",
                "path": "/admin/user-management/role",
                "key": "role",
                "icon": null,
                "parent_id": 3
            },
            {
                "id": 4,
                "label": "Permissions",
                "path": "/admin/user-management/permission",
                "key": "permission",
                "icon": null,
                "parent_id": 3
            },
            {
                "id": 5,
                "label": "Add Role Permission",
                "path": "/admin/user-management/add-role-permission",
                "key": "add-role-permission",
                "icon": null,
                "parent_id": 3
            },
            {
                "id": 6,
                "label": "All Role Permission",
                "path": "/admin/user-management/role-permission",
                "key": "all-role-permission",
                "icon": null,
                "parent_id": 3
            }
        ]
    },
    {
        "id": 7,
        "label": "System Admin",
        "path": "/admin/system-admin",
        "key": "system-admin",
        "icon": "fa-solid fa-user-gear",
        "parent_id": null
    },
    {
        "id": 8,
        "label": "Employee",
        "path": "/admin/employee",
        "key": "employee",
        "icon": "fa-solid fa-users-rectangle",
        "parent_id": null
    },
    {
        "id": 9,
        "label": "Team",
        "path": "/admin/team",
        "key": "team",
        "icon": "fa-solid fa-users-gear",
        "parent_id": null
    },
    {
        "id": 10,
        "label": "township",
        "path": "/admin/township",
        "key": "township",
        "icon": "fa-solid fa-building",
        "parent_id": null
    },
    {
        "id": 11,
        "label": "Type Person",
        "path": "/admin/type-person",
        "key": "type-person",
        "icon": "fa-solid fa-user-shield",
        "parent_id": null
    },
    {
        "id": 12,
        "label": "Profile",
        "path": "/admin/profile",
        "key": "profile",
        "icon": "fa-solid fa-user",
        "parent_id": null
    }
]

// Define the AppSidebar functional component
const AppSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const collapsed = useSelector((state) => state.collapsed);
    const { t } = useTranslation("sidebar"); // Initialize translation functions
    const routes = formatRoutes(t, menus || []); // Format and retrieve route data

    const isDarkMode = useSelector((state) => state.darkMode);
    const [collapseWidth, setcollapseWidth] = useState(80); // Set the default collapsed width

    const mode = isDarkMode ? "dark" : "light"; // Determine the theme mode (dark or light)

    const pathSegments = location.pathname.split("/");
    const selectedKey = pathSegments[pathSegments.length - 1];
    const [openKeys, setOpenKeys] = useState([]); // Store the open menu keys

    // Update open keys when the location or collapsed state changes
    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        setOpenKeys(pathSegments.slice(0, pathSegments.length - 1));
    }, [location.pathname, collapsed]);

    // Handle the collapse trigger
    const handleCollapse = () => {
        dispatch(toggleCollapsed());
    };

    // Handle the sidebar breakpoint
    const handleBreakPoint = (broken) => {
        dispatch(toggleBreakpoint());
        if (!broken) {
            setcollapseWidth(80); // Set the width when not broken
        } else {
            setcollapseWidth(0); // Set the width when broken (collapsed)
        }
    };

    // Handle submenu open state change
    const handleOpenChange = (keys) => {
        setOpenKeys(keys); // Update the open keys state
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            theme={mode}
            width={defaultTheme.components.Sider.width}
            breakpoint="md"
            collapsedWidth={collapseWidth}
            onBreakpoint={handleBreakPoint}
            style={styles.sider}
        >
            <Menu
                openKeys={openKeys}
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                theme={mode}
                mode="inline"
                items={routes}
                forceSubMenuRender={true}
                onOpenChange={handleOpenChange}
            />
        </Sider>
    );
};

export default AppSidebar;
