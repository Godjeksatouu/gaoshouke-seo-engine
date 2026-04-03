const AdSlot = ({ label = "Advertisement" }: { label?: string }) => (
  <div className="ad-slot my-6">
    <span>{label}</span>
  </div>
);

export default AdSlot;
