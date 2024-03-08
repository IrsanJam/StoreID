import NumberFormatter from "../NumberFormatter";
import { FC, useEffect, useState } from "react";
import keranjangIcon from "../../img/Keranjang.svg";
import { productDataType } from "../../utils/interface";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Card: FC<productDataType> = (props: productDataType) => {
  const { model, price, processor, cekProduk, allData, gambar, id, brand } = props;
  const navigate = useNavigate();
  const username = Cookies.get("username");
  const [hidden, setHidden] = useState(false);
  const authToken = Cookies.get("authToken");

  const addCart = (data: any, id: any) => {
    const totalPrice = price;
    const updateData = { ...data, totalPrice, quantity: 1 };
    if (username) {
      try {
        axios
          .post(`https://altalaptop.shop/shopping-cart?productId=${id}`, updateData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            Swal.fire({
              title: "Berhasil",
              text: `Barang ditambahkan ke keranjang`,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(3 150 199)",
            }).then((res) => {
              if (res.isConfirmed) {
                navigate("/cart");
              }
            });
          });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Swal.fire({
        title: "Konfirmasi",
        text: `Sebelum membeli Barang, anda Harus Login Dulu`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "No",
        confirmButtonColor: "rgb(3 150 199)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    const call = async () => {
      if (username) {
        const userIdToko = await axios.get(`https://altalaptop.shop/stores`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const userId = await axios.get(`https://altalaptop.shop/users`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (userIdToko && userIdToko.data.data[0].UserID === userId.data.data.UserID) {
          setHidden(true);
        }
      }
    };

    call();
  }, []);

  return (
    <>
      <div id={`card-${id}`} className="flex flex-col justify-center items-start shadow-md border-2  border-b-zinc-600 rounded-md md:p-5 p-3 font-Poppins gap-2">
        <img id={`image-${id}`} src={`${gambar ? gambar : `https://via.placeholder.com/250`}`} alt="image" width={"200px"} className="h-full rounded-md" />
        <span id={`model-${id}`} className="font-bold text-sm font-Poppins">{`${brand} ${model}`}</span>
        <span id={`details-${id}`} className="text-xs">{`${processor} `}</span>
        <NumberFormatter value={price} />
        <div className="flex justify-center items-center w-full md:gap-5 gap-3">
          <button onClick={cekProduk} id={`view-product-${id}`} className="w-[80%] lg:text-base text-xs py-2 bg-[#0396C7] text-white rounded-md">
            Lihat Produk
          </button>

          <button onClick={() => addCart(allData, id)} id={`add-to-cart-${id}`} className={!hidden ? "" : `w-[20%] bg-slate-300 md:py-2 py-[3px] rounded-md flex justify-center items-center`}>
            <img src={keranjangIcon} className="w-10 p-1  md:w-6 md:p-[0.3px]" />
          </button>
        </div>
      </div>
    </>
  );
};
export default Card;
