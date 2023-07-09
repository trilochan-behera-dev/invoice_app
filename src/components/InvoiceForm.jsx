import React from "react";

const InvoiceForm = ({ formData, handleChange, handleSubmit }) => {
  const {
    qty,
    price,
    discountPercentage,
    discount,
    taxPercentage,
    tax,
    totalPrice,
  } = formData;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-4 bg-white border shadow-lg p-8 "
      method="POST"
    >
      <div className="mb-4 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Qty
        </label>
        <input
          type="number"
          name="qty"
          value={qty}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Discount %
        </label>
        <input
          type="number"
          name="discountPercentage"
          value={discountPercentage || ""}
          onChange={handleChange}
          placeholder="Discount %"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Discount
        </label>
        <input
          type="number"
          name="discount"
          value={discount || ""}
          placeholder="Discount"
          className="w-full px-3 py-2 border rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tax %
        </label>
        <input
          type="number"
          name="taxPercentage"
          value={taxPercentage || ""}
          onChange={handleChange}
          placeholder="Tax %"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tax
        </label>
        <input
          type="number"
          name="tax"
          value={tax || ""}
          placeholder="Tax"
          className="w-full px-3 py-2 border rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Total Price
        </label>
        <input
          type="number"
          name="totalPrice"
          value={totalPrice || ""}
          placeholder="Total Price"
          className="w-full px-3 py-2 border rounded"
          disabled
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InvoiceForm;
