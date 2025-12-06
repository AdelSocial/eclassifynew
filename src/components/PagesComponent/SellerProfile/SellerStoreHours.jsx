"use client";

const SellerStoreHours = ({ hours }) => {
    if (!hours) return null;

    return (
        <div className="store-hours">
            <h3>Store Hours</h3>
            <ul>
                {Object.entries(hours).map(([day, time], index) => (
                    <li key={index}>
                        <strong>{day}:</strong> {time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerStoreHours;
