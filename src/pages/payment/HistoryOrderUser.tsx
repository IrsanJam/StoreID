import { useEffect, useState } from "react";
import { orders, typeLaptopDetail } from "../../utils/interface";
import axios from "axios";
import Cookies from "js-cookie";
import ProfileHistory from "../../components/Admin/ProfileHistory";
import { infoAlertFC } from "../../utils/functions";


const HistoryOrderUser = () => {
  const authToken = Cookies.get("authToken");
  const [dataUser, setDataUser] = useState<typeLaptopDetail>({
    data: [],
  });

  const cekData = async () => {
    try {
      const response = await axios.get("https://altalaptop.shop/orders", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setDataUser(response.data);
    } catch (error) {
      infoAlertFC("Warning", "Anda Belum Punya Riwayat Order", "warning");
    }
  };

  useEffect(() => {
    cekData();
  }, []);

  return (
    <>
      <div id="main-container" className="  flex flex-col pt-12 gap-8 font-Poppins">
        <div id="header-info" className="flex flex-col md:px-20 px-5">
          <span id="header-title" className="md:text-3xl text-2xl md:text-left text-center font-Poppins">
            Riwayat Pesanan
          </span>
          <span id="header-description" className="text-[#828282] text-xs md:text-base">
            Lihat informasi mengenai Riwayat saya
          </span>
        </div>

        <div id="users-container" className="flex justify-center items-center">
          <div id="users-list" className="flex flex-col lg:h-[60vh] h-[35vh] gap-5 mb-20 border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-full">
            {dataUser &&
              dataUser.data &&
              dataUser.data.length > 0 &&
              dataUser.data.map((item: orders, key: number) => <ProfileHistory key={key} orderId={item.orderId} storage={item.storage} totalAmount={item.totalAmount} ram={item.ram} brand={item.brand} jumlah={item.jumlah} />)}

            {(!dataUser || !dataUser.data || dataUser.data.length === 0) && (
              <div className="flex items-center w-full justify-center h-[20vh] md:h-40">
                <p className="text-2xl text-gray-500">Tidak ada data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryOrderUser;
