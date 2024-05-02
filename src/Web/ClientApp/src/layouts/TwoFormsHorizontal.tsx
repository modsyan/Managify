export const TwoFormsHorizontal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex gap-6 p-4 bg-gray-50 ring-[1px] ring-gray-300 rounded-lg shadow-lg">
      {children}
    </main>
  );
};
