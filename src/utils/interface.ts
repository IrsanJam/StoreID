import React from "react";

export interface LoginState {
  email: string;
  password: string;
  passwordVisible: boolean;
}

export interface registerType {
  nama_lengkap: string;
  username: string;
  password: string | number;
  showPassword: boolean;
  jenis_kelamin: string;
  email: string;
  nomor_hp: string;
}
export interface productDataType {
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  price: number;
  cekProduk: () => void;
  allData: any;
  gambar: string;
  id: string | number;
}

export interface lapData {
  data: [];
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  content: JSX.Element;
  svg: JSX.Element;
}

export interface setDataKu {
  data?: [];
}

export interface typeLaptopDetail {
  storage?: string;
  price?: number | any;
  ram?: string;
  description?: string;
  model?: string;
  gambar?: string;
  brand?: string;
  processor?: string;
  id?: number;
  total_price?: number;
  stock?: number;
  data?: any;
  ubah?: () => void;
  hapus?: () => void;
}

export interface CartType {
  productId: string;
  brand?: string;
  model?: string;
  quantity: number;
  price: number;
  totalPrice: number;
  gambar: string;
}

export interface CartState {
  items: CartType[];
  total: number;
  brand?: string;
  model?: string;
  qty?: number;
}
export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  content: JSX.Element;
  svg: JSX.Element;
}

export interface Product {
  id: string;
  nama: string;
  merek: string;
  jumlah_barang: number;
  harga_satuan: number;
  deskripsi_barang: string;
  username: string;
  gambar_barang: string;
}

export interface ProductItem {
  product_id: string;
  nama_produk: string;
  jumlah: number;
  harga_satuan: number;
  total_harga: number;
}

export interface OrderHistoryType {
  order_id: string;
  tanggal_pemesanan: string;
  total_pembayaran: number;
  status: string;
  item_produk: ProductItem[];
}

export interface typePayment {
  gambar: string;
  value: string;
  onSelection: (value: string) => void;
  name: string;
}

export interface postPayment {
  nama_lengkap: string;
  alamat: string;
  bank_account: string;
}

export interface userDataType {
  data: [];
}

export interface typeListUsers {
  id?: string | number;
  nama: string;
  no_hp: number;
  email: string;
  gambar?: string;
  username: string;
}

export interface MyProfile {
  id: string;
  title: string;
  subtitle: string;
  content: JSX.Element;
  svg: JSX.Element;
}

export interface ShopProfile {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  svg: React.ReactNode;
}

export interface NumberFormatterProps {
  value: number;
}

export interface FormDataObject {
  nama_lengkap: string;
  username: string;
  jenis_kelamin: string;
  email: string;
  nomor_hp: string;
  password: string;
  gambar?: string;
}

export interface FormDataProduct {
  brand: string;
  price: string;
  categories: string;
  description: string;
  stock: string;
  storage: string;
  ram: string;
  model: string;
  processor: string;
  gambar?: string;
}

export interface FormDataShop {
  nama_toko: string;
  alamat_toko: string;
}

export interface showPayment {
  nama_lengkap: string;
  alamat: string;
  bank_account: string;
  va_number: string;
}

export interface orders {
  brand?: string;
  ram?: string;
  storage?: string;
  jumlah?: string;
  totalAmount: number;
  data?: any;
  orderId: string;
}
