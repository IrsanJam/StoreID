import { FC, useEffect } from "react";
import { useState } from "react";
import { bankData } from "../../utils/payment";
import PaymentButton from "../../components/PaymentButton";
import { postPayment, showPayment } from "../../utils/interface";
import Swal from "sweetalert2";
import NumberFormatter from "../../components/NumberFormatter";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/functions";
import Header from "../../components/Product/Header";
import Footer from "../../components/Footer";
import { copyToClipboard } from "../../utils/functions";

const Payment: FC = () => {
  const username = Cookies.get("username");
  const navigate = useNavigate();
  const [showPayment, setShow] = useState<Boolean>(false);
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const [items, setItems] = useState([]);
  const [popupTimer, setPopupTimer] = useState<number>(24 * 60 * 60 * 1000);
  const authToken = Cookies.get("authToken");
  const [showData, setShowData] = useState<showPayment>({
    nama_lengkap: "",
    alamat: "",
    bank_account: "",
    va_number: "",
  });

  const location = useLocation();
  const [pembayaran, setPembayaran] = useState<postPayment>({
    nama_lengkap: "",
    alamat: "",
    bank_account: "",
  });

  const changeShow = () => {
    setShow(!showPayment);
  };

  const closePopup = () => {
    setShowPopup(!showPopup);
    navigate("/");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPembayaran((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentSelection = (selectedPayment: string) => {
    setPembayaran((prevData) => ({
      ...prevData,
      bank_account: selectedPayment,
    }));
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmation",
      text: `Lanjutkan Pembayaran`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(3 150 199)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .post("https://altalaptop.shop/payments", pembayaran, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            setShowData({
              nama_lengkap: response.data.data.nama_lengkap,
              alamat: response.data.data.alamat,
              bank_account: response.data.data.bank_account,
              va_number: response.data.data.va_number,
            });
            setShowPopup(!showPopup);
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal",
              text: `Transaksi Belum Bisa dilakukan, Coba sesaat lagi `,
              icon: "error",
              showCancelButton: true,
              confirmButtonText: "OK",
              cancelButtonText: "NO",
              confirmButtonColor: "rgb(3 150 199)",
            });
          });
      }
      if (popupTimer) {
        clearTimeout(popupTimer);
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPopupTimer((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [popupTimer]);

  useEffect(() => {
    const finalOrder = location.state?.finalOrder;
    if (finalOrder) {
      setItems(finalOrder.items);
    }
  }, [location.state, showData]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center pt-44 gap-8 font-Poppins">
        <div className="flex flex-col px-10 gap-3">
          <span className="text-3xl  text-[#484848] font-semibold md:text-4xl lg:text-4xl text-center font-Poppins">Pembayaran</span>
          <span className=" text-[#8A8A8A] text-center text-xs md:text-base">Lakukan Pembayaran produk yang diinginkan</span>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <div className="flex justify-center items-center gap-3 h-auto my-20 font-Poppins">
          <div className="flex flex-col justify-center gap-3">
            <span className="font-semibold md:text-base text-sm">Pengguna</span>
            <input
              required
              onChange={pembayaran.nama_lengkap ? handleChange : () => setPembayaran((prev) => ({ ...prev, nama_lengkap: `${username}` }))}
              name="nama_lengkap"
              value={pembayaran.nama_lengkap}
              type="text"
              className="p-2 bg-[#F6F6F6] rounded-md"
              placeholder="Masukan Nama Pengguna"
            />
            <span className="font-semibold md:text-base text-sm">Alamat</span>
            <input required onChange={handleChange} name="alamat" value={pembayaran.alamat} type="text" className="p-2 bg-[#F6F6F6] rounded-md" placeholder="Masukan Alamat" />
            <div className="flex justify-between">
              <span className="font-semibold md:text-base text-sm">Metode Pembayaran</span>
            </div>
            {pembayaran.bank_account ? (
              <div className="lg:w-[567px] w-[90vw] h-[106px] relative bg-white rounded shadow">
                <div className="left-[78px] top-[18.64px] absolute text-gray-600 text-[0.8rem] md:text-2xl font-bold font-Poppins leading-9">Bank Transfer Virtual Account</div>
                <div className="left-[78px] top-[50.81px] absolute text-neutral-300 text-xs md:text-base font-normal font-['Inter'] leading-relaxed">Proses otomatis dan lebih cepat</div>
                <img className="w-9 h-10 left-[18px] top-[28px] absolute rounded" src="https://image.shutterstock.com/image-vector/bank-icon-260nw-435428170.jpg" />
                <img onClick={changeShow} className="cursor-pointer w-[29px] h-[29px] right-4 md:left-[495px] top-[30px] absolute rounded" src="https://img.icons8.com/ios/50/expand-arrow--v2.png" />
              </div>
            ) : (
              <div className="lg:w-[567px] w-[90vw] h-[206px] relative bg-white rounded shadow">
                <div className="md:pl-[23px] p-2 md:pr-5 pt-[17.81px] pb-[15px] left-[19px] top-[21px] absolute bg-orange-100 rounded-[3px] shadow border border-zinc-400 justify-center items-start lg:gap-[187px] inline-flex">
                  <div className="text-amber-500 text-base font-normal font-['Inter'] leading-relaxed">Silakan pilih metode pembayaranmu</div>
                  <img className="w-7 h-7 rounded" src="https://img.icons8.com/?size=48&id=63263&format=png" />
                </div>
                <div className="left-[78px] top-[118.64px] absolute text-gray-600 text-[0.8rem] md:text-2xl font-bold font-Poppins leading-9">Bank Transfer Virtual Account</div>
                <div className="left-[78px] top-[159.81px] absolute text-neutral-300 text-xs md:text-base font-normal font-['Inter'] leading-relaxed">Proses otomatis dan lebih cepat</div>
                <img className="w-9 h-10 left-[18px] top-[118px] absolute rounded" src="https://image.shutterstock.com/image-vector/bank-icon-260nw-435428170.jpg" />
                <img onClick={changeShow} className="cursor-pointer w-[15px] md:w-[29px] h-[15px] md:h-[29px] right-4 md:left-[495px] top-[137px] absolute rounded" src="https://img.icons8.com/ios/50/expand-arrow--v2.png" />
              </div>
            )}
            {showPayment &&
              bankData.banks.map((item: any) => {
                return <PaymentButton key={item.name} name={"bankPayment"} value={item.name} gambar={item.gambar} onSelection={() => handlePaymentSelection(item.name)} />;
              })}

            <span className="font-semibold md:text-base text-sm mt-5">Ringkasan Pembayaran</span>
            {items.map((item: any) => {
              return (
                <>
                  <hr className="w-full" />
                  <div className="flex gap-5 items-center justify-between ">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm">{item.model}</span>
                      <span className="font-bold text-sm">{item.quantity}x</span>
                    </div>
                  </div>
                </>
              );
            })}
            <div>
              <span className="text-sm font-bold">Total Bayar : </span>
              <span className="font-bold text-lg text-red-500">
                <NumberFormatter value={location.state.total} />
              </span>
            </div>
            <button className="flex justify-center items-center" type="submit">
              <div className="flex justify-center items-center my-10 font-semibold bg-sky-600 w-full md:w-1/2 text-white py-2.5 rounded-md">Lanjutkan Pembayaran</div>
            </button>
          </div>
        </div>
      </form>

      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 font-Poppins">
            <div className="bg-white w-96 p-8 mx-5 rounded shadow-lg">
              <p className="my-2 text-2xl font-semibold text-blue-700">Detail Pembayaran</p>
              <p className="my-2 text-sm">Nama: {showData.nama_lengkap}</p>
              <hr />
              <p className="my-2 text-sm">Alamat: {showData.alamat}</p>
              <hr />
              <p className="my-2 text-sm">Metode Pembayaran: {showData.bank_account}</p>
              <hr />
              <p className="my-2 text-sm font-semibold">
                Total Pembayaran:{" "}
                <span className="font-bold text-lg">
                  <NumberFormatter value={location.state.total} />
                </span>
              </p>
              <div className="mb-4 bg-orange-200 p-3 flex items-center justify-between rounded text-lg font-bold">
                <span> Kode VA : {showData.va_number}</span>
                <img className="cursor-pointer h-[20px] w-[20px]" width="24" height="24" src="https://img.icons8.com/material-sharp/24/copy.png" alt="copy" onClick={() => copyToClipboard(showData.va_number)} />
              </div>
              <p className="my-2 text-sm flex justify-end"> Waktu Tersisa: {formatTime(popupTimer)}</p>
              <div className="flex gap-3">
                <button className="bg-gray-500 text-white px-4 py-2 mt-5 rounded hover:bg-gray-600" onClick={closePopup}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Payment;
