import PropTypes from "prop-types";
import img from "../../../../../assets/images/logo/mmf.png";
import defaultTheme from "../../../../../themes/default-theme";

const Logo = ({ collapsed }) => {
    return (
        <div
            className={`brand mobile-screen ${collapsed ? "collapsed" : ""}`}
            style={{
                width: !collapsed && defaultTheme.components.Sider.width,
                transition: "width 0.5s ease",
            }}
        >
            <div className="logo">
                <img alt="brand logo" src={img} />
                {/* {!collapsed && <h1>MMF</h1>} */}
            </div>
        </div>
    );
};

Logo.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default Logo;
