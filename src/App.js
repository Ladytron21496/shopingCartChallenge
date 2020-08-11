import React, { Componnet } from "react";
import { data } from "./testData";
import { Container, Row, Col, Table, Alert } from "react-bootstrap";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 8,
      alert: false,
      tprice: 2760,
      tdiscount: 100,
      data: data,
    };
  }

  handleCount = () => {
    let { data } = this.state;
    let qty = 0;
    for (let i = 0; i < data.length; i++) {
      qty = qty + data[i].qty;
    }
    this.setState({ qty });
  };

  onClose = () => {
    this.setState({ alert: false });
  };

  handleAlert = () => {
    return (
      <div
        style={{
          width: "50%",
          textAlign: "center",
          position: "relative",
          left: "20%",
        }}
      >
        <div>
          <Alert dismissible={true} onClose={this.onClose} variant={"danger"}>
            <p>Item Has Been Deleted From The Cart Successfully!</p>
          </Alert>
        </div>
      </div>
    );
  };

  handleDelete = (id) => {
    let { data } = this.state;
    data = data.filter((item) => {
      if (item.id !== id) {
        return true;
      }
    });
    this.setState({ data, alert: true, qty: this.state.qty - 1 }, () => {
      this.handlePrice();
      this.handleCount();
      this.handleDiscount();
    });
  };

  handleQty = (id, action) => {
    let { data } = this.state;
    if (action == "add") {
      data = data.map((item) => {
        if (item.id == id) {
          item.qty = item.qty + 1;
        }

        return {
          ...item,
        };
      });
      this.setState({ data });
    } else {
      data = data.map((item) => {
        if (item.id == id && item.qty !== 0) {
          item.qty = item.qty - 1;
        }

        return {
          ...item,
        };
      });
      this.setState({ data });
    }

    this.handlePrice();
    this.handleCount();
    this.handleDiscount();
  };

  handlePrice = () => {
    let { data } = this.state;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total = total + data[i].price * data[i].qty;
    }
    this.setState({ tprice: total });
  };

  handleDiscount = () => {
    let { data } = this.state;
    let totalDiscount = 0;
    for (let i = 0; i < data.length; i++) {
      totalDiscount = totalDiscount + data[i].discount * data[i].qty;
    }
    this.setState({ tdiscount: totalDiscount });
  };

  render() {
    let { tprice, tdiscount, qty } = this.state;
    let orderTotal = tprice - tdiscount;
    return (
      <div>
        {this.state.alert && this.handleAlert()}
        <Container>
          <Row>
            <Col lg={6}>
              <h1>{"< Order Summary"}</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Items {qty}</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            style={{ marginRight: "20px" }}
                            src={item.imgurl}
                          ></img>
                          {item.name}
                          <button
                            onClick={() => {
                              this.handleDelete(item.id);
                            }}
                            style={{ border: "none", float: "right" }}
                          >
                            X
                          </button>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <button
                              onClick={() => {
                                this.handleQty(item.id);
                              }}
                              style={{ outline: "none" }}
                            >
                              -
                            </button>

                            {item.qty}

                            <button
                              onClick={() => {
                                this.handleQty(item.id, "add");
                              }}
                              style={{ outline: "none" }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{item.price * item.qty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col>
              <div
                style={{
                  width: "300px",
                  height: "200px",
                  border: "1px solid gray",
                  position: "relative",
                  top: "60px",
                }}
              >
                <div>
                  <p>Total</p>
                </div>
                <div>
                  <div>
                    <p>
                      Items ({qty}){" "}
                      <span>
                        <p
                          style={{
                            float: "right",
                            position: "left",
                            right: "10px",
                          }}
                        >
                          {tprice}
                        </p>
                      </span>
                    </p>
                    <p>
                      Discount
                      <span>
                        <p
                          style={{
                            float: "right",
                            position: "left",
                            right: "10px",
                          }}
                        >
                          -{tdiscount}
                        </p>
                      </span>
                    </p>
                    <hr></hr>
                    <h5>
                      ORDER TOTAL
                      <span>
                        <p
                          style={{
                            float: "right",
                            position: "left",
                            right: "10px",
                          }}
                        >
                          {orderTotal}
                        </p>
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
