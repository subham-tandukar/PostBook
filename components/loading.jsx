import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src="/assets/icons/loading.gif"
        alt="loading"
        width={60}
        height={60}
      />
    </div>
  );
};

export default Loading;
