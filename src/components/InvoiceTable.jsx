import { useMemo, useState } from "react";

const InvoiceTable = ({ invoices, updateInvoice, handleDelete }) => {
  const [editedData, setEditedData] = useState({
    index: null,
    editData: {},
  });

  const handleEdit = (index, invoice) => {
    setEditedData({
      index: index,
      editData: invoice,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      editData: {
        ...editedData.editData,
        [name]: value,
      },
    });
  };
  const handleSave = () => {
    updateInvoice(editedData);
    setEditedData({
      index: null,
      editData: {},
    });
  };
  const handleCancel = () => {
    setEditedData({
      index: null,
      editData: {},
    });
  };

  useMemo(() => {
    const { qty, price, discountPercentage, taxPercentage } =
      editedData.editData;

    let totaltax = taxPercentage
      ? (price * qty - price * qty * (discountPercentage / 100)) *
        (taxPercentage / 100)
      : 0;
    let totalDiscount = discountPercentage
      ? price * qty * (discountPercentage / 100)
      : 0;

    setEditedData({
      ...editedData,
      editData: {
        ...editedData.editData,
        totalPrice: qty * price - totalDiscount + totaltax,
        discount: totalDiscount,
        tax: totaltax,
      },
    });
  }, [
    editedData.editData.price,
    editedData.editData.qty,
    editedData.editData.discountPercentage,
    editedData.editData.taxPercentage,
  ]);
  return (
    <>
      <div className="overflow-x-auto flex py-8">
        <div className="min-w-screen  flex mx-auto font-sans bg-white shadow-lg">
          <div className="w-full lg:w-5/6">
            <div className="bg-white rounded m-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-52">Quantity</th>
                    <th className="py-3 px-6 text-left w-52">Price</th>
                    <th className="py-3 px-6 text-left w-52">Discount %</th>
                    <th className="py-3 px-6 text-left w-52">Discount</th>
                    <th className="py-3 px-6 text-left w-52">Tax %</th>
                    <th className="py-3 px-6 text-left w-52">Tax</th>
                    <th className="py-3 px-6 text-left w-52">Total Price</th>
                    <th className="py-3 px-6 text-left w-52">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light bg-white w-full">
                  {invoices.map((invoice, index) => (
                    <tr
                      className=" text-gray-600 uppercase text-sm leading-normal bg-white w-full border"
                      key={index}
                    >
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index ? (
                          <input
                            type="number"
                            name="qty"
                            value={editedData.editData.qty}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          invoice.qty
                        )}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index ? (
                          <input
                            type="number"
                            name="price"
                            value={editedData.editData.price}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          invoice.price
                        )}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index ? (
                          <input
                            type="number"
                            name="discountPercentage"
                            value={editedData.editData.discountPercentage}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          invoice.discountPercentage || 0
                        )}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index
                          ? editedData.editData.discount
                          : invoice.discount}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index ? (
                          <input
                            type="number"
                            name="taxPercentage"
                            value={editedData.editData.taxPercentage}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          invoice.taxPercentage || 0
                        )}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index
                          ? editedData.editData.tax
                          : invoice.tax}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {" "}
                        {editedData.index === index
                          ? editedData.editData.totalPrice
                          : invoice.totalPrice}
                      </th>
                      <th className="py-3 px-6 text-left">
                        {editedData.index === index ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="mr-2 px-3 py-1 bg-green-500 text-white rounded w-16"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(index, invoice)}
                              className="mr-2 px-3 py-1 bg-blue-500 text-white rounded w-16"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTable;
