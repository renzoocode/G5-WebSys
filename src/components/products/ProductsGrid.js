"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/lib/api/products";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomModal from "@/components/ui/CustomModal";
import ProductForm from "@/components/products/ProductsForm";
import CustomButton from "@/components/ui/CustomButton";
import DeleteProduct from "@/components/products/ProductsDelete";

export default function ProductsGrid() {
  // ========================
  // Component State
  // ========================
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Modal states
  const [isProductModalFormOpen, setIsProductModalFormOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);

  // Form and selection state
  const [formData, setFormData] = useState(initialFormState());
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ========================
  // Helpers
  // ========================
  function initialFormState() {
    return {
      product_name: "",
      description: "",
      price: "",
      category: "",
      img_url: "",
      is_available: true,
    };
  }

  // ========================
  // API: Fetch Products
  // ========================
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data?.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ========================
  // API: Create Product
  // ========================
  const addProduct = async () => {
    try {
      await createProduct(formData);
      await loadProducts();
      setIsProductModalFormOpen(false);
      setFormData(initialFormState());
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  // ========================
  // API: Update Product
  // ========================
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct.id, formData);
      await loadProducts();
      setIsUpdateProductModalOpen(false);
      setFormData(initialFormState());
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  // ========================
  // API: Delete Product
  // ========================
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      await loadProducts();
      setIsDeleteProductModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // ========================
  // Modal Open/Close Handlers
  // ========================
  const openAddModal = () => {
    setFormData(initialFormState());
    setIsProductModalFormOpen(true);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsUpdateProductModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  const closeAllModals = () => {
    setIsProductModalFormOpen(false);
    setIsUpdateProductModalOpen(false);
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormState());
  };

  // ========================
  // Load products on mount
  // ========================
  useEffect(() => {
    loadProducts();
  }, []);

  // ========================
  // Derived Data: Filtered products
  // ========================
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((p) => {
        const name = (p.product_name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return name.includes(normalizedQuery) || desc.includes(normalizedQuery);
      })
    : products;

  // ========================
  // Loading UI
  // ========================
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // ========================
  // Main Render
  // ========================
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen text-gray-100 border-1 border-white rounded-2xl p-4">
      {/* Header */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-white">
        <CustomHeader
          label="G5-WebSys"
          button={{
            isVisible: true,
            label: "Add new product",
            onClick: openAddModal,
          }}
        />
  
        {/* Search Bar */}
        <div className="mt-4 mb-6">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search products by name or description..."
              className="w-full rounded-lg bg-gray-800/80 border border-gray-700 text-gray-100 placeholder-gray-400 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Showing {filteredProducts.length} of {products.length} items
          </div>
        </div>
  
        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-xl border border-gray-700 bg-gray-800 shadow-sm hover:shadow-lg hover:border-indigo-500 transition overflow-hidden"
            >
              {/* Product Image */}
              <img
                alt={product.product_name}
                src={product.img_url}
                className="aspect-square w-full object-cover group-hover:opacity-90 transition"
              />
  
              {/* Product Info */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-100 group-hover:text-indigo-400 transition">
                      {product.product_name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-base font-bold text-green-400 border border-green-600 bg-green-900/50 px-3 py-1 rounded-lg">
                    ${product.price}
                  </p>
                </div>
  
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <CustomButton
                    type="secondary"
                    label="Delete"
                    onClick={() => openDeleteModal(product)}
                  />
                  <CustomButton
                    label="Update"
                    onClick={() => openUpdateModal(product)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Add Product Modal */}
      <CustomModal
        label="Add new product"
        isOpen={isProductModalFormOpen}
        onClose={closeAllModals}
        content={
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onClick={addProduct}
            onClose={closeAllModals}
          />
        }
      />
  
      {/* Update Product Modal */}
      <CustomModal
        label="Update product"
        isOpen={isUpdateProductModalOpen}
        onClose={closeAllModals}
        content={
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onClick={handleUpdateProduct}
            onClose={closeAllModals}
          />
        }
      />
  
      {/* Delete Product Modal */}
      <CustomModal
        label="Confirm Delete"
        isOpen={isDeleteProductModalOpen}
        onClose={closeAllModals}
        content={
          <DeleteProduct
            productName={selectedProduct?.product_name}
            onConfirm={handleDeleteProduct}
            onCancel={closeAllModals}
          />
        }
      />
    </div>
  );
  
}
