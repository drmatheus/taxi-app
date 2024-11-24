const Stars = ({ stars }: { stars: number }) => {
  const fillPercentage = (stars / 5) * 100;
  return (
    <span
      className="relative inline-block text-gray-300 text-[18px] leading-[0.8]"
      aria-label="Estrelas"
      title={`${stars} estrela${stars > 1 ? 's' : ''}`}
    >
      <span
        className="absolute top-0 left-0 whitespace-nowrap overflow-hidden text-yellow-400"
        style={{ width: `${fillPercentage}%` }}
      >
        ★★★★★
      </span>
      ★★★★★
    </span>
  );
};

export default Stars;
