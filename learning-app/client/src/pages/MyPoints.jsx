import React, { useState, useEffect } from 'react';
import http from '../http'; 
import './MyPoints.css';

function MyPoints() {
  const [points, setPoints] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    http.get('/user/points')
      .then(response => {
        setPoints(response.data.points);
        setDiscount(response.data.discount);
      })
      .catch(error => {
        setMessage("Failed to fetch your points and discount. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const redeemCoupon = () => {
    setIsLoading(true);
    http.post('/coupon/redeem-coupon', { couponCode })
      .then(response => {
        setMessage(response.data.message);
        setPoints(response.data.points);
      })
      .catch(error => {
        setMessage("Failed to redeem the coupon. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const redeemDiscount = (percentage, cost) => {
    if (points < cost) {
      setMessage("Not enough points.");
      return;
    }
  
    if (discount > 0) {
      const isConfirmed = window.confirm("You already have a discount. Would you still like to redeem a new discount?");
      if (!isConfirmed) {
        return;  // Exit the function if the user cancels
      }
    }
    
    setIsLoading(true);
    http.post('/user/redeem-discount', { percentage, cost })
      .then(response => {
        setPoints(prevPoints => prevPoints - cost);
        setDiscount(percentage);
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage("Failed to redeem the discount. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeDiscount = () => {
    setIsLoading(true);
    http.post('/user/remove-discount')
      .then(response => {
        setDiscount(0);
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage("Failed to remove the discount. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const discountOptions = [
    { percentage: 10, cost: 100 },
    { percentage: 20, cost: 200 },
    { percentage: 30, cost: 350 },
    { percentage: 40, cost: 450 },
    { percentage: 100, cost: 1000 }
  ];

  return (
    <div className="myPoints-container">
        <h1>Your Points: {points}</h1>
        <h2>Your Discount: {discount}%</h2>

        <div className="coupon-container">
            <input
                className="coupon-input"
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
            />
            <button className="coupon-button" onClick={redeemCoupon} disabled={isLoading}>Redeem Coupon</button>
            <button className="remove-discount-button" onClick={removeDiscount} disabled={isLoading}>Remove Discount</button>
        </div>

        {discountOptions.map(option => (
            <div className="myPoints-discountBox" key={option.percentage}>
                <div className="myPoints-discountValue">{option.percentage}% off</div>
                <div className="myPoints-discountPoints">{option.cost} Points</div>
                <button 
                    className="myPoints-claimButton" 
                    onClick={() => redeemDiscount(option.percentage, option.cost)} 
                    disabled={isLoading}
                >
                    Claim
                </button>
            </div>
        ))}

        <div>{message}</div>
    </div>
);

}

export default MyPoints;