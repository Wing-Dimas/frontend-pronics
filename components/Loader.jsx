import { TailSpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <TailSpin
        height="80"
        width="80"
        color="#0082B4"
        ariaLabel="tail-spin-loading"
        radius="3"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
