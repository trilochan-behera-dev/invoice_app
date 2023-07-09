// App.js
import { useMemo, useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTable from "./components/InvoiceTable";

const App = () => {
  const [formData, setFormData] = useState({
    qty: "",
    price: "",
    discountPercentage: "",
    discount: "",
    taxPercentage: "",
    tax: "",
    totalPrice: "",
  });
  const [invoiceData, setInvoiceData] = useState(
    JSON.parse(localStorage.getItem("invoiceData")) || []
  );

  const handleChange = (e) => {
    if (
      (e.target.name === "discountPercentage" &&
        parseInt(e.target.value) > 100) ||
      (e.target.name === "taxPercentage" && parseInt(e.target.value) > 100)
    ) {
      alert(
        `Can't be ${
          e.target.name == "taxPercentage" ? "Tax %" : "Discount %"
        } value greater than 100%`
      );
      setFormData({
        ...formData,
        [e.target.name]: parseInt(
          e.target.value.toString().substring(0, e?.target?.value?.length - 1)
        ),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value ? parseInt(e.target.value) : 0,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = formData;
    setInvoiceData([...invoiceData, invoice]);
    localStorage.setItem(
      "invoiceData",
      JSON.stringify([...invoiceData, invoice])
    );
    setFormData({
      qty: "",
      price: "",
      discountPercentage: "",
      discount: "",
      taxPercentage: "",
      tax: "",
      totalPrice: "",
    });
  };

  const updateInvoice = (updatedData) => {
    const newdata = invoiceData.map((obj, index) => {
      if (updatedData?.index === index) {
        return { ...obj, ...updatedData.editData };
      }
      return obj;
    });
    setInvoiceData(newdata);
    localStorage.setItem("invoiceData", JSON.stringify(newdata));
  };

  const handleDelete = (index) => {
    const newdata = invoiceData.filter((obj, i) => i !== index);
    setInvoiceData(newdata);
    localStorage.setItem("invoiceData", JSON.stringify(newdata));
  };

  useMemo(() => {
    const { qty, price, discountPercentage, taxPercentage } = formData;
    let totaltax = taxPercentage
      ? (price * qty - price * qty * (discountPercentage / 100)) *
        (taxPercentage / 100)
      : 0;
    let totalDiscount = discountPercentage
      ? price * qty * (discountPercentage / 100)
      : 0;
    setFormData({
      ...formData,
      totalPrice: price * qty - totalDiscount + totaltax,
      discount: totalDiscount,
      tax: totaltax,
    });
  }, [
    formData.price,
    formData.qty,
    formData.taxPercentage,
    formData.discountPercentage,
  ]);

  return (
    <div>
      <p className="text-center text-lg uppercase font-bold py-4 bg-blue-200">React Invoice App</p>
      <InvoiceForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {invoiceData.length ? (
        <InvoiceTable
          invoices={invoiceData}
          updateInvoice={updateInvoice}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
