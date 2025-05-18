
import { Product } from '../components/inventory/ProductTable';

// Sample data for dashboard stats
export const statsData = [
  {
    title: "Total Products",
    value: "2,856",
    change: 8.2,
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "$45,231",
    change: 5.1,
    trend: "up",
  },
  {
    title: "Active Inventory",
    value: "1,203",
    change: 2.5,
    trend: "down",
  },
  {
    title: "Low Stock Items",
    value: "32",
    change: 12.5,
    trend: "up",
  },
];

// Sample data for line chart
export const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
  { month: "Aug", sales: 6500 },
  { month: "Sep", sales: 8000 },
  { month: "Oct", sales: 7500 },
  { month: "Nov", sales: 9000 },
  { month: "Dec", sales: 10000 },
];

// Sample data for bar chart
export const categoryData = [
  { name: "Electronics", count: 152 },
  { name: "Furniture", count: 87 },
  { name: "Clothing", count: 243 },
  { name: "Kitchen", count: 118 },
  { name: "Sports", count: 65 },
  { name: "Books", count: 42 },
];

// Sample data for pie chart
export const inventoryStatusData = [
  { name: "In Stock", value: 1203 },
  { name: "Low Stock", value: 32 },
  { name: "Out of Stock", value: 18 },
];

// Sample products data
export const productData: Product[] = [
  {
    id: "1",
    name: "Apple MacBook Pro 16\"",
    category: "Electronics",
    price: 2399.99,
    stock: 34,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    category: "Electronics",
    price: 799.99,
    stock: 56,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 299.99,
    stock: 12,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Standing Desk",
    category: "Furniture",
    price: 499.99,
    stock: 8,
    status: "In Stock",
  },
  {
    id: "5",
    name: "Winter Jacket",
    category: "Clothing",
    price: 149.99,
    stock: 25,
    status: "In Stock",
  },
  {
    id: "6",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "7",
    name: "Smart Watch",
    category: "Electronics",
    price: 249.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "8",
    name: "Kitchen Mixer",
    category: "Kitchen",
    price: 299.99,
    stock: 15,
    status: "In Stock",
  },
  {
    id: "9",
    name: "Yoga Mat",
    category: "Sports",
    price: 29.99,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "10",
    name: "Bestseller Novel",
    category: "Books",
    price: 19.99,
    stock: 42,
    status: "In Stock",
  },
  {
    id: "11",
    name: "4K Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 18,
    status: "In Stock",
  },
  {
    id: "12",
    name: "Gaming Mouse",
    category: "Electronics",
    price: 89.99,
    stock: 29,
    status: "In Stock",
  },
  {
    id: "13",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "14",
    name: "Coffee Table",
    category: "Furniture",
    price: 199.99,
    stock: 7,
    status: "Low Stock",
  },
  {
    id: "15",
    name: "Electric Kettle",
    category: "Kitchen",
    price: 49.99,
    stock: 23,
    status: "In Stock",
  },
];
