import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      <h1>Giỏ hàng</h1>

      {cart.length === 0 ? (
        <p>Giỏ hàng chưa có xe nào.</p>
      ) : (
        <>
          {cart.map((car) => (
            <div style={styles.item} key={car.id}>
              <img src={car.image} alt={car.name} style={styles.image} />

              <div style={styles.info}>
                <h3>{car.name}</h3>
                <p>Hãng xe: {car.brand}</p>
                <p>Năm sản xuất: {car.year}</p>
                <p>Giá bán: <b style={styles.price}>{car.priceText}</b></p>
              </div>

              <button
                style={styles.deleteButton}
                onClick={() => removeFromCart(car.id)}
              >
                Xóa
              </button>
            </div>
          ))}

          <h2>Tổng tiền: <span style={styles.price}>{total} triệu</span></h2>

          <Link to="/checkout">
            <button style={styles.checkoutButton}>Thanh toán</button>
          </Link>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "50px 80px"
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px"
  },
  image: {
    width: "220px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "8px"
  },
  info: {
    flex: 1
  },
  price: {
    color: "#e60000"
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#e60000",
    border: "1px solid #e60000",
    borderRadius: "5px",
    cursor: "pointer"
  },
  checkoutButton: {
    padding: "14px 35px",
    backgroundColor: "#e60000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default Cart;