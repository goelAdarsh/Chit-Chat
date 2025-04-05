type ConnectionStatusProps = {
  status: string;
};

export default function ConnectionStatus({ status }: ConnectionStatusProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        status === "Connected"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  );
}
