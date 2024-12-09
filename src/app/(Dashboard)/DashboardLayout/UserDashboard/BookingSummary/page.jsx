import { Button, Card } from "antd";
import VerificationFee from "../../TutorDashboard/Verification/verificationFee/page";


const Page = () => {
  // Default data for the booking summary
  const tutor = "Richardo Mathew";
  const sessions = 4;
  const costPerSession = 10.0;
  const schedule = ["Sat", "Sun", "Mon"];
  const repeat = "Don't repeat";
  const subTotal = 87.0;

  // Reusable summary row component
  const SummaryRow = ({ label, value }) => (
    <div className="flex  justify-between py-2 text-sm">
      <span className="text-[#344054] font-semibold">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );

  return (
    <div className="flex items-start justify-around space-x-2 bg-white p-6">
      <div className="border rounded-lg p-4 w-full mt-20">
        <h1 className="text-lg font-bold mb-4">Booking Summary</h1>
        <hr />
        <Card className="w-full  border-none mt-4">
          <div className="space-y-2">
            <SummaryRow label="Tutor" value={tutor} />
            <SummaryRow label="Session Booked:" value={`${sessions}x`} />
            <SummaryRow label="Cost per session" value={`€${costPerSession.toFixed(2)}`} />
            <SummaryRow label="Schedule" value={schedule.join(", ")} />
            <SummaryRow label="Repeat" value={repeat} />
            <div className="my-4 border-t border-gray-200" />
            <SummaryRow label="Sub-total:" value={`€${subTotal.toFixed(2)}`} />
            <div className="pt-2">
              <div className="flex justify-between text-base font-semibold">
                <span>Total:</span>
                <span>€{subTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Button>Cancel</Button>
      </div>
      <div className="w-full">
        <VerificationFee />
      </div>

   
    </div>
  );
};

export default Page;
