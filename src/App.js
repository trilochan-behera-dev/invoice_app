import { useMemo, useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTable from "./components/InvoiceTable";

const App = () => {
  // useState hook for storing the form value
  const [formData, setFormData] = useState({
    qty: "",
    price: "",
    discountPercentage: "",
    discount: "",
    taxPercentage: "",
    tax: "",
    totalPrice: "",
  });

  // invoiceData state used for storing all the data created by user and also added feature for getting data from localstorage to not clearing data if the user is referesh the page
  const [invoiceData, setInvoiceData] = useState(
    JSON.parse(localStorage.getItem("invoiceData")) || []
  );

  // handlechange function used for setting the form data value
  const handleChange = (e) => {
    let targetValue = e.target.value;
    if (
      ["discountPercentage", "taxPercentage"].includes(e.target.name) &&
      parseInt(e.target.value) > 100
    ) {
      alert(
        `Can't be ${
          e.target.name == "taxPercentage" ? "Tax %" : "Discount %"
        } value greater than 100%`
      );
      targetValue = parseInt(
        e.target.value.toString().substring(0, e?.target?.value?.length - 1)
      );
    }
    setFormData({
      ...formData,
      [e.target.name]: targetValue,
    });
  };

  // handle Submit used for create a new data grid
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

  /// updateInvoice used for update a new row
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

  ///deleteInvoice is used for delete a row
  const deleteInvoice = (index) => {
    const newdata = invoiceData.filter((obj, i) => i !== index);
    setInvoiceData(newdata);
    localStorage.setItem("invoiceData", JSON.stringify(newdata));
  };


  /// usememo is used for memorized the value and check if the depend value chaange the update the corresponding value.
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
      <p className="text-center text-lg uppercase font-bold py-4 bg-blue-200">
        React Invoice App
      </p>
      <InvoiceForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {invoiceData.length ? (
        <InvoiceTable
          invoices={invoiceData}
          updateInvoice={updateInvoice}
          deleteInvoice={deleteInvoice}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
