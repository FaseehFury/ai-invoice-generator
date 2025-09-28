import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Edit,
  Loader2,
  Mail,
  Printer,
  TableRowsSplit,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import CreateInvoice from "./CreateInvoice";
import ReminderModal from "../../components/invoices/ReminderModal";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.INVOICE.GET_INVOICE_BY_ID(id)
        );
        setInvoice(response.data);
      } catch (err) {
        toast.error("Failed to fetch invoice.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.INVOICE.UPDATE_INVOICE(id),
        formData
      );
      toast.success("Invoice updated successfully!");
      setIsEditing(false);
      setInvoice(response.data);
    } catch (error) {
      toast.error("Failed to update invoice.");
      console.error(error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-90">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          Invoice Not found
        </h3>
        <p className="text-slate-500 mb-6 max-w-md">
          The invoice you are looking for does not exist or could not be loaded.
        </p>
        <Button onClick={() => navigate("/invoices")}>
          Back to All Invoices
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return <CreateInvoice existingInvoice={invoice} onSave={handleUpdate} />;
  }
  return (
    <>
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        invoiceId={invoice._id}
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 print:hidden">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
          Invoice{" "}
          <span className="font-mono text-slate-500">
            {invoice.invoiceNumber}
          </span>
        </h1>
        <div className="flex items-center gap-2">
          {invoice.status !== "Paid" && (
            <Button
              variant="secondary"
              onClick={() => setIsReminderModalOpen(true)}
              icon={Mail}
            >
              Generate Reminder
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
            icon={Edit}
          >
            Edit
          </Button>

          <Button variant="primary" onClick={handlePrint} icon={Printer}>
            Print or Download
          </Button>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetail;
