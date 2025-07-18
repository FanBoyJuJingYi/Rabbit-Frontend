import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addProductStatus, addProductError } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    productData.category = productData.category.trim();
    productData.collections = productData.collections.trim();
    dispatch(addProduct(productData));
    navigate("/admin/products");
  };

  // Nếu thêm sản phẩm thành công thì redirect về trang quản lý
  useEffect(() => {
    if (addProductStatus === "succeeded") {
      navigate("/admin/products");
    }
  }, [addProductStatus, navigate]);

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Collections */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Collections</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes</label>
          <input
            type="text"
            name="sizes"
            value={(productData.sizes || []).join(", ")}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. S, M, L"
          />
        </div>
        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors</label>
          <input
            type="text"
            name="colors"
            value={(productData.colors || []).join(", ")}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. Red, Blue, Green"
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "Product Image"}
                className="w-20 h-20 object-cover rounded-md shadow-md"
              />
            ))}
          </div>
        </div>
        {/* Các trường khác nếu cần, ví dụ category, brand, material,... */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          disabled={addProductStatus === "loading"}
        >
          {addProductStatus === "loading" ? "Adding..." : "Add Product"}
        </button>
        {addProductError && (
          <p className="text-red-600 mt-2">Error: {addProductError}</p>
        )}
      </form>
    </div>
  );
};

export default AddProductPage;
