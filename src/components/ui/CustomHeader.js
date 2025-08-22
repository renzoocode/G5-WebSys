import CustomButton from "@/components/ui/CustomButton";

export default function CustomHeader(props) {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between rounded-xl border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg px-6 py-4">
        {/* Label */}
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {props.label}
        </h2>

        {/* Action Button */}
        {props.button.isVisible && (
          <CustomButton
            onClick={props.button.onClick}
            label={props.button.label}
          />
        )}
      </div>
    </div>
  );
}
