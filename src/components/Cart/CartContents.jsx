import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productID: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 2,
      price: 19.99,
      image: "https://picsum.photos/200?radom=1",
    },
    {
      productID: 2,
      name: "Jeans",
      size: "32",
      color: "Blue",
      quantity: 1,
      price: 39.99,
      image: "https://picsum.photos/200?radom=2",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-b py-4"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
            <p className="font-medium">$ {product.price.toLocaleString()}</p>
            <button className="ml-4 text-red-600 hover:text-red-800">
              <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
