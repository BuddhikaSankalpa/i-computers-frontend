import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const sampleProducts = [
	{
		productId: "PRD001",
		name: "NVIDIA GeForce RTX 4060 8GB",
		altNames: ["RTX 4060", "GeForce RTX 4060", "4060 8GB"],
		price: 145000,
		labelledPrice: 155000,
		description: "Mid-range graphics card suitable for 1080p and 1440p gaming.",
		images: [
			"/images/products/rtx4060-front.png",
			"/images/products/rtx4060-back.png",
		],
		brand: "NVIDIA",
		model: "GeForce RTX 4060 8GB",
		category: "Graphics Card",
		isAvailable: true,
		stock: 12,
	},
	{
		productId: "PRD002",
		name: "AMD Ryzen 5 7600 Processor",
		altNames: ["Ryzen 5 7600", "AMD 7600", "R5 7600"],
		price: 72000,
		labelledPrice: 79000,
		description:
			"6-core 12-thread desktop processor with excellent gaming performance.",
		images: [
			"/images/products/ryzen5-7600-1.png",
			"/images/products/ryzen5-7600-2.png",
		],
		brand: "AMD",
		model: "Ryzen 5 7600",
		category: "Processor",
		isAvailable: true,
		stock: 20,
	},
	{
		productId: "PRD003",
		name: "Intel Core i7-14700K",
		altNames: ["Core i7-14700K", "i7 14700K", "Intel i7 14th Gen"],
		price: 128000,
		labelledPrice: 138000,
		description:
			"High-performance 14th Gen Intel processor for gaming and productivity workloads.",
		images: [
			"/images/products/i7-14700k-1.png",
			"/images/products/i7-14700k-2.png",
		],
		brand: "Intel",
		model: "Core i7-14700K",
		category: "Processor",
		isAvailable: true,
		stock: 8,
	},
	{
		productId: "PRD004",
		name: "Corsair Vengeance 16GB DDR5 RAM",
		altNames: ["16GB DDR5", "Corsair 16GB RAM", "Vengeance DDR5 16GB"],
		price: 24500,
		labelledPrice: 27000,
		description: "High-speed DDR5 memory module ideal for modern desktops.",
		images: [
			"/images/products/corsair-ddr5-1.png",
			"/images/products/corsair-ddr5-2.png",
		],
		brand: "Corsair",
		model: "Vengeance DDR5 16GB 5600MHz",
		category: "RAM",
		isAvailable: true,
		stock: 30,
	},
	{
		productId: "PRD005",
		name: "Samsung 990 PRO 1TB NVMe SSD",
		altNames: ["990 PRO 1TB", "Samsung NVMe 1TB", "Samsung SSD 1TB"],
		price: 39500,
		labelledPrice: 43000,
		description:
			"High-speed PCIe 4.0 NVMe SSD for fast boot times and application loading.",
		images: [
			"/images/products/samsung-990pro-1.png",
			"/images/products/samsung-990pro-2.png",
		],
		brand: "Samsung",
		model: "990 PRO 1TB",
		category: "Storage",
		isAvailable: true,
		stock: 18,
	},
	{
		productId: "PRD006",
		name: "ASUS TUF Gaming B650-PLUS WiFi Motherboard",
		altNames: ["B650 Motherboard", "ASUS B650", "TUF B650 WiFi"],
		price: 89000,
		labelledPrice: 96000,
		description:
			"AM5 motherboard with WiFi support, suitable for Ryzen 7000 series processors.",
		images: [
			"/images/products/asus-b650-1.png",
			"/images/products/asus-b650-2.png",
		],
		brand: "ASUS",
		model: "TUF Gaming B650-PLUS WiFi",
		category: "Motherboard",
		isAvailable: true,
		stock: 10,
	},
];

export default function AdminProductsPage() {
	const [products, setProducts] = useState(sampleProducts);

	return (
		<div className="w-full h-full ">
			{products.map(
                (product, index) => {
				// toast.success(product.productId + "-" + index);

				return (
					<div key={product.productId}>{/*unique key should be add, we acan use index also*/}
						<p>
							{product.productId} - {product.name} - {product.price}
						</p>
					</div>
				);
			})}
			
			<Link
				to="/admin/add-product"
				className="bg-accent w-[80px] h-[80px] rounded-full text-white text-2xl flex justify-center items-center fixed bottom-4 right-4 shadow-2xl hover:bg-white hover:text-accent"
			>
				<FaPlus />
			</Link>
		</div>
	);
}
