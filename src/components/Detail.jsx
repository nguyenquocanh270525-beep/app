import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCarById } from "../config/api";
import { useCart } from "./CartProvider";

function Detail() {
  const { id } = useParams();
  const car = getCarById(id);
  const { addToCart } = useCart();

  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Không tìm thấy xe</h2>;
  }

  return (
    <div style={styles.container}>
      <img src={car.image} alt={car.name} style={styles.image} />

      <div style={styles.info}>
        <h1>{car.name}</h1>
        <p><b>Hãng xe:</b> {car.brand}</p>
        <p><b>Năm sản xuất:</b> {car.year}</p>
        <p><b>Giá bán:</b> <span style={styles.price}>{car.priceText}</span></p>
        <p><b>Mô tả:</b> {car.description}</p>

        <button style={styles.button} onClick={() => addToCart(car)}>
          Thêm vào giỏ hàng
        </button>

        <Link to="/" style={styles.back}>← Quay về trang chủ</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "60px 80px"
  },
  image: {
    width: "50%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px"
  },
  info: {
    flex: 1,
    fontSize: "18px"
  },
  price: {
    color: "#e60000",
    fontWeight: "700"
  },
  button: {
    marginTop: "20px",
    padding: "14px 30px",
    backgroundColor: "#e60000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "700"
  },
  back: {
    display: "block",
    marginTop: "20px",
    color: "#222",
    textDecoration: "none"
  }
};

export default Detail;