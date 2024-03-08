import axios from "axios";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar: FC = () => {
  const authToken = Cookies.get("authToken");
  const username = Cookies.get("username");
  const gambar = Cookies.get("gambar");
  const navigate = useNavigate();
  const [showHamMenu, setShowHam] = useState<Boolean>(false);
  const [hidden, setHidden] = useState<Boolean>(false);

  const logOut = (): void => {
    Swal.fire({
      title: "Confirmation",
      text: "Anda yakin ingin keluar",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(255 10 10)",
    }).then((res) => {
      if (res.isConfirmed) {
        Cookies.remove("username");
        navigate("/login");
      }
    });
  };

  const call = async () => {
    if (username) {
      try {
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

        if (userIdToko.data.data[0].UserID === userId.data.data.UserID) {
          setHidden(true);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {}, [username]);
  useEffect(() => {
    call();
  }, []);

  return (
    <div className="flex justify-between  fixed z-10 w-screen items-center px-12 md:px-28 py-2 md:py-0 bg-white shadow-sm h-[12vh] md:h-[20vh]">
      <h2 onClick={() => navigate("/")} className="cursor-pointer text-2xl md:text-4xl font-bold text-[#0396C7]">
        StoreID
      </h2>

      <div className="flex items-center gap-2 md:gap-10">
        <div className="items-center justify-end gap-5 flex">
          {username !== "admin" && (
            <p className="font-poppins font-normal text-lg hidden lg:block font-Poppins text-[#828282] cursor-pointer" onClick={() => navigate("/")}>
              Product
            </p>
          )}

          {username === "admin" || username ? (
            ""
          ) : username ? (
            <svg onClick={() => navigate("/cart")} className="cursor-pointer" width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7188 23.3125C11.7188 23.7761 11.5813 24.2292 11.3238 24.6146C11.0662 25 10.7002 25.3004 10.2719 25.4778C9.84365 25.6552 9.3724 25.7017 8.91776 25.6112C8.46311 25.5208 8.0455 25.2976 7.71772 24.9698C7.38994 24.642 7.16672 24.2244 7.07628 23.7697C6.98585 23.3151 7.03226 22.8438 7.20966 22.4156C7.38705 21.9873 7.68746 21.6213 8.07288 21.3637C8.45831 21.1062 8.91145 20.9688 9.375 20.9688C9.9966 20.9688 10.5927 21.2157 11.0323 21.6552C11.4718 22.0948 11.7188 22.6909 11.7188 23.3125ZM21.5625 20.9688C21.0989 20.9688 20.6458 21.1062 20.2604 21.3637C19.875 21.6213 19.5746 21.9873 19.3972 22.4156C19.2198 22.8438 19.1733 23.3151 19.2638 23.7697C19.3542 24.2244 19.5774 24.642 19.9052 24.9698C20.233 25.2976 20.6506 25.5208 21.1053 25.6112C21.5599 25.7017 22.0312 25.6552 22.4594 25.4778C22.8877 25.3004 23.2537 25 23.5113 24.6146C23.7688 24.2292 23.9062 23.7761 23.9062 23.3125C23.9062 22.6909 23.6593 22.0948 23.2198 21.6552C22.7802 21.2157 22.1841 20.9688 21.5625 20.9688ZM27.5941 6.85117L24.3961 17.2457C24.1919 17.9179 23.7764 18.5064 23.2113 18.9237C22.6462 19.3411 21.9615 19.5651 21.259 19.5625H9.71836C9.00575 19.5602 8.31308 19.327 7.74413 18.8979C7.17518 18.4688 6.7606 17.8669 6.5625 17.1824L2.55586 3.15625H1.40625C1.03329 3.15625 0.675604 3.00809 0.411881 2.74437C0.148158 2.48065 0 2.12296 0 1.75C0 1.37704 0.148158 1.01935 0.411881 0.755631C0.675604 0.491908 1.03329 0.34375 1.40625 0.34375H2.90859C3.41759 0.345322 3.91235 0.511893 4.31866 0.818474C4.72497 1.12506 5.02092 1.55512 5.16211 2.04414L6.01641 5.03125H26.25C26.4701 5.03123 26.6871 5.08287 26.8836 5.18201C27.0801 5.28115 27.2505 5.42502 27.3813 5.60205C27.512 5.77908 27.5994 5.98432 27.6364 6.20128C27.6733 6.41823 27.6589 6.64083 27.5941 6.85117ZM24.3457 7.84375H6.81914L9.26719 16.4102C9.29522 16.5082 9.35442 16.5943 9.43584 16.6557C9.51725 16.717 9.61643 16.7501 9.71836 16.75H21.259C21.3593 16.7502 21.4571 16.7182 21.5379 16.6587C21.6186 16.5992 21.6782 16.5154 21.7078 16.4195L24.3457 7.84375Z"
                fill="#0396C7"
              />
            </svg>
          ) : (
            <span onClick={() => navigate("/register")} className="md:mr-[10vw] mr-0 underline text-sm lg:text-lg font-bold text-[#0396C7] cursor-pointer">
              Sign Up
            </span>
          )}
        </div>

        {username === "admin" && showHamMenu && (
          <div className="bg-white ease-in duration-1000 transition-all p-4 absolute md:top-[20vh] top-[12vh] right-[0rem] border-[1.2px] shadow-md w-[50vw] md:w-[20vw]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center items-start w-full gap-3">
                <button onClick={() => navigate("/list-users")} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#272D2F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Daftar User
                </button>
                <button onClick={() => navigate("/history-order-all")} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                      stroke="#272D2F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Daftar Transaksi User
                </button>
                <button onClick={logOut} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.56 2.44L11.11 3.89C11.9912 4.42057 12.7203 5.16984 13.2266 6.06515C13.733 6.96046 13.9994 7.97142 14 9C14 10.5913 13.3679 12.1174 12.2426 13.2426C11.1174 14.3679 9.5913 15 8 15C6.4087 15 4.88258 14.3679 3.75736 13.2426C2.63214 12.1174 2 10.5913 2 9C2 6.83 3.16 4.94 4.88 3.88L3.44 2.44C2.3779 3.17279 1.50984 4.15277 0.910579 5.29555C0.311319 6.43832 -0.00117702 7.70963 3.33137e-06 9C3.33137e-06 11.1217 0.842858 13.1566 2.34315 14.6569C3.84344 16.1571 5.87827 17 8 17C10.1217 17 12.1566 16.1571 13.6569 14.6569C15.1571 13.1566 16 11.1217 16 9C16 6.28 14.64 3.88 12.56 2.44ZM9 0H7V10H9"
                      fill="#272D2F"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {username !== "admin" && showHamMenu && (
          <div className="bg-white ease-in duration-1000 transition-all p-4 absolute md:top-[20vh] top-[12vh] right-[0rem] border-[1.2px] shadow-md w-[50vw] md:w-[20vw]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center items-start w-full gap-3">
                <button onClick={() => navigate("/my-profile")} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#272D2F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Profil Saya
                </button>
                {!hidden ? (
                  <button id="profilTokoBtn" onClick={() => navigate("/create-toko")} className="text-[#828282] hover:text-[#0396C7] flex items-center gap-3 w-full">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                        stroke="#272D2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Buat Toko Saya
                  </button>
                ) : (
                  <button id="profilTokoBtn" onClick={() => navigate("/shop-profile")} className="text-[#828282] hover:text-[#0396C7] flex items-center gap-3 w-full">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                        stroke="#272D2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Toko Saya
                  </button>
                )}
                <button onClick={logOut} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.56 2.44L11.11 3.89C11.9912 4.42057 12.7203 5.16984 13.2266 6.06515C13.733 6.96046 13.9994 7.97142 14 9C14 10.5913 13.3679 12.1174 12.2426 13.2426C11.1174 14.3679 9.5913 15 8 15C6.4087 15 4.88258 14.3679 3.75736 13.2426C2.63214 12.1174 2 10.5913 2 9C2 6.83 3.16 4.94 4.88 3.88L3.44 2.44C2.3779 3.17279 1.50984 4.15277 0.910579 5.29555C0.311319 6.43832 -0.00117702 7.70963 3.33137e-06 9C3.33137e-06 11.1217 0.842858 13.1566 2.34315 14.6569C3.84344 16.1571 5.87827 17 8 17C10.1217 17 12.1566 16.1571 13.6569 14.6569C15.1571 13.1566 16 11.1217 16 9C16 6.28 14.64 3.88 12.56 2.44ZM9 0H7V10H9"
                      fill="#272D2F"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {username && (
          <div className="flex items-center gap-2 md:gap-5">
            <p className="text-base md:text-xl font-medium text-[#0396C7]">{username}</p>
            <img
              onClick={() => setShowHam(!showHamMenu)}
              className="cursor-pointer rounded-full w-8 h-8 md:w-12 md:h-12 object-cover shadow-md border-[2px] border-slate-400"
              src={
                gambar
                  ? gambar
                  : `data:image/png;base64,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`
              }
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
