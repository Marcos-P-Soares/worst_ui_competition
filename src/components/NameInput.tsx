import { useState } from 'react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export default function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Por favor, insira seu nome!');
    } else {
      onSubmit(name); 
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
      <label htmlFor="name" className="text-yellow-300 text-xl mb-2">
        Insira seu nome (ou não):
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 border-gray-500 p-2 bg-transparent text-white w-full"
        placeholder="Digite seu nome aqui"
      />
      <button type="submit" className="bg-red-600 text-white p-2 mt-4">
        Enviar (se você quiser)
      </button>
    </form>
  );
}
