import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Check, MapPin, Truck, CreditCard, X, Package, Phone, Calendar, SquareUserRound, Mail } from "lucide-react";
import MsgBox from "./ui/msgBox";
import axios from "axios";

export default function OrderSum({ user_id, isClicked, setIsClicked, orderData }) {
    const router = useNavigate();
    const [random, setRandom] = useState(`INV-${new Date().getFullYear()%100}${String(new Date().getTime()).slice(-5)}-${String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0')}`);
    const [showMsg, setShowMsg] = useState(false);
    const [msgConfig, setMsgConfig] = useState({ message: '', type: 'success' });
    const [cartItems, setCartItems] = useState([]);

    const handleConfirm = async () => {
        const getTotal = await axios.post(`http://localhost:3001/totalprice`, {user_id: user_id});        
        const purchase = await axios.post('http://localhost:3001/purchase', {
            user_id: user_id,
            total: getTotal.data.total,
            invoice_num: random,
        });
        if(purchase.status === 200){
            const emptyCart = await axios.delete(`http://localhost:3001/removecartitems/${user_id}`);
            setMsgConfig({ message: emptyCart.data, type: 'success' });
            setShowMsg(true);
        }
        router('/orders');
        setIsClicked(!isClicked);
    };

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const response = await axios.post(`http://localhost:3001/cart`, {user_id});
                setCartItems(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCartItems();
    }, []);

    const formatDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 border-b border-emerald-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-emerald-800">Order Summary</h2>
                            <div className="mt-2 flex items-center text-emerald-600 bg-white/50 w-fit px-3 py-1 rounded-full">
                                <Package className="w-4 h-4 mr-2" />
                                <span className="font-medium">{random}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsClicked(!isClicked)}
                            className="p-2 hover:bg-emerald-200/50 rounded-full transition-all duration-300"
                        >
                            <X className="w-5 h-5 text-emerald-600" />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="p-4">
                        <div className="flex flex-wrap gap-4">
                            {/* Left Column - Contact and Delivery Info */}
                            <div className="flex-1 min-w-[300px]">
                                {/* Contact Info */}
                                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                    <div className="flex items-center mb-2">
                                        <SquareUserRound className="w-5 h-5 text-emerald-600 mr-2" />
                                        <h3 className="font-semibold text-gray-800">Contact Information</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="font-medium text-gray-800">{orderData.user.fullname}</p>
                                        <div className="flex items-center text-emerald-600">
                                            <Mail className="w-4 h-4 mr-2" />
                                            <p className="text-gray-600">{orderData.user.email}</p>
                                        </div>
                                        <div className="flex items-center text-emerald-600">
                                            <Phone className="w-4 h-4 mr-2" />
                                            <p className="text-gray-600">0{orderData.user.phone_number}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                                        <h3 className="font-semibold text-gray-800">Delivery Address</h3>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p>{orderData.user.fullname}{orderData.user.fullname.includes(',') ? '' : ','}</p>
                                        <p>{orderData.user.Address[0].street_line1}{orderData.user.Address[0].street_line1.includes(',') ? '' : ','}</p>
                                        <p>{orderData.user.Address[0].street_line2}{orderData.user.Address[0].street_line2.includes(',') ? '' : ','} {orderData.user.Address[0].city}</p>
                                        <p>{orderData.user.Address[0].state}, {orderData.user.Address[0].country}</p>
                                        <p className="font-medium">{orderData.user.Address[0].ZIP_Number}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Column - Delivery and Payment */}
                            <div className="flex-1 min-w-[300px] space-y-4">
                                {/* Delivery Method */}
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <Truck className="w-5 h-5 text-emerald-600 mr-2" />
                                        <h3 className="font-semibold text-gray-800">Delivery Method</h3>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <div className="bg-emerald-100 p-1 rounded-full mr-2">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        <p className="text-sm">Door Delivery</p>
                                    </div>
                                    <div className="flex items-center text-emerald-600 bg-emerald-50 p-2 rounded-lg text-sm">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <p>Estimated: {formatDate()}</p>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
                                        <h3 className="font-semibold text-gray-800">Payment Method</h3>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <div className="bg-emerald-100 p-1 rounded-full mr-2">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        <p className="text-sm">Cash on Delivery</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="flex-1 min-w-[300px]">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-3">
                                        <Package className="w-5 h-5 text-emerald-600 mr-2" />
                                        <h3 className="font-semibold text-gray-800">Order Items ({cartItems.length})</h3>
                                    </div>
                                    <div className="max-h-[200px] overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-emerald-200">
                                        {cartItems.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 hover:bg-white rounded-lg mb-2">
                                                <div className="flex items-center space-x-3">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                                    <div className="text-sm">
                                                        <p className="font-medium text-gray-800">{item.name}</p>
                                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2 pt-3 border-t border-gray-200">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <p>Delivery Fee</p>
                                            <p>$2.00</p>
                                        </div>
                                        <div className="flex justify-between text-base font-semibold text-gray-800 pt-2 border-t border-gray-200">
                                            <p>Total</p>
                                            <p>${(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 2).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-4 mt-4 pt-4 border-t">
                            <button
                                onClick={handleConfirm}
                                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 
                                         transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Check className="w-5 h-5" />
                                <span className="font-medium">Confirm Order</span>
                            </button>
                            <button
                                onClick={() => setIsClicked(!isClicked)}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 
                                         transition-all duration-300 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showMsg && <MsgBox message={msgConfig.message} type={msgConfig.type} onClose={() => setShowMsg(false)}/>}
        </div>
    );
}