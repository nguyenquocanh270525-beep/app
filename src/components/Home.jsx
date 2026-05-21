import React, { useState } from "react";
import Product from "./Product";
import { getCars } from "../config/api";

function Home() {
  const cars = getCars();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(cars);

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

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
    setCurrentPage(1); 
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCars = result.slice(indexOfFirstItem, indexOfLastItem);
  
 
  const totalPages = Math.ceil(result.length / itemsPerPage);

  return (
    <div style={styles.page}>
  
      <section style={styles.banner}>
        <div style={styles.bannerOverlay}></div>
        <div style={styles.bannerContainer}>
          <h1 style={styles.bannerText}>
            Tìm chiếc xe <br /> <span style={styles.highlightText}>phù hợp nhất</span> với bạn
          </h1>
          <p style={styles.bannerSubtitle}>Hàng trăm mẫu xe đời mới, ưu đãi giữ chỗ trực tuyến trong 24h.</p>
        </div>
      </section>

      
      <div style={styles.searchWrapper}>
        <section style={styles.searchBox}>
          <div style={styles.filterGroup}>
            <span style={styles.filterIcon}>🚗</span>
            <select style={styles.select} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Hãng xe (Tất cả)</option>
              <option value="Honda">Honda</option>
              <option value="Toyota">Toyota</option>
              <option value="Mazda">Mazda</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Kia">Kia</option>
              <option value="Ford">Ford</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="VinFast">VinFast</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="BMW">BMW</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterIcon}>💰</span>
            <select style={styles.select} onChange={(e) => setPrice(e.target.value)}>
              <option value="">Khoảng giá (Tất cả)</option>
              <option value="duoi500">Dưới 500 triệu</option>
              <option value="500den700">500 - 700 triệu</option>
              <option value="tren700">Trên 700 triệu</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterIcon}>📅</span>
            <select style={styles.select} onChange={(e) => setYear(e.target.value)}>
              <option value="">Năm sản xuất (Tất cả)</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <button 
            style={styles.searchButton} 
            onClick={handleSearch}
            onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
            onMouseOut={(e) => e.currentTarget.style.background = "#ef4444"}
          >
            Tìm kiếm xe
          </button>
        </section>
      </div>

      
      <div style={styles.mainContent}>
        {currentCars.length === 0 ? (
          <div style={styles.noResult}>
            <span style={{ fontSize: "40px" }}>🔍</span>
            <p style={{ margin: "10px 0 0 0", color: "#64748b", fontWeight: "500" }}>
              Không tìm thấy mẫu xe nào phù hợp với bộ lọc của bạn.
            </p>
          </div>
        ) : (
          <>
            
            <Product cars={currentCars} />

           
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  style={{
                    ...styles.pageButton,
                    ...(currentPage === 1 ? styles.disabledButton : {}),
                  }}
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => prev - 1);
                    window.scrollTo({ top: 320, behavior: "smooth" });
                  }}
                >
                  ← Trước
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => {
                        setCurrentPage(pageNumber);
                        window.scrollTo({ top: 320, behavior: "smooth" }); 
                      }}
                      style={{
                        ...styles.pageNumberButton,
                        ...(isActive ? styles.activePageButton : {}),
                      }}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  style={{
                    ...styles.pageButton,
                    ...(currentPage === totalPages ? styles.disabledButton : {}),
                  }}
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                    window.scrollTo({ top: 320, behavior: "smooth" });
                  }}
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>

     
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>📍 Showroom AutoCar</h4>
            <p style={styles.footerText}>Học Viện Bưu Chính Viễn Thông,<br />Quận Hà Đông, Hà Nội</p>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>☎ Đường dây nóng</h4>
            <p style={styles.footerPhone}>0123456789</p>
            <p style={styles.footerText}>Hỗ trợ tư vấn 24/7 miễn phí</p>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>✉ Hòm thư điện tử</h4>
            <p style={styles.footerLink}>SieuXe@autocar.vn</p>
            <p style={styles.footerText}>Phản hồi trong vòng 2 tiếng</p>
          </div>
        </div>
      </footer>

      <div style={styles.copyright}>
        © 2026 AutoCar. Tất cả quyền được bảo lưu. Thiết kế giao diện cao cấp.
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f8fafc",
    fontFamily: "system-ui, -apple-system, sans-serif",
    minHeight: "100vh",
  },
  banner: {
    height: "420px",
    backgroundImage: "url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1470&auto=format&fit=crop')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(90deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0) 100%)", 
  },
  bannerContainer: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1140px",
    margin: "0 auto",
    width: "100%",
    padding: "0 20px",
  },
  bannerText: {
    fontSize: "46px",
    fontWeight: "800",
    lineHeight: "1.25",
    color: "#ffffff",
    margin: "0 0 16px 0",
    letterSpacing: "-1px",
  },
  highlightText: {
    color: "#ef4444",
  },
  bannerSubtitle: {
    color: "#cbd5e1",
    fontSize: "18px",
    margin: 0,
    fontWeight: "400",
  },
  searchWrapper: {
    maxWidth: "1140px",
    margin: "-50px auto 40px auto", 
    position: "relative",
    zIndex: 5,
    padding: "0 20px",
  },
  searchBox: {
    display: "flex",
    gap: "16px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    flexWrap: "wrap",
  },
  filterGroup: {
    flex: 1,
    minWidth: "200px",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  filterIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "16px",
    pointerEvents: "none",
  },
  select: {
    width: "100%",
    padding: "14px 16px 14px 40px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    color: "#0f172a",
    background: "#f8fafc",
    outline: "none",
    cursor: "pointer",
    appearance: "none", 
  },
  searchButton: {
    padding: "14px 32px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  mainContent: {
    maxWidth: "1140px",
    margin: "0 auto",
    padding: "0 20px 60px 20px",
  },
  noResult: {
    textAlign: "center",
    padding: "60px 0",
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
  },
  
  
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "48px",
  },
  pageButton: {
    padding: "10px 18px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  pageNumberButton: {
    width: "40px",
    height: "40px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#475569",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  activePageButton: {
    background: "#0f172a",
    color: "#ffffff",
    borderColor: "#0f172a",
  },
  disabledButton: {
    opacity: 0.4,
    cursor: "not-allowed",
    background: "#f1f5f9",
  },

  footer: {
    background: "#1e293b", 
    padding: "60px 20px",
    color: "#94a3b8",
  },
  footerContainer: {
    maxWidth: "1140px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
  },
  footerCol: {
    flex: "1 1 250px",
  },
  footerTitle: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 16px 0",
  },
  footerText: {
    margin: 0,
    lineHeight: "1.6",
    fontSize: "15px",
  },
  footerPhone: {
    color: "#ef4444",
    fontSize: "22px",
    fontWeight: "800",
    margin: "0 0 4px 0",
  },
  footerLink: {
    color: "#38bdf8",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  copyright: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
    fontSize: "14px",
    backgroundColor: "#0f172a",
    borderTop: "1px solid #334155",
  },
};

export default Home;