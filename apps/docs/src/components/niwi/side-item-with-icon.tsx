import Link from "@docusaurus/Link";
import styles from "./side-item-with-icon.module.css";

const SidebarItemWithIcon = ({ icon, label, to }) => {
  return (
    <Link className={styles.sidebarItem} to={to}>
      <img src={icon} alt={label} className={styles.icon} />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItemWithIcon;
