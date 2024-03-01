import { faBed, faChevronDown, faTaxi, faTicket, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { CostItemProps, Detail, EstimatedCostCategory, EstimatedCostsProps } from "../../types/CostBreakdownTypes";

const CostItem: React.FC<CostItemProps> = ({ icon, category, details }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-800">
            <FontAwesomeIcon icon={icon} className="mr-2 w-8 text-xl" />
            {category}
        </h3>
        <div className="mb-8 grid grid-cols-2 grid-rows-2 gap-4">
            {details.map((detail) => (
                <div key={detail.name} className="p-4">
                    <h4 className="mb-2 text-gray-500">{detail.name}</h4>
                    <p className="text-lg font-medium text-gray-800">{detail.cost ? `${detail.cost}€` : "N/A"}</p>
                </div>
            ))}
        </div>
    </div>
);

const CostBreakdown: React.FC<EstimatedCostsProps> = ({ estimatedCosts }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!estimatedCosts || estimatedCosts.length === 0) {
        return <div>Chargement...</div>;
    }

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const categories = ["Hébergement", "Transports", "Nourriture", "Activités"];
    const icons = [faBed, faTaxi, faUtensils, faTicket];

    const accomodationOrder: (keyof EstimatedCostCategory)[] = ["hostelCostPerNight", "hotelCostPerNight", "airbnbCostPerNight", "luxuryHotelCostPerNight"];

    const transportationOrder: (keyof EstimatedCostCategory)[] = ["busCost", "taxiCost", "trainCost", "rentalCost"];

    const foodOrder: (keyof EstimatedCostCategory)[] = ["streetFoodCost", "budgetRestaurantCost", "fancyRestaurantCost", "traditionalRestaurantCost"];

    const orderDetails = (costCategory: EstimatedCostCategory, order: (keyof EstimatedCostCategory)[]): Detail[] => {
        return order
            .map((key) => {
                const cost = costCategory[key];
                if (typeof cost === "number") {
                    return {
                        name:
                            key.charAt(0).toUpperCase() +
                            key
                                .slice(1)
                                .replace(/Cost/g, "")
                                .replace(/([A-Z])/g, " $1")
                                .trim(),
                        cost: cost,
                    };
                }
                return null;
            })
            .filter((detail): detail is Detail => detail !== null);
    };

    return (
        <div className="pb-12">
            <div className="mb-6 flex space-x-4">
                <button onClick={toggleCollapse}>
                    <FontAwesomeIcon className="text-2xl text-gray-800" icon={faChevronDown} rotation={isCollapsed ? 270 : undefined} />
                </button>
                <h2 className="text-2xl font-black text-gray-800 md:text-3xl">Répartition des coûts (EUR)</h2>
            </div>
            {!isCollapsed &&
                estimatedCosts.map((costCategory, index) => {
                    if (index >= categories.length || index >= icons.length) return null;

                    let details: Detail[];
                    switch (index) {
                        case 0:
                            details = orderDetails(costCategory, accomodationOrder);
                            break;
                        case 1:
                            details = orderDetails(costCategory, transportationOrder);
                            break;
                        case 2:
                            details = orderDetails(costCategory, foodOrder);
                            break;
                        case 3:
                            details =
                                costCategory.mainActivityForEachDay?.map((activity) => ({
                                    name: activity.mainActivityName,
                                    cost: activity.costOfProgram,
                                })) || [];
                            break;
                        default:
                            details = [];
                    }
                    return <CostItem key={categories[index]} icon={icons[index]} category={categories[index]} details={details} />;
                })}
        </div>
    );
};

export default CostBreakdown;