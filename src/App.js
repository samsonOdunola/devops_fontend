import { useState, useEffect } from "react";
import Navigation from "./navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function App() {
  const [products, setAllProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        setAllProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <Navigation />
      <div className="hero"></div>
      {isLoading ? (
        <h1 className="loading">Loading, Please wait</h1>
      ) : (
        <div className="content">
          {products.map((product, index) => {
            return (
              <Card className="product" key={index} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  height="100px"
                  style={{ objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text style={{ height: "60%", overflow: "hidden" }}>
                    {product.description}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
