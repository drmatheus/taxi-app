const Container = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="w-full max-w-7xl mx-auto border-2 px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3 lg:grid-cols-4 ">
      {children}
    </div>
  );
};

export default Container;
