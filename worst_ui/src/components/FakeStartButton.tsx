interface FakeStartButtonProps {
  onCaptchaOpen: () => void;
}

export default function FakeStartButton({ onCaptchaOpen }: FakeStartButtonProps) {
  return (
    <button
      onClick={onCaptchaOpen}
      className="text-3xl font-bold text-white bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-10"
    >
      Iniciar
    </button>
  );
}
