const WelcomeCard = () => {
  return (
    <div className="flex shadow-md rounded-lg bg-gray-100 justify-center items-center h-[366px]  ">
      <div className="   p-6 h-fit  w-full text-center">
        <h1 className="text-blue-950 text-2xl font-bold mb-4">
          Bem-vindo ao Taxi App 🚖
        </h1>
        <p className="text-gray-700 text-lg">
          Para fazer uma corrida, insira o{' '}
          <span className="font-semibold">ID do cliente</span>, sua{' '}
          <span className="font-semibold">localização</span> e, por fim, seu{' '}
          <span className="font-semibold">destino</span>.
        </p>
        <p className="text-gray-700 text-lg mt-4">
          Listaremos todas as opções disponíveis aqui. 😊
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
