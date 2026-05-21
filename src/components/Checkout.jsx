import React, { useState } from "react";
import { useCart } from "./CartProvider";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name === "" || phone === "") {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại!");
      return;
    }

    alert("Đặt mua thành công! Nhân viên AutoCar sẽ liên hệ với bạn.");
    clearCart();
    setName("");
    setPhone("");
  };

  return (
    <div style={styles.container}>
      <h1>Thanh toán</h1>

      {cart.length === 0 ? (
        <p>Không có xe nào trong giỏ hàng.</p>
      ) : (
        <>
          <h3>Thông tin xe đặt mua:</h3>

          {cart.map((car) => (
            <p key={car.id}>
              {car.name} - <b style={styles.price}>{car.priceText}</b>
            </p>
          ))}

          <div style={styles.form}>
            <input
              style={styles.input}
              type="text"
              placeholder="Nhập họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={styles.input}
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button style={styles.button} onClick={handleSubmit}>
              Xác nhận đặt mua
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "50px 80px"
  },
  form: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px"
  },
  input: {
    padding: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px"
  },
  button: {
    padding: "14px",
    backgroundColor: "#e60000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "700",
    cursor: "pointer"
  },
  price: {
    color: "#e60000"
  }
};

export default Checkout;