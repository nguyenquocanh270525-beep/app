import React, { useState } from "react";
import Product from "./Product";
import { getCars } from "../config/api";

function Home() {
  const cars = getCars();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(cars);

  const handleSearch = () => {
    let filtered = cars;

    if (brand !== "") {
      filtered = filtered.filter((car) => car.brand === brand);
    }

    if (price !== "") {
      if (price === "duoi500") {
        filtered = filtered.filter((car) => car.price < 500);
      }

      if (price === "500den700") {
        filtered = filtered.filter(
          (car) => car.price >= 500 && car.price <= 700
        );
      }

      if (price === "tren700") {
        filtered = filtered.filter((car) => car.price > 700);
      }
    }

    if (year !== "") {
      filtered = filtered.filter((car) => car.year === Number(year));
    }

    setResult(filtered);
  };

  return (
    <div>
      <section style={styles.banner}>
        <div style={styles.bannerText}>
          Tìm chiếc xe <br /> phù hợp với bạn
        </div>
      </section>

      <section style={styles.searchBox}>
        <select style={styles.select} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Hãng xe</option>
          <option value="Honda">Honda</option>
          <option value="Toyota">Toyota</option>
          <option value="Mazda">Mazda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Kia">Kia</option>
          <option value="Ford">Ford</option>
          <option value="Mitsubishi">Mitsubishi</option>
        </select>

        <select style={styles.select} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Khoảng giá</option>
          <option value="duoi500">Dưới 500 triệu</option>
          <option value="500den700">500 - 700 triệu</option>
          <option value="tren700">Trên 700 triệu</option>
        </select>

        <select style={styles.select} onChange={(e) => setYear(e.target.value)}>
          <option value="">Năm sản xuất</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>

        <button style={styles.searchButton} onClick={handleSearch}>
          🔍 Tìm kiếm
        </button>
      </section>

      <Product cars={result} />

      <footer style={styles.footer}>
        <div>
          <h4>📍 Địa chỉ showroom</h4>
          <p>123 Đường Lê Văn Lương,<br />Quận Thanh Xuân, Hà Nội</p>
        </div>

        <div>
          <h4>☎ Hotline</h4>
          <p>0901 234 567</p>
        </div>

        <div>
          <h4>✉ Email</h4>
          <p>info@autocar.vn</p>
        </div>
      </footer>

      <div style={styles.copyright}>
        © 2024 AutoCar. Tất cả quyền được bảo lưu.
      </div>
    </div>
  );
}

const styles = {
  banner: {
    height: "350px",
    backgroundImage: "url('/images/banner-car.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    paddingLeft: "80px"
  },
  bannerText: {
    fontSize: "50px",
    fontWeight: "800",
    lineHeight: "1.2",
    color: "#000"
  },
  searchBox: {
    display: "flex",
    gap: "25px",
    padding: "30px 80px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  select: {
    flex: 1,
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px"
  },
  searchButton: {
    padding: "15px 40px",
    backgroundColor: "#e60000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  },
  footer: {
    marginTop: "30px",
    padding: "30px 80px",
    backgroundColor: "#f3f3f3",
    display: "flex",
    justifyContent: "space-between"
  },
  copyright: {
    textAlign: "center",
    padding: "15px",
    color: "#777",
    backgroundColor: "#f8f8f8"
  }
};

export default Home;