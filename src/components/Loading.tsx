export const Loading = () => {
  return (
    <div className="h-screen suspense w-full flex justify-center items-center">
      <ul>
        <li>
          <div className="suspense-loader">
            <div className="suspense-child" />
          </div>
        </li>
        <li>
          <div className="suspense-text" />
        </li>
      </ul>
    </div>
  );
};
