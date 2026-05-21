import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Auto<span style={styles.red}>Car</span>
      </Link>

      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Trang chủ</Link>
        <Link to="/cart" style={styles.navLink}>Giỏ hàng</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 70px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee"
  },
  logo: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#000",
    textDecoration: "none"
  },
  red: {
    color: "#e60000"
  },
  nav: {
    display: "flex",
    gap: "25px"
  },
  navLink: {
    textDecoration: "none",
    color: "#222",
    fontWeight: "600"
  }
};

export default Menu;