const NoHistory = () => {
  return (
    <div className="flex mt-4 shadow-md rounded-lg bg-gray-100 justify-center items-center h-[366px]  ">
      <div className="   p-6 h-fit  w-full text-center">
        <h1 className="text-blue-950 text-2xl font-bold mb-4">
          Nenhuma viagem encontrada 🚖
        </h1>
        <p className="text-gray-700 text-lg">
          Para fazer uma pesquisa, insira o{' '}
          <span className="font-semibold">ID do cliente</span> e, se quiser,
          filtre pelo <span className="font-semibold">ID do motorista</span>.
        </p>
        <p className="text-gray-700 text-lg mt-4">
          Listaremos todos os resultados aqui. 😊
        </p>
      </div>
    </div>
  );
};

export default NoHistory;
