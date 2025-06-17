"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStorepaymentMutation } from "../../../../redux/features/CourseApi";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, CreditCard, Calendar, User, BookOpen, Banknote, Info } from "lucide-react";

const PaymentStatus = {
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
} as const;

function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<keyof typeof PaymentStatus>(PaymentStatus.PENDING);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [storepayment] = useStorepaymentMutation();
  const hasPosted = useRef(false);

  useEffect(() => {
    if (!reference || hasPosted.current) return;

    const verifyPayment = async () => {
      hasPosted.current = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        const response = await storepayment({ body: { reference } }).unwrap();
        console.log("Payment verification successful:", response);
        setPaymentData(response.data);
        setStatus(PaymentStatus.SUCCESS);
      } catch (error: any) {
        console.error("Payment verification failed:", error);
        setStatus(PaymentStatus.ERROR);
        setErrorMessage(
          error.data?.message ||
          error.message ||
          "An unexpected error occurred. Please try again later."
        );
      }
    };

    verifyPayment();
  }, [reference, storepayment]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100); // Assuming amount is in cents
  };

  const renderStatusIndicator = () => {
    switch (status) {
      case PaymentStatus.PENDING:
        return (
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Verifying Your Payment
            </h2>
            <p className="text-gray-600">
              This may take a few moments. Please don't close this page.
            </p>
          </div>
        );

      case PaymentStatus.SUCCESS:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Payment Successful!
              </h2>
              <p className="text-gray-600">
                Thank you for your purchase. You can now access your course materials.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">Order Summary</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {paymentData?.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">{paymentData?.metadata?.course_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">
                    {formatAmount(paymentData?.amount, paymentData?.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium">
                    {paymentData?.paid_at ? formatDate(paymentData.paid_at) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">
                    {paymentData?.channel} ({paymentData?.authorization?.card_type})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-4 w-full flex items-center justify-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Info className="w-4 h-4 mr-1" />
                {showDetails ? 'Hide details' : 'Show full payment details'}
              </button>
            </div>

            {/* Detailed Payment Information */}
            {showDetails && paymentData && (
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">
                        {paymentData.metadata?.user_name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">
                        {paymentData.customer?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-gray-600" />
                    Course Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Course ID</p>
                      <p className="font-medium">
                        {paymentData.metadata?.course_id || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">
                        {paymentData.metadata?.course_price ?
                          `$${paymentData.metadata.course_price}` : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Card Type</p>
                      <p className="font-medium capitalize">
                        {paymentData.authorization?.card_type || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Card Number</p>
                      <p className="font-medium">
                        **** **** **** {paymentData.authorization?.last4 || '****'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bank</p>
                      <p className="font-medium">
                        {paymentData.authorization?.bank || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p className="font-medium">
                        {paymentData.authorization?.exp_month && paymentData.authorization?.exp_year ?
                          `${paymentData.authorization.exp_month}/${paymentData.authorization.exp_year}` : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <Banknote className="w-5 h-5 mr-2 text-gray-600" />
                    Transaction Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Reference</p>
                      <p className="font-medium">
                        {paymentData.reference || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transaction Fee</p>
                      <p className="font-medium">
                        {paymentData.fees ?
                          formatAmount(paymentData.fees, paymentData.currency) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Date</p>
                      <p className="font-medium">
                        {paymentData.paid_at ? formatDate(paymentData.paid_at) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">IP Address</p>
                      <p className="font-medium">
                        {paymentData.ip_address || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.location.href = "/UserDashboard"}
                className="flex-1 px-6 py-2 bg-primary text-white rounded-md  transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push(`/UserDashboard`)}
                className="flex-1 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Access Course
              </button>
            </div>
          </div>
        );

      case PaymentStatus.ERROR:
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Payment Verification Failed
            </h2>
            <p className="text-gray-600 max-w-md">
              {errorMessage}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>

            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
        {renderStatusIndicator()}
      </div>
    </div>
  );
}

export default SuccessPage;