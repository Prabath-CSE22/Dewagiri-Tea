import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Check, MapPin, Truck, CreditCard, X, Package, Phone, Calendar, SquareUserRound, Mail } from "lucide-react";
import MsgBox from "./ui/msgBox";
import axios from "axios";

export default function OrderSum({ user_id, isClicked, setIsClicked, orderData }) {

    const router = useNavigate();
    const [random, setRandom] = useState(`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`);
    
    const [showMsg, setShowMsg] = useState(false);  // Changed to false initially
    const [msgConfig, setMsgConfig] = useState({ message: '', type: 'success' });
    const handleConfirm = async () => {
        const getTotal = await axios.post(`http://localhost:3001/totalprice`, {user_id: user_id});        
        const purchase = await axios.post('http://localhost:3001/purchase', {
            user_id: user_id,
            total: getTotal.data.total,
            invoice_num: random,
          });
          console.log(purchase.data);
          if(purchase.status === 200){
            const emptyCart = await axios.delete(`http://localhost:3001/removecartitems/${user_id}`);
            setMsgConfig({ message: emptyCart.data, type: 'success' });
            setShowMsg(true);
          }
        router('/orders');
        setIsClicked(!isClicked);
    };

    const formatDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3); // Estimated delivery in 3 days
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-emerald-50 p-6 border-b border-emerald-100">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-emerald-800">Order Summary</h2>
                        <button 
                            onClick={() => setIsClicked(!isClicked)}
                            className="p-2 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-emerald-600" />
                        </button>
                    </div>
                    <div className="mt-2 flex items-center text-emerald-600">
                        <Package className="w-4 h-4 mr-2" />
                        <span>Order {random}</span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Delivery Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center mb-3">
                                <SquareUserRound className="w-5 h-5 text-emerald-600 mr-2" />
                                <h3 className="font-semibold text-gray-800">Contact Information</h3>
                            </div>
                            <div className="space-y-1 text-gray-600 mb-3">
                                <p className="font-medium text-gray-800">{orderData.user.fullname}</p>
                                <div className="flex items-center mt-2 text-emerald-600">
                                    <Mail className="w-4 h-4 mr-2"  />
                                    <p>{orderData.user.email}</p>
                                </div>
                                <div className="flex items-center mt-2 text-emerald-600">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <p>0{orderData.user.phone_number}</p>
                                </div>
                            </div>
                    
                            <div className="flex items-center mb-3">
                                <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                                <h3 className="font-semibold text-gray-800">Delivery Address</h3>
                            </div>
                            
                            <div className="space-y-1 text-gray-600">
                                <p className="font-medium text-gray-800">{orderData.user.fullname},</p>
                                <p>{orderData.user.Address[0].street_line1}</p>
                                <p>{orderData.user.Address[0].street_line2}, {orderData.user.Address[0].city},</p>
                                <p> {orderData.user.Address[0].state}, {orderData.user.Address[0].country}.</p>
                                <p>{orderData.user.Address[0].ZIP_Number}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Delivery Method */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center mb-3">
                                    <Truck className="w-5 h-5 text-emerald-600 mr-2" />
                                    <h3 className="font-semibold text-gray-800">Delivery Method</h3>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Check className="w-4 h-4 text-emerald-600 mr-2" />
                                    <p>Door Delivery</p>
                                </div>
                                <div className="mt-2 flex items-center text-emerald-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <p className="text-sm">Estimated Delivery: {formatDate()}</p>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center mb-3">
                                    <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
                                    <h3 className="font-semibold text-gray-800">Payment Method</h3>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Check className="w-4 h-4 text-emerald-600 mr-2" />
                                    <p>Cash on Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4 pt-4 border-t">
                        <button
                            onClick={handleConfirm}
                            className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 
                                     transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <Check className="w-5 h-5" />
                            <span>Confirm Order</span>
                        </button>
                        <button
                            onClick={() => setIsClicked(!isClicked)}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 
                                     transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            {showMsg && <MsgBox message={msgConfig.message} type={msgConfig.type} onClose={() => setShowMsg(false)}/>}
        </div>
    );
}